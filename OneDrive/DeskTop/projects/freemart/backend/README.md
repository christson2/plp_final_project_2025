# Backend README

This directory contains the FreeMart backend service.

DB configuration
- The backend uses SQLite in development by default. The canonical database file is the repository root `freemart.db`.
- You can override the path at runtime with the environment variable `DB_PATH`.

Run migrations
- From `backend/` run:

  npx sequelize db:migrate

  (The `backend/config/config.json` is configured to use `../../freemart.db` in development to match the repo root.)

Start the server (development)
- On Windows you can use the included `start:dev` script which sets `DB_PATH` automatically:

  cd backend
  npm run start:dev

Or run manually:

  cd backend
  SET DB_PATH=..\freemart.db; npm start

Notes
- Ensure migrations are run before starting the server the first time so the required tables are present.
# FreeMart Backend (Node.js + Express + MySQL)

A RESTful API backend for the FreeMart local marketplace platform.

## Quick Start

### Prerequisites
- Node.js v16 or higher
- MySQL 8.0+
- npm or yarn

### Setup (Development)

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Copy environment template and configure**:
```bash
copy .env.example .env
# Edit backend/.env with your DB credentials, JWT_SECRET, etc.
```

3. **Start MySQL** (using Docker Compose, from repo root):
```bash
docker-compose up -d
```

4. **Run migrations and seed data**:
```bash
npm run migrate
npm run seed
```

5. **Start the server**:
```bash
npm run dev      # development with auto-reload (nodemon)
# or
npm start        # production mode
```

Server will listen on `http://localhost:4000`.

### Environment Variables (.env)
```
PORT=4000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=freemart_dev
DB_USER=freemart_user
DB_PASSWORD=changeme

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

MEDIA_LOCAL_PATH=./uploads
```

## Project Structure
```
backend/
├── src/
│   ├── index.js              # Server entry (starts Express)
│   ├── app.js                # Express app setup
│   ├── config/               # DB config
│   ├── models/               # Sequelize models
│   ├── controllers/          # Request handlers
│   ├── routes/               # API routes
│   ├── middlewares/          # Auth, upload, error handling
│   ├── services/             # Business logic (AI, media, USSD)
│   ├── workers/              # Background jobs (optional)
│   └── utils/                # Utilities
├── migrations/               # Database migrations (Sequelize)
├── seeders/                  # Seed data
├── tests/                    # Integration tests
├── config/config.json        # Sequelize CLI config
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` — Create account
- `POST /api/auth/login` — Login (returns JWT)

### Users
- `GET /api/users` — List all users
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user (auth required)
- `DELETE /api/users/:id` — Soft delete user (auth required)

### Profiles
- `GET /api/profiles` — List profiles (filter by `profile_type` or `category`)
- `GET /api/profiles/:id` — Get profile
- `POST /api/profiles` — Create profile (auth required)
- `PUT /api/profiles/:id` — Update profile (auth required)
- `DELETE /api/profiles/:id` — Delete profile (auth required)

### Products
- `GET /api/products` — Search products (query: `category`, `q`, `lat`, `lon`, `radius`)
- `GET /api/products/:id` — Get product
- `POST /api/products` — Create product (auth required)
- `PUT /api/products/:id` — Update product (auth required)
- `DELETE /api/products/:id` — Delete product (auth required)

### Services
- `GET /api/services` — List nearby services (requires `lat` & `lon`)
- `GET /api/services/:id` — Get service
- `POST /api/services` — Create service (auth required)
- `PUT /api/services/:id` — Update service (auth required)
- `DELETE /api/services/:id` — Delete service (auth required)

### Requests
- `GET /api/requests` — List nearby requests (requires `lat` & `lon`, optional `category`)
- `GET /api/requests/:id` — Get request
- `POST /api/requests` — Create request (auth required)
- `PUT /api/requests/:id` — Update request (auth required)
- `DELETE /api/requests/:id` — Delete request (auth required)

### Bids
- `GET /api/bids/:id` — Get bid
- `POST /api/bids` — Submit bid (auth required)
- `PUT /api/bids/:id` — Update bid (auth required)
- `DELETE /api/bids/:id` — Delete bid (auth required)
- `GET /api/bids/request/:request_id` — List bids for a request

### Videos
- `GET /api/videos` — List all videos
- `GET /api/videos/:id` — Get video metadata
- `POST /api/videos` — Upload video (multipart/form-data, auth required)
- `PUT /api/videos/:id` — Update caption (auth required)
- `DELETE /api/videos/:id` — Delete video (auth required)

### Reviews
- `GET /api/reviews/:id` — Get review
- `GET /api/reviews/user/:user_id` — List reviews for a user
- `POST /api/reviews` — Add review (auth required)
- `PUT /api/reviews/:id` — Update review (auth required)
- `DELETE /api/reviews/:id` — Delete review (auth required)

### Health Check
- `GET /api/ping` — Returns `{ ok: true, time: <timestamp> }`

## Authentication

All protected endpoints require an `Authorization` header with a JWT token:

```bash
Authorization: Bearer <your_jwt_token>
```

Obtain a token by calling `POST /api/auth/login` or `POST /api/auth/signup`.

## Running Tests

```bash
npm test
```

Tests use Jest + Supertest. Add more tests in `backend/tests/`.

## Running Migrations

```bash
npm run migrate        # Run all pending migrations
npx sequelize db:migrate:undo  # Rollback last migration
```

## Seeding Data

```bash
npm run seed           # Run all seeders
npx sequelize db:seed:undo:all  # Remove seeded data
```

## File Uploads

Video and image files are uploaded to the local `./uploads` folder (configurable via `MEDIA_LOCAL_PATH` in `.env`).
In production, consider moving to S3 or another object storage service.

## Notes

- Database schema is automatically created/synced during `npm run migrate`.
- Passwords are hashed with bcrypt; never store plaintext passwords.
- JWT tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`).
- All timestamps are UTC.

## Troubleshooting

**Port already in use**: Change `PORT` in `.env`.
**DB connection failed**: Verify MySQL is running and credentials match `.env`.
**migrations not running**: Ensure `sequelize-cli` is installed: `npm install -g sequelize-cli`.

## License

MIT
