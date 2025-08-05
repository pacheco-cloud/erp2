# service_orders_api/database/__init__.py - Pacote database para Ordens de Serviço

# Expondo variáveis e funções do database.py
from .database import Base, SessionLocal, engine, get_db

# Expondo modelos do models.py
from .models import ServiceOrder

# Expondo esquemas do schemas.py
from .schemas import ServiceOrderCreate, ServiceOrder as ServiceOrderSchema

# Expondo funções CRUD do crud.py
from .crud import get_service_order, get_service_orders, create_service_order, update_service_order, delete_service_order
