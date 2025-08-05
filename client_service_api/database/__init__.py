# client_service_api/database/__init__.py - Pacote database para Clientes

# Expondo variáveis e funções do database.py
from .database import Base, SessionLocal, engine, get_db

# Expondo modelos do models.py
from .models import Client

# Expondo esquemas do schemas.py
from .schemas import ClientCreate, Client as ClientSchema

# Expondo funções CRUD do crud.py
from .crud import get_client, get_clients, create_client, update_client, delete_client
