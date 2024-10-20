# Setup for local testing

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- Postman

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up the Database

a. Install PostgreSQL if you haven't already.

b. Create a new database for the project:

```bash
psql -U postgres
CREATE DATABASE safechains;
\q
```

c. Create a `.env` file in the root of the project and add your database connection string:

```text
DATABASE_URL="postgresql://[USERNAME]:[PASSWORD]@localhost:5432/safechains"
```

### 3. Setup Prisma

a. Generate Prisma client / Update client after schema changes:

```bash
npx prisma generate
```

b. Set up database schema / Apply migrations after making changes:

```bash
npx prisma migrate dev
```

c. web UI to view and edit database:

```bash
npx prisma studio
```

### 4. Start the local Server

```bash
pnpm run dev
```

---

# Postman Collection setup

Import the `safechains.postman_collection.json` file into Postman.

## Usage

The collection uses an optionnal variable `{{base_url}}` set to `http://localhost:3000/api` by default. If your server runs on a different URL:

- Click on the collection name
- Go to the "Variables" tab
- Update the "CURRENT VALUE" of `base_url`

---

# Swagger API Documentation

After starting the server, you can access the Swagger UI at:

```text
http://localhost:3000/api-docs
```
