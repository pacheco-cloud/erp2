# Use uma imagem base oficial do Node com versão específica
FROM node:18.19.1-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# A instalação aqui serve para acelerar builds futuros
RUN npm install

# Copia o restante do código da aplicação para o contêiner
COPY . .

# Copia o script de entrypoint e o torna executável
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Expõe a porta que a aplicação React irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "start"]
