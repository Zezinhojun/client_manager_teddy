# Sistema de Gestão de Clientes Teddy

### Índice
1. [Descrição do Projeto](#descrição-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Requisitos Implementados](#requisitos-implementados)
4. [Pré-requisitos](#pré-requisitos)
5. [Instalação e Execução](#instalação-e-execução)
   - [Clonar o Repositório](#clonar-o-repositório)
   - [Configurar Ambiente (Opcional)](#configurar-ambiente-opcional)
   - [Iniciar Aplicação](#iniciar-aplicação)
6. [Funcionalidades](#funcionalidades)
7. [Acesso à Aplicação](#acesso-à-aplicação)
8. [Observações Importantes](#observações-importantes)
9. [Próximos Passos](#próximos-passos)
10. [Observações Finais](#observações-finais)

## Descrição do Projeto
Sistema de gerenciamento de clientes com tela inicial de login por nome, listagem, cadastro, atualização e exclusão de clientes.

## Tecnologias Utilizadas

- **Frontend**: [Angular 18 com Signals](https://angular.io)
- **Backend**: [NestJS](https://nestjs.com)
- **ORM**: [TypeORM](https://typeorm.io)
- **UI Components**: [DataUI/Crud](https://www.npmjs.com/package/@dataui/crud) (um microframework versátil para CRUD, com recursos avançados de consulta, validação e documentação)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org)
- **Cache**: [Redis](https://redis.io)
- **Containerização**: [Docker](https://www.docker.com)
- **Gerenciamento de Estado**: [NGRX/Signals](https://ngrx.io/guide/signals)
- **Material Design**: [Angular Material](https://material.angular.io)

## Requisitos Implementados

- Tela inicial com inserção de nome
- Redirecionamento para lista de clientes
- CRUD completo de clientes
- Interface responsiva
- Utilização de TypeScript
- Docker e Docker Compose

## Pré-requisitos

- Docker
- Docker Compose

## Instalação e Execução

### Clonar o Repositório

```bash 
git clone https://github.seu-usuario/teddy-client-management.git 
```
```bash 
cd client_manager_teddy
```

### Configurar Ambiente (Opcional)

Se desejar personalizar as configurações, crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
PORT_FRONT=80 
PORT_BACK=8080 
POSTGRES_USER=user 
POSTGRES_PASSWORD=password 
POSTGRES_DB=teddy_db 
POSTGRES_HOST=db 
POSTGRES_PORT=5432 
REDIS_HOST=redis 
REDIS_PORT=6379 
API_URL=http://localhost:8080
```

### Iniciar Aplicação

```bash
 docker-compose up --build
```

## Funcionalidades

- Login por nome de usuário
- Listagem de clientes em cards
- Cadastro de novos clientes
- Edição de clientes existentes
- Exclusão de clientes
- Cache com Redis
- Proteção de rotas
- Interface responsiva

## Acesso à Aplicação

Após executar o comando `docker-compose up --build`, a aplicação estará disponível nas seguintes portas:

- Frontend (Angular): http://localhost:80/
- Backend (NestJS): http://localhost:8080/
- Redis: Porta padrão (6379)
- PostgreSQL: Porta padrão (5432)

Para acessar a interface do usuário, navegue até http://localhost:80/ em seu navegador web.

## Observações Importantes
- Certifique-se de que não há outros serviços rodando nas portas mencionadas acima para evitar conflitos.
- O Redis e o PostgreSQL estão configurados para usar suas portas padrão dentro do container Docker.
- Para acessar o backend diretamente (por exemplo, para testes ou uso da API), você pode usar http://localhost:8080/

## Próximos Passos

Após acessar a aplicação, você poderá:
1. Realizar login com seu nome de usuário
2. Visualizar a lista de clientes em cards
3. Cadastrar novos clientes
4. Editar informações de clientes existentes
5. Excluir clientes
6. Explorar as funcionalidades de cache com Redis
7. Verificar a proteção de rotas implementada
8. Adicionar um cliente à lista de favoritos
9. Visualizar os clientes favoritados clicando na navegação do cliente selecionado
10. Remover o cliente da lista de favoritos
11. Limpar toda a lista de favoritos

## Observações Finais

Esta é uma versão inicial do Sistema de Gestão de Clientes Teddy. Algumas funcionalidades planejadas, como testes unitários, documentação com Swagger, paginação ativa dos cards e sidebar responsiva, não puderam ser implementadas nesta entrega. Estas características serão consideradas para futuras atualizações, visando aprimorar a qualidade e usabilidade do sistema.
