# client_service_api/database/crud.py - Funções de operações CRUD para Clientes

from sqlalchemy.orm import Session
from . import models, schemas

def get_client(db: Session, client_id: int):
    """Busca um Cliente por ID."""
    return db.query(models.Client).filter(models.Client.id == client_id).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100):
    """Busca uma lista de Clientes."""
    return db.query(models.Client).offset(skip).limit(limit).all()

def create_client(db: Session, client: schemas.ClientCreate):
    """Cria um novo Cliente no banco de dados."""
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client_id: int, updated_client: schemas.ClientCreate):
    """Atualiza um Cliente existente."""
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not db_client:
        return None
    
    update_data = updated_client.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_client, key, value)
    
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def delete_client(db: Session, client_id: int):
    """Deleta um Cliente."""
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not db_client:
        return False
    
    db.delete(db_client)
    db.commit()
    return True
