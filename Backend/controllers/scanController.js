const fs = require('fs');
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const ItemsModel = require('../models/itemsModel');

exports.receiveScan = async (req, res, next) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Nenhuma imagem ou caminho de imagem encontrado.' });
    }

    const clarifaiApiKey = process.env.CLARIFAI_API_KEY;

    if (!clarifaiApiKey) {
      return res.status(500).json({ error: 'Chave da API da Clarifai não configurada.' });
    }

 
    const imagePath = req.file.path;
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });


    fs.unlink(imagePath, (err) => {
      if (err) console.error('Erro ao apagar o arquivo temporário:', err);
    });

    const stub = ClarifaiStub.grpc();
    const metadata = new grpc.Metadata();
    metadata.set('authorization', `Key ${clarifaiApiKey}`);

    const modelId = 'general-image-detection';
    const modelVersionId = '1580bb1932594c93b7e2e04456af7c6f';
    const modelOwner = { user_id: 'clarifai', app_id: 'main' };


    const clarifaiResponse = await new Promise((resolve, reject) => {
      stub.PostModelOutputs(
        {
          user_app_id: modelOwner,
          model_id: modelId,
          version_id: modelVersionId,
          inputs: [{ data: { image: { base64: imageBase64 } } }]
        },
        metadata,
        (err, response) => {
          if (err) return reject(err);
          if (response.status.code !== 10000) {
            return reject(new Error('Falha na API: ' + response.status.description));
          }
          resolve(response);
        }
      );
    });


    const regions = clarifaiResponse.outputs[0].data.regions || [];
    const counts = {};
    const confidenceThreshold = 0.90;

    regions.forEach(region => {
      const topConcept = region.data.concepts[0];
      const name = topConcept.name;
      const confidence = topConcept.value;

      if (confidence >= confidenceThreshold) {
        counts[name] = (counts[name] || 0) + 1;
      }
    });

    const results = Object.keys(counts).map(key => ({
      name: key,
      quantity: counts[key]
    }));


    const userId = req.body?.user_id ?? null;

    for (const item of results) {
      await ItemsModel.create(userId, item.name, item.quantity);
    }

    return res.status(200).json({
      message: 'Alimentos detectados e salvos com sucesso!',
      results: results
    });

  } catch (err) {
    console.error('Erro no processamento da imagem:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};