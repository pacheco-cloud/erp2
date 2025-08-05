# schemas.py - Esquemas Pydantic para a API

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ServiceOrderBase(BaseModel):
    """Modelo base para Ordem de Serviço."""
    client_name: str
    service_description: str
    status: str
    value: float

class ServiceOrderCreate(ServiceOrderBase):
    """Modelo para criação de Ordem de Serviço."""
    pass

class ServiceOrder(ServiceOrderBase):
    """Modelo completo para resposta da API."""
    id: int
    number: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
