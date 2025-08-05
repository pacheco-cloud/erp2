# database.py - Configuração do banco de dados

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Puxa a URL do banco de dados das variáveis de ambiente do Docker Compose
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@erp2-db-orders:5432/orders_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
