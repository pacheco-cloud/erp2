#!/bin/sh
set -e

# Verifica se a pasta node_modules existe e tem conteúdo.
# Se não, executa npm install.
if [ ! -d "node_modules" ] || [ ! "$(ls -A node_modules)" ]; then
  echo "Instalando dependências..."
  npm install
fi

# Executa o comando principal (npm start)
exec "$@"
exec "$@"
