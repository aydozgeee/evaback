Got it! Here's how you can update the README to clarify the seed process:

---

# EvaExchange Trading Game Backend

EvaExchange is a trading game developed by Super Traders to educate users on share trading terminology. This backend application provides RESTful APIs for managing portfolios, shares, and trading operations.

## Project Overview

The backend of EvaExchange is built using Node.js with Sequelize ORM for database management. PostgreSQL is used as the relational database for storing users, portfolios, shares, and transactions.

## Installation

### Prerequisites

- Node.js
- PostgreSQL
- Docker (running PostgreSQL in a container)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EvaExchange-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example`.
   - Initially set `DB_SEED=true` in the `.env` file to seed the database on the first run.

4. Start the server:
   ```bash
   npm start
   ```

5. Seed the database (optional):
   - After the initial  npm start command ,you have to disable seeding, modify `DB_SEED=false` in the `.env` file.

## Postman Enviroments





```

---

