Descrição do Projeto

O Geladeira Inteligente é um sistema completo que combina backend em Node.js (Express + MySQL) e frontend mobile em React Native, permitindo gerenciar os itens de uma geladeira de forma automatizada.

O sistema possibilita cadastrar usuários, adicionar itens, definir quantidades mínimas e enviar imagens dos produtos, preparando o ambiente para integração futura com IA de reconhecimento de alimentos.

Funcionalidades

Cadastro e gerenciamento de usuários.

CRUD de itens da geladeira (adicionar, listar, atualizar, deletar).

Controle de quantidade mínima de cada item.

Upload de imagens de itens para futura integração com IA.

Estrutura organizada em MVC: Models, Controllers e Routes.

Script SQL incluso (database.sql) para criar o banco e tabelas do zero.

Tecnologias Utilizadas

Backend: Node.js, Express, MySQL, Multer (upload de imagens), CORS.

Frontend: React Native (aplicativo mobile).

Banco de Dados: MySQL.

Versionamento: Git / GitHub.

Estrutura de Pastas
geladeira-inteligente/
│
├─ controllers/       # Lógica de cada rota
│    └─ itemsController.js
│    └─ usersController.js
│
├─ models/            # Conexão com MySQL e queries
│    └─ db.js
│    └─ itemsModel.js
│    └─ usersModel.js
│
├─ routes/            # Rotas do backend
│    └─ itemsRoutes.js
│    └─ usersRoutes.js
│
├─ uploads/           # Uploads temporários de imagens
├─ database.sql       # Script para criar banco e tabelas
├─ app.js             # Servidor backend Node.js
└─ package.json

Pré-requisitos

Node.js instalado (LTS recomendado)

MySQL instalado

Expo CLI (para rodar React Native)

Git instalado

Como Rodar o Projeto
1️⃣ Clonar o Repositório
git clone https://github.com/seuusuario/geladeira-inteligente.git
cd geladeira-inteligente

2️⃣ Backend
npm install
mysql -u root -p < database.sql   # Cria banco e tabelas
node app.js                        # Roda servidor backend


Servidor estará rodando em http://localhost:3000

Rotas exemplo:

GET /items → lista todos os itens

POST /items → adiciona novo item

3️⃣ Frontend React Native
cd geladeira-app
npm install
npm start


Vai abrir o Expo Dev Tools.

Teste no celular via Expo Go ou emulador Android/iOS.

Como Contribuir

Fork do repositório

Crie sua branch: git checkout -b feature/nova-funcionalidade

Faça commit: git commit -m "Descrição da mudança"

Push: git push origin feature/nova-funcionalidade

Abra Pull Request



Futuras integrações:

Integração Futura com IA

O projeto está preparado para receber imagens dos itens da geladeira e, futuramente, utilizar inteligência artificial para reconhecimento automático de alimentos.

Como funcionaria:

Upload de imagem:

O usuário tira uma foto do item usando o app React Native.

A imagem é enviada para o backend (Node.js) e armazenada temporariamente na pasta uploads/.

Processamento por IA:

Uma IA (por exemplo, um modelo de visão computacional) analisa a imagem.

O modelo identifica automaticamente o item (ex.: “Maçã”, “Leite”, “Queijo”).

Poderia também detectar a quantidade aproximada ou a validade do produto.

Atualização automática do banco:

O backend recebe a informação da IA.

Cria ou atualiza o item no MySQL, preenchendo nome, quantidade, e podendo gerar alertas se estiver acabando.

Benefícios:

Evita que o usuário tenha que digitar manualmente os itens.

Possibilidade de gerar alertas automáticos de estoque baixo.

Base para futuras funcionalidades como lista de compras inteligente ou receitas automáticas.

IoT com Câmera Inteligente

No futuro, o sistema poderá ser integrado a dispositivos IoT, como uma câmera instalada dentro da geladeira. Essa câmera terá a capacidade de tirar fotos em intervalos de tempo configurados ou sempre que a porta for aberta, enviando as imagens automaticamente para o sistema.

Com isso, o aplicativo poderá:

Identificar automaticamente os alimentos dentro da geladeira (quando combinado com visão computacional/IA).

Atualizar o inventário em tempo real, sem necessidade de cadastro manual.

Notificar o usuário sobre produtos acabando ou próximos do vencimento.

Oferecer sugestões personalizadas de consumo com base no que realmente está disponível na geladeira.

Essa integração trará um ganho de automação e praticidade, tornando o gerenciamento de alimentos quase totalmente autônomo, sem depender da inserção manual de dados pelo usuário.
