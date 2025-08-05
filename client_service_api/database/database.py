# client_service_api/database/database.py - Configuração da conexão com o banco de dados de Clientes

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base # Importação necessária
from sqlalchemy.orm import sessionmaker

# CORREÇÃO: Obtém a URL do banco de dados a partir da variável de ambiente correta
# A variável de ambiente é definida no docker-compose.yml como DATABASE_URL_CLIENTS
DATABASE_URL = os.getenv("DATABASE_URL_CLIENTS")

# Verifica se a URL da base de dados foi carregada
if not DATABASE_URL:
    # Fallback para desenvolvimento local ou erro se não estiver definida
    raise ValueError("DATABASE_URL_CLIENTS environment variable not set.")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base() # A Base declarativa deve ser definida aqui

# Dependência para obter a sessão do banco de dados em cada requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
