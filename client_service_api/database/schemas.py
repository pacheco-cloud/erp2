# schemas.py - Esquemas Pydantic para a API de Clientes

from pydantic import BaseModel, EmailStr
from typing import Optional

class ClientBase(BaseModel):
    """Modelo base para Clientes."""
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientCreate(ClientBase):
    """Modelo para criação de Clientes."""
    pass

class Client(ClientBase):
    """Modelo completo para Clientes, incluindo o ID."""
    id: int
    
    class Config:
        from_attributes = True
