# WeatherAPI
Esta é uma API de exemplo desenvolvida com NestJS, um framework para Node.js. A API possui funcionalidades básicas, incluindo autenticação, CRUD de usuários e obtenção de informações climáticas.

Como Usar
Siga as etapas abaixo para configurar e executar a API localmente.

Pré-requisitos
* Node.js e npm (ou Yarn) instalados na máquina.
* PostgreSQL instalado e configurado (ou outro banco de dados suportado).
* WeatherAPI Key (obtenha em http://api.weatherapi.com).
  
Configuração:
Clone o repositório:
  - git clone https://github.com/seu-usuario/nestjs-api.git
  - cd nestjs-api
  
Instale as dependências:
  - npm install
    
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
  - DB_HOST=seu-host
  - DB_PORT=sua-porta
  - DB_USERNAME=seu-username
  - DB_PASSWORD=sua-senha
  - DB_NAME=seu-banco-de-dados
  - WEATHER_API_KEY=sua-api-key
    
Execute a aplicação:
  - npm start

A API estará disponível em http://localhost:3000.

Rotas:
* POST /auth/login: Autentica um usuário. Envie um JSON no corpo da requisição com "username" e "password".
* POST /auth/register: Registra um novo usuário. Envie um JSON no corpo da requisição com "username", "password" e "email".
* GET /user: Obtém todos os usuários.
* GET /user/:id: Obtém um usuário pelo ID.
* PUT /user/:id: Atualiza um usuário pelo ID. Envie um JSON no corpo da requisição com os campos a serem atualizados.
* DELETE /user/:id: Exclui um usuário pelo ID.
* POST /weather: Obtém informações climáticas para uma localização. Envie um JSON no corpo da requisição com "location".
