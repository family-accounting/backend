# Family Finance Manager

A comprehensive NestJS application for managing family finances with role-based access control, multi-currency support, and transaction tracking.

## 🚀 Features

### Core Functionality
- **User Management**: Family members with different roles (Admin, Member, Viewer)
- **Account Management**: Multiple accounts per user (Cash/Bank) with different currencies
- **Transaction Tracking**: Income, expenses, internal transfers, loans, and repayments
- **Loan Management**: Track lending/borrowing between family members
- **Multi-currency Support**: IRR, USD, EUR, INR with exchange rate tracking

### Security & Access Control
- **JWT Authentication**: Secure login and session management
- **Role-based Access Control**: Different permissions for Admin, Member, and Viewer roles
- **Data Isolation**: Users can only access their own data (unless Admin)

### Business Logic
- **Automatic Balance Updates**: Account balances update automatically with transactions
- **Internal Transfers**: Redistribute money between family members without affecting total assets
- **Loan Tracking**: Monitor pending and paid loans with due dates
- **Transaction History**: Comprehensive logging of all financial activities

## 🛠 Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL with TypeORM
- **ORM**: TypeORM with automatic migrations
- **Authentication**: JWT + Passport.js
- **Validation**: class-validator + class-transformer
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
src/
├── auth/                 # Authentication & JWT management
├── users/               # User management & roles
├── accounts/            # Account management & balances
├── transactions/        # Transaction tracking & history
├── loans/              # Loan management & tracking
├── common/              # Shared decorators & guards
└── config/              # Configuration & database setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun
- PostgreSQL (v12+)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd family-finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Setup PostgreSQL Database**
   ```bash
   # Create database
   createdb family_finance
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE family_finance;
   \q
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # PostgreSQL Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=password
   DB_NAME=family_finance
   DB_SYNC=false
   DB_LOGGING=false
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

6. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api` (if configured)

## 🗄️ Database Setup

### PostgreSQL Configuration
The application uses PostgreSQL as the primary database. Make sure you have:

1. **PostgreSQL installed** (version 12 or higher)
2. **Database created**: `family_finance`
3. **User permissions** configured properly

### Environment Variables
Required database environment variables:
```env
DB_HOST=localhost          # Database host
DB_PORT=5432              # Database port
DB_USERNAME=postgres      # Database username
DB_PASSWORD=password      # Database password
DB_NAME=family_finance    # Database name
DB_SYNC=false             # Set to false in production
DB_LOGGING=false          # Enable SQL logging for debugging
```

### Database Migrations
For production environments, use migrations instead of auto-sync:
```bash
# Generate migration
npm run typeorm:generate-migration

# Run migrations
npm run typeorm:run-migrations

# Revert migration
npm run typeorm:revert-migration
```

## 🔐 Authentication

### User Roles

- **ADMIN**: Full access to all features and data
- **MEMBER**: Can manage own accounts, transactions, and loans
- **VIEWER**: Read-only access to family data

### API Endpoints

#### Public Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication

#### Protected Endpoints
- `GET /auth/profile` - Get user profile
- `POST /auth/refresh` - Refresh JWT token

## 📊 API Endpoints

### Users
- `GET /users` - List all users (Admin/Member only)
- `GET /users/family-members` - List family members (all roles)
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user profile
- `PATCH /users/:id/role` - Change user role (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

### Accounts
- `POST /accounts` - Create new account
- `GET /accounts` - List user accounts
- `GET /accounts/by-currency/:currency` - Filter by currency
- `GET /accounts/balance/:currency` - Get total balance by currency
- `GET /accounts/:id` - Get account details
- `PATCH /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

### Transactions
- `POST /transactions` - Create transaction
- `POST /transactions/internal-transfer` - Create internal transfer (Admin only)
- `GET /transactions` - List transactions
- `GET /transactions/by-type/:type` - Filter by transaction type
- `GET /transactions/by-date-range` - Filter by date range
- `GET /transactions/:id` - Get transaction details
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction (Admin only)

### Loans
- `POST /loans` - Create loan
- `GET /loans` - List loans
- `GET /loans/pending` - List pending loans
- `GET /loans/overdue` - List overdue loans
- `GET /loans/summary` - Get loan summary
- `GET /loans/:id` - Get loan details
- `PATCH /loans/:id` - Update loan
- `PATCH /loans/:id/mark-paid` - Mark loan as paid
- `DELETE /loans/:id` - Delete loan (Admin only)

## 💰 Transaction Types

- **INCOME**: Money received (increases account balance)
- **EXPENSE**: Money spent (decreases account balance)
- **INTERNAL_TRANSFER**: Money moved between family members
- **LOAN**: Money lent to another family member
- **REPAYMENT**: Loan repayment received

## 🏦 Account Types

- **CASH**: Physical cash accounts
- **BANK**: Bank account or digital wallet

## 💱 Supported Currencies

- **IRR** (Iranian Rial)
- **USD** (US Dollar)
- **EUR** (Euro)
- **INR** (Indian Rupee)

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure authentication with configurable expiration
- **Role-based Access**: Granular permissions based on user roles
- **Data Validation**: Input validation using class-validator
- **SQL Injection Protection**: TypeORM provides built-in protection

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `name`
- `role` (ADMIN/MEMBER/VIEWER)
- `isActive`
- `createdAt`
- `updatedAt`

### Accounts Table
- `id` (UUID, Primary Key)
- `name`
- `type` (CASH/BANK)
- `currency` (IRR/USD/EUR/INR)
- `balance` (Decimal)
- `description`
- `userId` (Foreign Key)
- `isActive`
- `createdAt`
- `updatedAt`

### Transactions Table
- `id` (UUID, Primary Key)
- `type` (INCOME/EXPENSE/INTERNAL_TRANSFER/LOAN/REPAYMENT)
- `amount` (Decimal)
- `currency`
- `exchangeRate` (Nullable)
- `description`
- `transactionDate`
- `sourceUserId` (Foreign Key)
- `targetUserId` (Foreign Key, Nullable)
- `accountId` (Foreign Key)
- `createdAt`
- `updatedAt`

### Loans Table
- `id` (UUID, Primary Key)
- `amount` (Decimal)
- `currency`
- `status` (PENDING/PAID)
- `description`
- `dueDate` (Nullable)
- `paidAt` (Nullable)
- `lenderId` (Foreign Key)
- `borrowerId` (Foreign Key)
- `accountId` (Foreign Key, Nullable)
- `createdAt`
- `updatedAt`

## 🚀 Deployment

### Environment Variables
Set the following environment variables for production:

```env
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
DB_HOST=your-production-db-host
DB_PORT=5432
DB_USERNAME=your-production-db-user
DB_PASSWORD=your-production-db-password
DB_NAME=family_finance
DB_SYNC=false
DB_LOGGING=false
```

### Database Migration
For production, set `DB_SYNC=false` and use proper database migrations:

```bash
# Generate migration
npm run typeorm:generate-migration

# Run migrations
npm run typeorm:run-migrations
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔮 Future Enhancements

- **Dashboard**: Visual financial overview and charts
- **Budget Planning**: Monthly/yearly budget management
- **Expense Categories**: Categorize transactions for better tracking
- **Reports**: Generate financial reports and summaries
- **Mobile App**: React Native or Flutter mobile application
- **Real-time Updates**: WebSocket integration for live updates
- **Export Features**: Export data to CSV/PDF formats
- **Multi-language Support**: Internationalization support
