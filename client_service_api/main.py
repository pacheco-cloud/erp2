# client_service_api/main.py - Arquivo principal do microsserviço de Clientes

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Importação corrigida para ser absoluta a partir da pasta raiz do módulo
from database import crud, models, schemas, engine, get_db

# Cria as tabelas no banco de dados (se não existirem)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Serviço de Clientes",
    description="API para gerenciar informações de clientes.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API do Serviço de Clientes está no ar!"}

@app.post(
    "/clients",
    response_model=schemas.Client,
    status_code=status.HTTP_201_CREATED,
    summary="Criar um novo Cliente",
    tags=["Clientes"]
)
def create_client_endpoint(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    """Cria um novo Cliente no banco de dados."""
    return crud.create_client(db=db, client=client)

@app.get(
    "/clients",
    response_model=List[schemas.Client],
    summary="Listar todos os Clientes",
    tags=["Clientes"]
)
def read_clients_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Retorna uma lista de todos os Clientes."""
    return crud.get_clients(db, skip=skip, limit=limit)

@app.get(
    "/clients/{client_id}",
    response_model=schemas.Client,
    summary="Obter um Cliente específico",
    tags=["Clientes"]
)
def get_client_endpoint(client_id: int, db: Session = Depends(get_db)):
    """Retorna os detalhes de um Cliente pelo seu ID."""
    client = crud.get_client(db, client_id=client_id)
    if client is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return client

@app.put(
    "/clients/{client_id}",
    response_model=schemas.Client,
    summary="Atualizar um Cliente",
    tags=["Clientes"]
)
def update_client_endpoint(client_id: int, updated_client: schemas.ClientCreate, db: Session = Depends(get_db)):
    """Atualiza um Cliente existente."""
    db_client = crud.update_client(db, client_id, updated_client)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return db_client

@app.delete(
    "/clients/{client_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar um Cliente",
    tags=["Clientes"]
)
def delete_client_endpoint(client_id: int, db: Session = Depends(get_db)):
    """Deleta um Cliente pelo seu ID."""
    deleted = crud.delete_client(db, client_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return None
