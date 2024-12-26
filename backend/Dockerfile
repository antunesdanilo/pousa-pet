# Usa a imagem Node.js do Docker Hub como base
FROM node:18

# Cria o diretório para o backend
RUN mkdir /usr/share/backend

# Define o diretório de trabalho
WORKDIR /usr/share/backend

# Copia apenas os arquivos necessários para instalar as dependências
COPY ./package.json ./package-lock.json ./

# Instala apenas as dependências de produção com NPM
RUN npm install --production=false

# Copia todos os arquivos para o contêiner
COPY ./ .

# Faz o build da aplicação NestJS
RUN npx prisma generate
RUN npm run build

# Define o diretório para a versão buildada
WORKDIR /usr/share/backend/dist

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando padrão para rodar o servidor
CMD ["node",  "main.js"]
