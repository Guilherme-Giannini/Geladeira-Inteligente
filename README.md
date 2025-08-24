# Geladeira Inteligente

## Descrição do Projeto

O **Geladeira Inteligente** é um sistema completo que combina **backend em Node.js (Express + MySQL)** e **frontend mobile em React Native**, permitindo gerenciar os itens de uma geladeira de forma automatizada.

O sistema possibilita cadastrar usuários, adicionar itens, definir quantidades mínimas e enviar imagens dos produtos. Agora, com a **integração com IA de reconhecimento de alimentos**, as imagens enviadas pelo app são processadas automaticamente, identificando os itens e suas quantidades no inventário.

---

## Funcionalidades

- Cadastro e gerenciamento de usuários.
- CRUD completo de itens da geladeira (adicionar, listar, atualizar, deletar).
- Controle de quantidade mínima de cada item.
- **Integração com IA:** reconhecimento automático de alimentos a partir de fotos.
- Estrutura organizada em **MVC**: Models, Controllers e Routes.
- Script SQL incluso (`database.sql`) para criar o banco e tabelas do zero.

---

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, MySQL, Multer (upload de imagens), CORS.
- **Frontend:** React Native (aplicativo mobile).
- **Banco de Dados:** MySQL.
- **Versionamento:** Git / GitHub.

---

## Estrutura de Pastas

geladeira-inteligente/
│
├─ controllers/ # Lógica de cada rota
│ ├─ itemsController.js
│ └─ usersController.js
│
├─ models/ # Conexão com MySQL e queries
│ ├─ db.js
│ ├─ itemsModel.js
│ └─ usersModel.js
│
├─ routes/ # Rotas do backend
│ ├─ itemsRoutes.js
│ └─ usersRoutes.js
│
├─ uploads/ # Uploads temporários de imagens
├─ database.sql # Script para criar banco e tabelas
├─ app.js # Servidor backend Node.js
└─ package.json

yaml
Copiar
Editar

---

## Pré-requisitos

- Node.js (LTS recomendado)
- MySQL
- Expo CLI (para React Native)
- Git

---

## Como Rodar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seuusuario/geladeira-inteligente.git
cd geladeira-inteligente
2️⃣ Backend
bash
Copiar
Editar
npm install
mysql -u root -p < database.sql   # Cria banco e tabelas
node app.js                        # Roda servidor backend
Servidor estará rodando em: http://localhost:3000

Rotas exemplo:

GET /items → Lista todos os itens

POST /items → Adiciona novo item

POST /items/photo → Recebe foto e processa via IA

3️⃣ Frontend React Native
bash
Copiar
Editar
cd geladeira-app
npm install
npm start
Abrirá o Expo Dev Tools. Teste no celular via Expo Go ou emulador Android/iOS.

Como Contribuir
Faça fork do repositório.

Crie sua branch:

bash
Copiar
Editar
git checkout -b feature/nova-funcionalidade
Faça commit:

bash
Copiar
Editar
git commit -m "Descrição da mudança"
Push da branch:

bash
Copiar
Editar
git push origin feature/nova-funcionalidade
Abra Pull Request.

Integração com IA
A integração com IA de visão computacional já está funcional.

Como funciona:

Upload de imagem: usuário tira foto do item pelo app React Native.

Processamento por IA: o backend envia a imagem para o modelo de IA, que identifica automaticamente os itens e quantidades.

Atualização do banco: o backend cria ou atualiza os itens no MySQL, preenchendo nome, quantidade e alertas de estoque baixo.

Benefícios:

Reconhecimento automático de alimentos.

Atualização do inventário sem digitação manual.

Alertas automáticos de estoque baixo.

Base para futuras funcionalidades como lista de compras inteligente ou sugestões de receitas.

IoT com Câmera Inteligente (Futuro)
O sistema poderá ser integrado a dispositivos IoT, como câmeras dentro da geladeira, permitindo:

Atualização automática do inventário em tempo real.

Notificações sobre produtos acabando ou próximos do vencimento.

Sugestões personalizadas de consumo baseado nos itens disponíveis.

Isso trará automação completa e praticidade.

Notificar o usuário sobre produtos acabando ou próximos do vencimento.

Oferecer sugestões personalizadas de consumo com base no que realmente está disponível na geladeira.

Essa integração trará um ganho de automação e praticidade, tornando o gerenciamento de alimentos quase totalmente autônomo, sem depender da inserção manual de dados pelo usuário.
