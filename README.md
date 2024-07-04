Got it! Here's how you can update the README to clarify the seed process:

---

# Eva Backend Assignment
- Project name: evaback

EvaExchange is a trading game developed by Super Traders to educate users on share trading terminology. This backend application provides RESTful APIs for managing portfolios, shares, and trading operations.

## Project Overview

The backend of EvaExchange is built using Node.js with Sequelize ORM for database management. PostgreSQL is used as the relational database for storing users, portfolios, shares, and transactions.

### Installation
Install dependencies
### Prerequisites

- Node.js
- PostgreSQL
- Docker (running PostgreSQL in a container)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd evaback
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Use the  `.env` file.
   - Initially set `DB_SEED=true` in the `.env` file to seed the database on the first run.

4. Start the server:
   ```bash
   npm start
   ```

5. Seed the database (optional):
   - After the initial  npm start command ,you have to disable seeding, modify `DB_SEED=false` in the `.env` file.

### Postman Enviroments
   - Download the [postman_collection.json](./src/evabackend.postman_collection.json) file.
   - Import Postman Environment
### Using Postman for API Testing
   - This project uses JOI to validate the values entered in the bodies of API requests. 

### Example Request Bodies
- BUY and Sell Request Body:
```bash
{
  "userId": 1,
  "portfolioId": 1,
  "symbol": "XYZ",
  "quantity": 5
}
```


