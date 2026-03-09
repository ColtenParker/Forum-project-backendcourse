# Forum API (TypeScript + Express + Prisma)

A production-style backend API for a forum platform where users can register, authenticate with JWT, create posts, and participate in threaded discussions through replies.

## Tech stack

- **Runtime:** Node.js
- **Language:** TypeScript (ESM)
- **Framework:** Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT + bcrypt
- **Dev tooling:** Nodemon, ts-node

## Core features

- User registration and login endpoints.
- Password hashing at account creation.
- JWT issuance on login with expiration.
- Auth middleware protecting forum resources.
- Admin authorization guard for privileged actions.
- Full CRUD for posts.
- Reply creation, update, retrieval, and deletion.
- Post engagement actions (like/follow).
- User profile endpoints for authored, liked, and followed posts.

## API overview

Base URL (local): `http://localhost:8080`

### Public routes

- `GET /` — health/home response.
- `POST /v1/auth/register` — create account.
- `POST /v1/auth/login` — authenticate and receive token.

### Protected routes (JWT required)

#### Users
- `GET /v1/users`
- `GET /v1/users/:id`
- `PATCH /v1/users`
- `DELETE /v1/users`
- `DELETE /v1/users/:id` *(admin only)*
- `GET /v1/users/:id/posts`
- `GET /v1/users/:id/posts-liked`
- `GET /v1/users/:id/posts-followed`

#### Posts
- `GET /v1/posts`
- `POST /v1/posts`
- `GET /v1/posts/:id`
- `PATCH /v1/posts/:id`
- `DELETE /v1/posts/:id`
- `POST /v1/posts/:id/likes`
- `DELETE /v1/posts/:id/likes`
- `POST /v1/posts/:id/follows`
- `DELETE /v1/posts/:id/follows`
- `GET /v1/posts/:id/replies`
- `POST /v1/posts/:id/replies`

#### Replies
- `GET /v1/replies/:id`
- `PATCH /v1/replies/:id`
- `DELETE /v1/replies/:id`

## Data model highlights

- **User** has account identity, verification flag, roles, and notification settings.
- **Password** is stored in a dedicated one-to-one relation for separation of concerns.
- **Post** supports likes, follows, tags, and a reply relationship.
- **Reply** belongs to both a user and a post.

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/forum_db"
JWT_SECRET="replace-with-a-strong-secret"
```

### 3) Run database migrations

```bash
npx prisma migrate dev
```

### 4) Generate Prisma client

```bash
npx prisma generate
```

### 5) Build and run

```bash
npm run build
npm start
```

For development mode with auto-reload:

```bash
npm run dev
```