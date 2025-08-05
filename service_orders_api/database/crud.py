# service_orders_api/database/crud.py - Funções de operações CRUD para Ordens de Serviço

from sqlalchemy.orm import Session
from . import models, schemas
import uuid
from datetime import datetime

def get_service_order(db: Session, order_id: int):
    """Busca uma Ordem de Serviço por ID."""
    return db.query(models.ServiceOrder).filter(models.ServiceOrder.id == order_id).first()

def get_service_orders(db: Session, skip: int = 0, limit: int = 100):
    """Busca uma lista de Ordens de Serviço."""
    return db.query(models.ServiceOrder).offset(skip).limit(limit).all()

def create_service_order(db: Session, order: schemas.ServiceOrderCreate):
    """Cria uma nova Ordem de Serviço no banco de dados."""
    db_count = db.query(models.ServiceOrder).count()
    new_order_data = order.dict()
    new_order_data["number"] = f"OS-{db_count + 1:04d}"
    
    db_order = models.ServiceOrder(**new_order_data)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_service_order(db: Session, order_id: int, updated_order: schemas.ServiceOrderCreate):
    """Atualiza uma Ordem de Serviço existente."""
    db_order = db.query(models.ServiceOrder).filter(models.ServiceOrder.id == order_id).first()
    if not db_order:
        return None
    
    update_data = updated_order.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_order, key, value)
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_service_order(db: Session, order_id: int):
    """Deleta uma Ordem de Serviço."""
    db_order = db.query(models.ServiceOrder).filter(models.ServiceOrder.id == order_id).first()
    if not db_order:
        return False
    
    db.delete(db_order)
    db.commit()
    return True
