# Node.js Authentication API

A robust authentication system built with Node.js, Express, PostgreSQL, and Sequelize. This project implements JWT-based authentication with role-based access control (RBAC).

## Project Structure

```
├── app/
│   ├── config/
│   │   ├── auth.config.js    # JWT and authentication configuration
│   │   └── db.config.js      # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── user.controller.js # User management logic
│   ├── middlewares/
│   │   ├── authJwt.js        # JWT verification middleware
│   │   ├── verifySignUp.js   # Signup validation middleware
│   │   └── index.js          # Middleware entry point
│   ├── models/
│   │   ├── index.js          # Database models initialization
│   │   ├── user.model.js     # User model definition
│   │   └── role.model.js     # Role model definition
│   └── routes/
│       ├── auth.routes.js    # Authentication routes
│       └── user.routes.js    # User management routes
└── server.js                 # Application entry point
```

## Features

- User Authentication (Signup/Login)
- JWT-based Authorization
- Role-Based Access Control (User, Moderator, Admin)
- Password Encryption
- Input Validation
- PostgreSQL Database Integration
- CORS Support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Docker (optional)

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up PostgreSQL (using Docker):
```bash
docker run --name postgres-auth -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

4. Create `.env` file:
```env
SECRET_KEY=your-256-bit-secret
PORT=8080
```

## Database Configuration

Update `app/config/db.config.js` with your PostgreSQL credentials:

```javascript
export default {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "somedb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user

### User Routes
- `GET /api/test/all` - Public content
- `GET /api/test/user` - User content (requires token)
- `GET /api/test/mod` - Moderator content
- `GET /api/test/admin` - Admin content
- `PUT /api/test/update-roles` - Update user roles (admin only)

## Role Management

The system supports three roles:
- User (default)
- Moderator
- Admin

Roles are automatically initialized when the application starts.

## Usage Examples

### Register a New User
```http
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
  "username": "user",
  "email": "user@example.com",
  "password": "123456"
}
```

### Login
```http
POST http://localhost:8080/api/auth/signin
Content-Type: application/json

{
  "username": "user",
  "password": "123456"
}
```

### Update User Roles (Admin Only)
```http
PUT http://localhost:8080/api/test/update-roles
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "userId": 2,
  "roles": ["admin", "moderator"]
}
```

## Security Features

- Password Hashing (bcryptjs)
- JWT Token Authentication
- Role-Based Authorization
- Input Validation Middleware
- CORS Protection

## Starting the Application

```bash
node server.js
```

The server will start on port 8080 (or the port specified in your environment variables).

## Error Handling

The API implements comprehensive error handling for:
- Invalid Authentication
- Unauthorized Access
- Database Errors
- Input Validation
- Duplicate Users

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

ISC
