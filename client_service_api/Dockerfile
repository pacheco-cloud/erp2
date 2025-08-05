# Use uma imagem base oficial do Python para a versão 3.9
FROM python:3.9-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências e instala
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copia o código da aplicação
COPY . /app/

# Expõe a porta que a API irá rodar (8001 para este serviço)
EXPOSE 8001

# Comando para rodar a aplicação com Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
