erp2/
├── client_service_api/      # Microserviço para gerenciar clientes
│   ├── database/            # Módulos relacionados ao banco de dados
│   │   ├── __init__.py
│   │   ├── crud.py          # Funções para interagir com o DB (CRUD)
│   │   ├── database.py      # Configuração da conexão e sessão do DB
│   │   ├── models.py        # Modelos de tabelas (SQLAlchemy ORM)
│   │   └── schemas.py       # Schemas de dados (Pydantic) para validação
│   ├── Dockerfile           # Instruções para construir a imagem Docker da API
│   ├── main.py              # Ponto de entrada da API (rotas FastAPI)
│   └── requirements.txt     # Dependências Python
│
├── service_orders_api/      # Microserviço para gerenciar ordens de serviço
│   ├── database/
│   │   ├── __init__.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
│
├── frontend/                # Aplicação de frontend (React)
│   ├── public/
│   │   └── index.html       # HTML principal
│   ├── src/
│   │   ├── App.js           # Componente principal da aplicação
│   │   └── index.js         # Ponto de entrada do React
│   ├── Dockerfile           # Instruções para construir a imagem Docker do frontend
│   ├── entrypoint.sh        # Script de inicialização (se necessário)
│   └── package.json         # Dependências e scripts do Node.js
│
├── docs/                    # Pasta para documentação
│   ├── architecture.md      # Diagrama da arquitetura do sistema
│   └── folder-structure.md  # Este arquivo
│
└── docker-compose.yml       # Orquestra todos os serviços (APIs, DBs, Frontend)
