<h1>postgre CRUD - Nodejs, Reactjs</h1>



 # PostgreSQL CRUD Application - Node.js, React, Docker
This application provides a user management system with CRUD operations (Create, Read, Update, Delete). It uses PostgreSQL for the database, Express.js for the backend API, React.js for the frontend UI, and Docker for containerization. The entire stack is orchestrated using Docker Compose with Nginx as a reverse proxy.
## Features
 Create, Read, Update, and Delete users
 Containerized application using Docker
 PostgreSQL database with persistent storage
 Nginx reverse proxy for routing
 React frontend with Bootstrap styling
 RESTful API backend
## Prerequisites
ake sure you have the following installed:
 [Docker](https://docs.docker.com/get-docker/)
 [Docker Compose](https://docs.docker.com/compose/install/)
## Quick Start
1. **Clone the Repository**
  ```bash
  git clone <repository_url>
  cd <project_directory>
  ```
2. **Environment Setup**
   Backend (.env):
  ```env
  DB_HOST=db
  DB_USER=postgres
  DB_PASSWORD=728728
  DB_DATABASE=crud_operations
  DB_PORT=5432
  PORT=3000
  ```
   Frontend (.env):
  ```env
  VITE_API_URL=http://localhost:8080/api
  ```
3. **Build and Run with Docker Compose**
  ```bash
  docker-compose up --build
  ```
4. **Access the Application**
  - Frontend: http://localhost:8080
  - API: http://localhost:8080/api
## Docker Services
### Frontend Container
 React application built with Vite
 Served through Nginx
 Port: 80 (internal)
### Backend Container
 Node.js/Express API
 Connected to PostgreSQL
 Port: 3000 (internal)
### Database Container
 PostgreSQL 13
 Persistent volume storage
 Port: 5432 (internal)
### Nginx Reverse Proxy
 Routes traffic to frontend and backend
 Port: 8080 (exposed)
## Development
### Local Development without Docker
. **Backend Setup**
  ```bash
  cd backend
  npm install
  # Update .env with local PostgreSQL settings
  npm start
  ```
2. **Frontend Setup**
  ```bash
  cd frontend
  npm install
  # Update .env with local API URL
  npm run dev
  ```
### With Docker
 Make changes to the code
 Rebuild containers: `docker-compose up --build`
 View logs: `docker-compose logs -f [service_name]`
## Troubleshooting
### Database Connection Issues

## Services

The application consists of four main services:

1. **Frontend (React)**
   - Built with Vite and React
   - Served through Nginx
   - Includes Bootstrap for styling
   - Features a responsive UI for CRUD operations

2. **Backend (Node.js/Express)**
   - RESTful API endpoints
   - PostgreSQL database connection
   - Environment variable configuration

3. **Database (PostgreSQL)**
   - Persistent data storage
   - Automatic database initialization
   - Health checks implemented

4. **Nginx (Reverse Proxy)**
   - Routes requests to appropriate services
   - Handles API and frontend routing
   - Configured for production use

## API Endpoints

- `GET /api` - Retrieve all users
- `POST /api` - Create a new user
- `PUT /api` - Update an existing user
- `DELETE /api` - Delete a user

## Development

To make changes to the application:
to start running : docker-compose up --build      

