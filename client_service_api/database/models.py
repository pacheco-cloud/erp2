# client_service_api/database/models.py - Modelos de tabelas para Clientes

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
# CORREÇÃO: Importa Base do database.py em vez de redefini-lo
from .database import Base # Importa a Base definida em database.py
from sqlalchemy.types import Text # Para campos maiores como endereço

class Client(Base):
    """Modelo ORM para a tabela de Clientes."""
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(Text, nullable=True) # O tipo Text é bom para endereços longos
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

