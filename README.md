# E-Commerce Full Stack App

A full-stack e-commerce application built to demonstrate industry-level Java patterns.

**Backend:** Spring Boot 3 · Spring Data JPA / Hibernate · Spring Security 6 · JWT · PostgreSQL  
**Frontend:** React 18 · Create React App · React Router · Axios  
**Infrastructure:** Docker · docker-compose · GitHub Actions CI

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.9+ (or use the included `./mvnw`) |
| Node.js | 20+ |
| Docker & Docker Compose | latest |
| PostgreSQL | 16+ (only needed if running without Docker) |

---

## Running with Docker (recommended)

This starts PostgreSQL, the backend, and the frontend together.

```bash
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080/api |
| PostgreSQL | localhost:5432 |

To stop:
```bash
docker-compose down
```

To stop and remove the database volume:
```bash
docker-compose down -v
```

---

## Running locally (without Docker)

### 1. Start PostgreSQL

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE ecommerce_db;
```

Default connection expected in `application.yml`:
- Host: `localhost:5432`
- Database: `ecommerce_db`
- Username: `postgres`
- Password: `password`

To override without editing the file, set environment variables:
```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce_db
export SPRING_DATASOURCE_USERNAME=your_user
export SPRING_DATASOURCE_PASSWORD=your_password
```

### 2. Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

To run with a specific profile:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 3. Run the frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`.  
The `"proxy"` field in `package.json` forwards `/api/*` requests to `http://localhost:8080` automatically — no CORS config needed in dev.

---

## Running tests

```bash
cd backend
./mvnw test
```

Tests use an H2 in-memory database (no PostgreSQL required). The `test` Spring profile is activated automatically.

---

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | HS256 signing key (min 256 bits) | insecure dev default |
| `SPRING_DATASOURCE_URL` | JDBC connection URL | `jdbc:postgresql://localhost:5432/ecommerce_db` |
| `SPRING_DATASOURCE_USERNAME` | DB username | `postgres` |
| `SPRING_DATASOURCE_PASSWORD` | DB password | `password` |

**Never commit real secrets.** Set `JWT_SECRET` via environment variable in production.

---

## API Overview

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new customer |
| POST | `/api/auth/login` | Public | Login, returns JWT |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | List all products (paginated) |
| GET | `/api/products?search=name` | Public | Search by name |
| GET | `/api/products/{id}` | Public | Get product by ID |
| GET | `/api/products/category/{id}` | Public | Products by category |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/{id}` | Admin | Update product |
| DELETE | `/api/products/{id}` | Admin | Delete product |

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cart` | Customer | Get current cart |
| POST | `/api/cart/items` | Customer | Add item to cart |
| PATCH | `/api/cart/items/{id}?quantity=N` | Customer | Update item quantity |
| DELETE | `/api/cart` | Customer | Clear cart |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | Customer | Place order from cart |
| GET | `/api/orders` | Customer | Order history (paginated) |
| GET | `/api/orders/{id}` | Customer | Get order by ID |
| PATCH | `/api/orders/{id}/status?status=SHIPPED` | Admin | Update order status |

### Authentication header
All protected endpoints require:
```
Authorization: Bearer <token>
```

---

## Project structure

```
.
├── backend/
│   └── src/main/java/com/ecommerce/
│       ├── config/          # Security config, CORS
│       ├── controller/      # REST controllers
│       ├── dto/             # Request/Response DTOs
│       ├── entity/          # JPA entities
│       ├── exception/       # Global error handling
│       ├── repository/      # Spring Data JPA repos
│       ├── security/        # JWT filter, UserDetailsService
│       └── service/         # Business logic
├── frontend/
│   └── src/
│       ├── api/             # Axios instance with interceptors
│       └── App.jsx          # Routes and nav
├── docker-compose.yml
└── .github/workflows/ci.yml
```
