# **PousaPet** 🐾

**PousaPet** é uma aplicação mobile voltada para a gestão de hospedagem em hotéis para pets. O objetivo é facilitar o controle de informações sobre os animais hospedados, como dados dos tutores, datas de entrada e saída, espécies, raças e o cálculo automático de diárias.

Com o **PousaPet**, os estabelecimentos podem gerenciar suas operações de maneira eficiente e profissional, garantindo praticidade para os administradores e segurança para os tutores.

🚀 **Funcionalidades**

- Gerenciamento de Animais Hospedados:
  Inclua e visualize registros de animais hospedados.

- Informações do Tutor:
  Cadastro e exibição de dados como nome e contato do tutor.

- Detalhes do Pet:
  Informações como espécie (cachorro/gato), raça e datas de hospedagem.

- Cálculo Automático de Diárias:
  Controle automático das diárias acumuladas e previsão de término da estadia.

- Interface Amigável:
  Design intuitivo e responsivo para dispositivos móveis.

**Capturas de Tela**

<div style='display: flex; flex-wrap: wrap; gap: 30px'>
  <img src="./mobile/assets/screenshots/1.%20Splash.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/2. Login.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/3. Cadastro.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/4. Home e Lista de Hospedagens.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/5. Detalhes da Hospedagem.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/6. Formulário para Adição de Hospedagem.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/7. Lista de Pets.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/8. Formulário para Adição de Pet.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/9. Lista de Tutores.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/10. Formulário para Adição de Tutor.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/11. Lista de Espécies.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/12. Formulário para Adição de Espécie.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/13. Lista de Raças.png" alt="Print da Tela" width="200">
  <img src="./mobile/assets/screenshots/14. Formulário para Adição de Raças.png" alt="Print da Tela" width="200">
</div>

---

## **Índice**

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Boas Práticas Adotadas](#boas-práticas-adotadas)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Download e Instalação](#download-e-instalação)
5. [Execução do Backend com Docker](#execução-do-backend-com-docker)
6. [Execução do Backend com Servidor de Desenvolvimento](#execução-do-backend-com-servidor-de-desenvolvimento)
7. [Instalação do Aplicativo Mobile](#instalação-do-aplicativo-mobile)
8. [Acesso](#acesso)
9. [Testes](#testes)
10. [Melhorias Futuras](#melhorias-futuras)

---

## **Descrição do Projeto**

O PousaPet é uma solução para atender às necessidades de hotéis de pets que desejam simplificar seus processos operacionais e oferecer uma experiência de alta qualidade para os tutores. A aplicação atualmente suporta:

1. Cadastro de hospedagens.
2. Cadastro de pets.
3. Cadastro de tutores.
4. Cadastro de espécies.
5. Cadastro de raças.
6. Login simbólico através da criação de um usuário sem autenticação com senha

O backend utiliza **NestJS** e **Prisma ORM** para manipulação de dados, e expõe APIs RESTful documentadas com **Swagger**.

---

## **Boas Práticas Adotadas**

O desenvolvimento do PousaPet seguiu práticas recomendadas da engenharia de software, com foco em qualidade, manutenibilidade e documentação:

- Padrões de Arquitetura: Backend organizado com princípios da Arquitetura Limpa e frontend estruturado com componentes reutilizáveis.
- Manutenibilidade: Código modular e testável, permitindo fácil evolução do sistema.
- Documentação:
  - Swagger: APIs documentadas de forma acessível e visual no backend.
- Qualidade do Código: Uso de ferramentas como ESLint e Prettier para garantir consistência e legibilidade.
- Testes Automatizados: Testes unitários e de integração cobrindo casos de uso essenciais no backend e frontend.
- Design Adaptativo para Mobile: Interfaces projetadas para diferentes tamanhos e resoluções de telas em dispositivos móveis.

---

## **Tecnologias Utilizadas**

### **Frontend**

- React Native, Redux Toolkit,
- Expo, Expo Go
- React Native Paper

### **Backend**

- NestJS
- Prisma ORM
- Swagger para documentação da API
- Docker

### **Geral**

- Testes automatizados com Jest
- ESLint e Prettier para padronização de código

## **Download e Instalação**

### **Pré-requisitos**

- GIT
- Yarn ou NPM

### **Clone o repositório:**

```bash
$ git clone https://github.com/antunesdanilo/pousa-pet.git

$ cd pousa-pet
```

### **Instale as dependências do backend**

```bash
$ cd backend

$ yarn install
# ou
$ npm install
```

### **Instale as dependências do frontend**

```bash
$ cd frontend

$ yarn install
# ou
$ npm install
```

### **Execute as migrações para criar a estrutura de dados com SQLite**

```bash
$ cd backend

$ yarn migrate:deploy
ou
$ npm run migrate:deploy
```

## Execução do Backend Com Docker

### **Pré-requisitos**

- Docker

### **Faça o Build do Dockerfile para a Criação da Imagem:**

```bash
$ docker build -t pousapet-backend .
```

### **Execute a Criação do Container:**

```bash
$ docker run -d -p 3000:3000 --name meu-container pousapet-backend
```

## Execução do Backend com Servidor de Desenvolvimento

### **Pré-requisitos**

- NodeJS<br/>
- Yarn ou NPM

### **Execute o backend**

```bash
$ cd backend

$ yarn start
# ou
$ npm start
```

## Instalação do Aplicativo Mobile

### **Pré-requisitos**

- Conta no Expo Go
- Aplicativo Expo Go instalado no smartphone ou em um dispositivo virtual Android

### **Faça login na sua conta Expo Go no terminal:**

```bash
$ cd mobile

$ npx expo login
```

### **Inicie o servidor de desenvolvimento**

```bash
$ cd mobile

$ npm start
```

## **Acesso**

Após a execução com servidores de desenvolvimento ou com Docker, a aplicação estará disponível em:

- Mobile: Abra o aplicativo Expo Go no smartphone ou dispositivo virtual Android, escaneie o QR code disponível no terminal, ou digite a URL do servidor de desenvolvimento.
- Backend: http://localhost:3000
- Swagger UI: http://localhost:3000/swagger (Documentação completa da API)

## **Testes**

### **Pré-requisitos**

- NodeJS<br/>
- Yarn ou NPM

### **Backend**

```bash
$ cd backend

$ yarn test
# ou
$ npm run test
```

### **Frontend**

```bash
$ cd frontend

$ yarn test
# ou
$ npm run test
```

---

## **Melhorias Futuras**

- Autenticação JWT: Proteger rotas do backend.
- Pagamentos: Integração com gateways de pagamento para simular cobrança.
- Permitir a edição e remoção de registros.
- Testes E2E: Implementar testes de ponta a ponta para validar fluxos completos.
- Performance: Melhorar a eficiência das consultas no backend.

---

Desenvolvido por @DaniloAntunes - 2024
