# service_orders_api/database/models.py - Modelos de tabelas para Ordens de Serviço

from sqlalchemy import Column, Integer, String, DateTime, Float
# CORREÇÃO: Importa Base do database.py em vez de redefini-lo
from .database import Base
from datetime import datetime

class ServiceOrder(Base):
    """Modelo ORM para a tabela de Ordens de Serviço."""
    __tablename__ = "service_orders"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, index=True)
    client_name = Column(String, index=True)
    service_description = Column(String)
    status = Column(String, index=True)
    value = Column(Float)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

class Client(Base):
    """Modelo ORM para a tabela de Clientes."""
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
