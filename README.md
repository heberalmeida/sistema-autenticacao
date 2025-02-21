# 📌 Sistema de Autenticação com Laravel 11 e Vue.js 3

## 🚀 Visão Geral
Este projeto é um sistema de autenticação baseado em **Laravel 11** para o backend e **Vue.js 3** com **Pinia** e **TypeScript** para o frontend.
A aplicação está estruturada para rodar em um ambiente **Dockerizado**.

## ⚙️ Tecnologias Utilizadas
- **Backend**: Laravel 11, Sanctum, MySQL
- **Frontend**: Vue.js 3, Pinia, TypeScript, Vite
- **Banco de Dados**: MySQL 8
- **Containerização**: Docker e Docker Compose

## 📂 Estrutura do Projeto
```
/sistema-autenticacao
  ├── backend/  # Laravel 11
  ├── frontend/ # Vue 3 com TypeScript e Pinia
  ├── docker-compose.yml
  ├── README.md
```

---
## 📌 Instalação
### 1️⃣ **Clone o repositório**
```sh
git clone https://github.com/heberalmeida/sistema-autenticacao.git
cd sistema-autenticacao
```

### 2️⃣ **Configurar o ambiente Docker**
Crie os containers do projeto:
```sh
docker-compose up -d --build
```

Isso irá iniciar:
- **MySQL** (porta **3307**)
- **Backend Laravel** (porta **8001**)
- **Frontend Vue.js** (porta **5174**)


---
## ⚙️ Configuração do Backend (Laravel 11)
### 1️⃣ **Configurar o ambiente**
Crie o arquivo **.env** no diretório `backend/` e adicione as configurações:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:zIKawr/iYez83aiS7roANA9jmjmKc+ICXblzoGzumcg=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8001

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=auth_system
DB_USERNAME=root
DB_PASSWORD=root

SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,localhost:8001
```

### 2️⃣ **Gere a chave da aplicação**
```sh
docker-compose exec backend php artisan key:generate
```

### 3️⃣ **Execute as migrações e os seeders**
```sh
docker-compose exec backend php artisan migrate --seed
```

Isso criará as tabelas e populará com usuários e grupos padrões.

---
## 🎨 Configuração do Frontend (Vue.js 3 + Pinia + TypeScript)
### 1️⃣ **Configurar dependências**
Dentro do diretório `frontend/`, instale as dependências:
```sh
docker-compose exec frontend npm install
```

### 2️⃣ **Rodar a aplicação**
```sh
docker-compose exec frontend npm run dev
```

O frontend estará disponível em `http://localhost:5174`

---
## 🛠 Comandos Docker
### **Reiniciar o Docker**
```sh
docker-compose down && docker-compose up -d --build
```

### **Parar os containers**
```sh
docker-compose down
```

### **Remover containers e imagens**
```sh
docker system prune -a -f
```

### **Ver logs do backend**
```sh
docker-compose logs -f backend
```

### **Ver logs do frontend**
```sh
docker-compose logs -f frontend
```

### **Acessar o container do backend**
```sh
docker-compose exec backend bash
```

### **Acessar o MySQL**
```sh
docker-compose exec mysql mysql -u root -p
```
(Senha: `root`)

---
## ✅ Rotas da API
### **Autenticação**
| Método | Rota       | Descrição |
|---------|------------|----------------------------|
| POST    | /api/register | Registrar um novo usuário |
| POST    | /api/login    | Autenticar um usuário |
| GET     | /api/user     | Retorna o usuário autenticado |

### **Gerenciamento de Usuários**
| Método | Rota       | Descrição |
|---------|------------|----------------------------|
| GET     | /api/users | Listar todos os usuários |
| POST    | /api/users | Criar um novo usuário |
| GET     | /api/users/{id} | Obter detalhes de um usuário |
| PUT     | /api/users/{id} | Atualizar dados de um usuário |
| DELETE  | /api/users/{id} | Excluir um usuário |

### **Gerenciamento de Grupos**
| Método | Rota       | Descrição |
|---------|------------|----------------------------|
| GET     | /api/groups | Listar todos os grupos |
| POST    | /api/groups | Criar um novo grupo |
| GET     | /api/groups/{id} | Obter detalhes de um grupo |
| PUT     | /api/groups/{id} | Atualizar dados de um grupo |
| DELETE  | /api/groups/{id} | Excluir um grupo |

---
## 🔥 Contribuição
Sinta-se livre para contribuir com melhorias no projeto!

Se encontrar algum problema, abra uma **issue** ou envie um **pull request**.

---
## 📜 Licença
Este projeto é distribuído sob a **MIT License**.

