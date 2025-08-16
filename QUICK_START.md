# 🚀 Family Finance Manager - Quick Start Guide

Get your Family Finance Manager application up and running in minutes!

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
Make sure you have PostgreSQL installed and running. Create a database called `family_finance`.

### 3. Create Environment File
Create a `.env` file in the root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-here
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=family_finance
DB_SYNC=false
DB_LOGGING=false
```

### 4. Start the Application
```bash
npm run start:dev
```

### 5. Seed the Database (Optional)
```bash
npm run seed
```

### 6. Test the API
Your application is now running at `http://localhost:3000`!

## 🔐 Default Login Credentials

After running the seed command, you can use these accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@family.com | admin123 |
| **Member 1** | member1@family.com | member123 |
| **Member 2** | member2@family.com | member123 |
| **Viewer** | viewer@family.com | viewer123 |

## 📱 Test Your First API Call

### 1. Login to Get JWT Token
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@family.com",
    "password": "admin123"
  }'
```

### 2. Use the Token to Access Protected Endpoints
```bash
# Replace YOUR_JWT_TOKEN with the token from step 1
curl -X GET http://localhost:3000/users/family-members \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Project Structure Overview

```
src/
├── auth/          # 🔐 Authentication & JWT
├── users/         # 👥 User management
├── accounts/      # 🏦 Financial accounts
├── transactions/  # 💰 Money movements
├── loans/         # 📝 Lending/borrowing
├── common/        # 🛡️ Guards & decorators
└── config/        # ⚙️ Database & app config
```

## 🎯 Key Features to Try

### 1. **Create an Account**
```bash
curl -X POST http://localhost:3000/accounts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Savings",
    "type": "BANK",
    "currency": "USD",
    "balance": 1000,
    "description": "Personal savings account"
  }'
```

### 2. **Record a Transaction**
```bash
curl -X POST http://localhost:3000/transactions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "EXPENSE",
    "amount": 50,
    "currency": "USD",
    "description": "Grocery shopping",
    "transactionDate": "2024-01-15",
    "accountId": "ACCOUNT_UUID_HERE"
  }'
```

### 3. **Create a Loan**
```bash
curl -X POST http://localhost:3000/loans \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "currency": "USD",
    "description": "Loan for car repair",
    "dueDate": "2024-06-15",
    "borrowerId": "USER_UUID_HERE"
  }'
```

## 🔍 Explore the API

### Public Endpoints
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login

### Protected Endpoints (require JWT token)
- `GET /auth/profile` - Your profile
- `GET /users/family-members` - List family members
- `GET /accounts` - Your accounts
- `GET /transactions` - Your transactions
- `GET /loans` - Your loans

## 🛠️ Development Commands

```bash
# Development mode with auto-reload
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Database operations
npm run typeorm:generate-migration
npm run typeorm:run-migrations
npm run typeorm:revert-migration

# Seed database
npm run seed
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or change port in .env
PORT=3001
```

#### 2. **Database Connection Issues**
- Ensure SQLite is working
- Check file permissions for database file
- Verify `.env` configuration

#### 3. **JWT Token Issues**
- Check `JWT_SECRET` in `.env`
- Ensure token is not expired (24h default)
- Verify Authorization header format

#### 4. **Validation Errors**
- Check request body format
- Ensure all required fields are provided
- Verify data types (numbers, dates, etc.)

### Debug Mode
```bash
npm run start:debug
```

## 📚 Next Steps

1. **Read the Full Documentation**: Check `README.md` for comprehensive details
2. **Explore the API**: Use the endpoints in `API_DOCUMENTATION.md`
3. **Customize the Application**: Modify entities, services, and controllers
4. **Add New Features**: Implement additional business logic
5. **Deploy to Production**: Configure production database and security

## 🆘 Need Help?

- 📖 Check the full `README.md`
- 📋 Review `API_DOCUMENTATION.md`
- 🐛 Look for similar issues in the code
- 💡 Check the NestJS documentation
- 🚀 Ask questions in the project repository

---

**Happy coding! 🎉**

Your Family Finance Manager is now ready to help families manage their finances effectively!
