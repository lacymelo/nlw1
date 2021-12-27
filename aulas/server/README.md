##### COMANDOS PARA CRIAR O PROJETO #####

criar o arquivo package
### yarn init -y

Gerencia as requisições, rotas e URLs, entre outras funcionalidades
### yarn add express

Biblioteca de definição de tipos
### yarn add @types/express -D

Biblioteca para o node entender código typescript, e executar como javascript
### yarn add ts-node -D

Para instalar o typescript
### yarn add typescript -D

Criação de arquivo de configuração do typescript
### npx tsc --init

Atualiza de forma automática o projeto toda vez que é salvo
### yarn add ts-node-dev -D

comando acima alterado para
### yarn run dev

para escrever query do banco de dados
### yarn add knex

passando o caminho para o arquivo knexfile.ts na raiz
### npx knex migrate:latest --knexfile knexfile.ts migrate:latest

comando acima alterado para
### yarn run knex:migrate

instalando o package sqlite3
### yarn add sqlite3

para que o express entenda Multipart
### yarn add multer

controla o acesso a api
### yarn add cors

dependência de desenvolvimento
### yarn add @types/cors -D

trabalha com tempo real
### yarn add socket.io