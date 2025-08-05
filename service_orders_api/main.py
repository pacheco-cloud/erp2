# service_orders_api/main.py - Arquivo principal do microsserviço de Ordens de Serviço com PostgreSQL

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Importação corrigida para ser absoluta a partir da pasta raiz do módulo
# Garante que o Python encontra os módulos dentro do pacote 'database'
from database import crud, models, schemas, engine, get_db

# Cria as tabelas no banco de dados (se não existirem)
# Esta linha garante que a tabela 'service_orders' é criada na base de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Serviço de Ordens de Serviço",
    description="API para gerenciar ordens de serviço.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Permite acesso do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API do RhynoERP está no ar!"}

@app.post(
    "/service_orders",
    response_model=schemas.ServiceOrder,
    status_code=status.HTTP_201_CREATED,
    summary="Criar uma nova Ordem de Serviço",
    tags=["Ordens de Serviço"]
)
def create_service_order_endpoint(order: schemas.ServiceOrderCreate, db: Session = Depends(get_db)):
    """Cria uma nova Ordem de Serviço na base de dados."""
    return crud.create_service_order(db=db, order=order)
    
@app.get(
    "/service_orders",
    response_model=List[schemas.ServiceOrder],
    summary="Listar todas as Ordens de Serviço",
    tags=["Ordens de Serviço"]
)
def read_service_orders_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Retorna uma lista de todas as Ordens de Serviço."""
    return crud.get_service_orders(db, skip=skip, limit=limit)

@app.get(
    "/service_orders/{order_id}",
    response_model=schemas.ServiceOrder,
    summary="Obter uma Ordem de Serviço específica",
    tags=["Ordens de Serviço"]
)
def get_service_order_endpoint(order_id: int, db: Session = Depends(get_db)):
    """Retorna os detalhes de uma Ordem de Serviço pelo seu ID."""
    order = crud.get_service_order(db, order_id=order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Ordem de Serviço não encontrada")
    return order

@app.put(
    "/service_orders/{order_id}",
    response_model=schemas.ServiceOrder,
    summary="Atualizar uma Ordem de Serviço",
    tags=["Ordens de Serviço"]
)
def update_service_order_endpoint(order_id: int, updated_order: schemas.ServiceOrderCreate, db: Session = Depends(get_db)):
    """Atualiza uma Ordem de Serviço existente."""
    db_order = crud.update_service_order(db, order_id, updated_order)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Ordem de Serviço não encontrada")
    return db_order

@app.delete(
    "/service_orders/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar uma Ordem de Serviço",
    tags=["Ordens de Serviço"]
)
def delete_service_order_endpoint(order_id: int, db: Session = Depends(get_db)):
    """Deleta uma Ordem de Serviço pelo seu ID."""
    deleted = crud.delete_service_order(db, order_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Ordem de Serviço não encontrada")
    return None
