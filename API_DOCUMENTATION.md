# Family Finance Manager - API Documentation

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 API Endpoints

### Authentication

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "MEMBER"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "MEMBER"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "MEMBER"
  }
}
```

#### GET /auth/profile
Get current user profile (requires authentication).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "MEMBER",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Users

#### GET /users
List all users (Admin/Member only).

**Response:**
```json
[
  {
    "id": "uuid",
    "email": "admin@family.com",
    "name": "Family Admin",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /users/family-members
List family members (all roles).

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "role": "MEMBER"
  }
]
```

#### GET /users/:id
Get user details (Admin or own profile only).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "MEMBER",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH /users/:id
Update user profile (Admin or own profile only).

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

#### PATCH /users/:id/role
Change user role (Admin only).

**Request Body:**
```json
{
  "role": "MEMBER"
}
```

#### DELETE /users/:id
Delete user (Admin only).

### Accounts

#### POST /accounts
Create new account.

**Request Body:**
```json
{
  "name": "My Bank Account",
  "type": "BANK",
  "currency": "USD",
  "balance": 1000,
  "description": "Main checking account"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "My Bank Account",
  "type": "BANK",
  "currency": "USD",
  "balance": 1000,
  "description": "Main checking account",
  "userId": "uuid",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /accounts
List user accounts.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Bank Account",
    "type": "BANK",
    "currency": "USD",
    "balance": 1000,
    "description": "Main checking account",
    "userId": "uuid",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /accounts/by-currency/:currency
Filter accounts by currency.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Bank Account",
    "type": "BANK",
    "currency": "USD",
    "balance": 1000,
    "description": "Main checking account",
    "userId": "uuid",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /accounts/balance/:currency
Get total balance by currency.

**Response:**
```json
{
  "currency": "USD",
  "totalBalance": 1500
}
```

#### GET /accounts/:id
Get account details.

**Response:**
```json
{
  "id": "uuid",
  "name": "My Bank Account",
  "type": "BANK",
  "currency": "USD",
  "balance": 1000,
  "description": "Main checking account",
  "userId": "uuid",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "role": "MEMBER"
  }
}
```

#### PATCH /accounts/:id
Update account.

**Request Body:**
```json
{
  "name": "Updated Account Name",
  "description": "Updated description"
}
```

#### DELETE /accounts/:id
Delete account.

### Transactions

#### POST /transactions
Create new transaction.

**Request Body:**
```json
{
  "type": "EXPENSE",
  "amount": 50,
  "currency": "USD",
  "description": "Grocery shopping",
  "transactionDate": "2024-01-15",
  "accountId": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "type": "EXPENSE",
  "amount": 50,
  "currency": "USD",
  "exchangeRate": null,
  "description": "Grocery shopping",
  "transactionDate": "2024-01-15T00:00:00.000Z",
  "sourceUserId": "uuid",
  "targetUserId": null,
  "accountId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /transactions/internal-transfer
Create internal transfer (Admin only).

**Request Body:**
```json
{
  "amount": 100,
  "currency": "USD",
  "description": "Transfer to family member",
  "transactionDate": "2024-01-15",
  "accountId": "uuid",
  "targetUserId": "uuid"
}
```

#### GET /transactions
List transactions.

**Response:**
```json
[
  {
    "id": "uuid",
    "type": "EXPENSE",
    "amount": 50,
    "currency": "USD",
    "exchangeRate": null,
    "description": "Grocery shopping",
    "transactionDate": "2024-01-15T00:00:00.000Z",
    "sourceUserId": "uuid",
    "targetUserId": null,
    "accountId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "sourceUser": {
      "id": "uuid",
      "name": "John Doe"
    },
    "targetUser": null,
    "account": {
      "id": "uuid",
      "name": "My Bank Account"
    }
  }
]
```

#### GET /transactions/by-type/:type
Filter transactions by type.

**Response:** Same as GET /transactions but filtered by type.

#### GET /transactions/by-date-range
Filter transactions by date range.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:** Same as GET /transactions but filtered by date range.

#### GET /transactions/:id
Get transaction details.

**Response:**
```json
{
  "id": "uuid",
  "type": "EXPENSE",
  "amount": 50,
  "currency": "USD",
  "exchangeRate": null,
  "description": "Grocery shopping",
  "transactionDate": "2024-01-15T00:00:00.000Z",
  "sourceUserId": "uuid",
  "targetUserId": null,
  "accountId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "sourceUser": {
    "id": "uuid",
    "name": "John Doe"
  },
  "targetUser": null,
  "account": {
    "id": "uuid",
    "name": "My Bank Account"
  }
}
```

#### PATCH /transactions/:id
Update transaction (limited fields).

**Request Body:**
```json
{
  "description": "Updated description",
  "transactionDate": "2024-01-16"
}
```

#### DELETE /transactions/:id
Delete transaction (Admin only).

### Loans

#### POST /loans
Create new loan.

**Request Body:**
```json
{
  "amount": 500,
  "currency": "USD",
  "description": "Loan for car repair",
  "dueDate": "2024-06-15",
  "borrowerId": "uuid",
  "accountId": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "amount": 500,
  "currency": "USD",
  "status": "PENDING",
  "description": "Loan for car repair",
  "dueDate": "2024-06-15T00:00:00.000Z",
  "paidAt": null,
  "lenderId": "uuid",
  "borrowerId": "uuid",
  "accountId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /loans
List loans.

**Response:**
```json
[
  {
    "id": "uuid",
    "amount": 500,
    "currency": "USD",
    "status": "PENDING",
    "description": "Loan for car repair",
    "dueDate": "2024-06-15T00:00:00.000Z",
    "paidAt": null,
    "lenderId": "uuid",
    "borrowerId": "uuid",
    "accountId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "lender": {
      "id": "uuid",
      "name": "John Doe"
    },
    "borrower": {
      "id": "uuid",
      "name": "Jane Doe"
    },
    "account": {
      "id": "uuid",
      "name": "My Bank Account"
    }
  }
]
```

#### GET /loans/pending
List pending loans.

**Response:** Same as GET /loans but filtered by status = PENDING.

#### GET /loans/overdue
List overdue loans.

**Response:** Same as GET /loans but filtered by overdue loans.

#### GET /loans/summary
Get loan summary.

**Response:**
```json
{
  "totalLent": 1000,
  "totalBorrowed": 500,
  "pendingLent": 800,
  "pendingBorrowed": 300
}
```

#### GET /loans/:id
Get loan details.

**Response:**
```json
{
  "id": "uuid",
  "amount": 500,
  "currency": "USD",
  "status": "PENDING",
  "description": "Loan for car repair",
  "dueDate": "2024-06-15T00:00:00.000Z",
  "paidAt": null,
  "lenderId": "uuid",
  "borrowerId": "uuid",
  "accountId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "lender": {
    "id": "uuid",
    "name": "John Doe"
  },
  "borrower": {
    "id": "uuid",
    "name": "Jane Doe"
  },
  "account": {
    "id": "uuid",
    "name": "My Bank Account"
  }
}
```

#### PATCH /loans/:id
Update loan.

**Request Body:**
```json
{
  "description": "Updated description",
  "dueDate": "2024-07-15"
}
```

#### PATCH /loans/:id/mark-paid
Mark loan as paid.

**Response:**
```json
{
  "id": "uuid",
  "amount": 500,
  "currency": "USD",
  "status": "PAID",
  "description": "Loan for car repair",
  "dueDate": "2024-06-15T00:00:00.000Z",
  "paidAt": "2024-01-15T00:00:00.000Z",
  "lenderId": "uuid",
  "borrowerId": "uuid",
  "accountId": "uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

#### DELETE /loans/:id
Delete loan (Admin only).

## 🔒 Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["amount must be a positive number"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "You can only access your own accounts"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User with ID uuid not found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User with this email already exists"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## 📊 Data Models

### Enums

#### UserRole
- `ADMIN`: Full access to all features
- `MEMBER`: Can manage own data
- `VIEWER`: Read-only access

#### AccountType
- `CASH`: Physical cash accounts
- `BANK`: Bank accounts or digital wallets

#### Currency
- `IRR`: Iranian Rial
- `USD`: US Dollar
- `EUR`: Euro
- `INR`: Indian Rupee

#### TransactionType
- `INCOME`: Money received
- `EXPENSE`: Money spent
- `INTERNAL_TRANSFER`: Money moved between family members
- `LOAN`: Money lent to another family member
- `REPAYMENT`: Loan repayment received

#### LoanStatus
- `PENDING`: Loan not yet repaid
- `PAID`: Loan fully repaid

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with your configuration.

3. **Run the application:**
   ```bash
   npm run start:dev
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

5. **Test the API:**
   Use the endpoints above with a tool like Postman or curl.

## 🔐 Default Users (after seeding)

- **Admin**: admin@family.com / admin123
- **Member 1**: member1@family.com / member123
- **Member 2**: member2@family.com / member123
- **Viewer**: viewer@family.com / viewer123

## 📝 Notes

- All amounts are stored as decimal numbers with precision 15 and scale 2
- Dates are stored in ISO format (YYYY-MM-DD)
- UUIDs are used for all primary keys
- JWT tokens expire after 24 hours by default
- Passwords are hashed using bcrypt with 10 rounds
- Database synchronization is enabled by default (disable in production)
