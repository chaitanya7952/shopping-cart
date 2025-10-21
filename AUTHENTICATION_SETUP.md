# Authentication Setup Guide

## Overview
This guide explains the authentication system that has been added to the Mini Shopping Cart application.

## Backend Authentication Features

### 1. User Model (`backend/models/User.js`)
- **Fields**: name, email, password
- **Password Hashing**: Uses bcryptjs for secure password storage
- **Validation**: Email format validation, password length requirements
- **Methods**: `comparePassword()` for login verification

### 2. Authentication Routes (`backend/routes/auth.js`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### 3. Authentication Controller (`backend/controllers/authController.js`)
- **register()**: Creates new user account
- **login()**: Authenticates user and returns JWT token
- **getProfile()**: Returns user profile information

### 4. Authentication Middleware (`backend/middleware/auth.js`)
- Validates JWT tokens
- Protects routes that require authentication
- Adds user information to request object

## Frontend Authentication Features

### 1. Authentication Context (`frontend/src/context/AuthContext.jsx`)
- Manages authentication state globally
- Provides login, register, and logout functions
- Handles token storage and axios configuration
- Auto-checks authentication status on app load

### 2. Login Component (`frontend/src/components/Login.jsx`)
- User-friendly login form
- Email and password validation
- Error handling and loading states
- Redirects to home page on successful login

### 3. Register Component (`frontend/src/components/Register.jsx`)
- User registration form
- Password confirmation validation
- Client-side validation for password length
- Error handling and loading states

### 4. Protected Routes (`frontend/src/components/ProtectedRoute.jsx`)
- Wraps components that require authentication
- Redirects to login page if user is not authenticated
- Shows loading state while checking authentication

## How to Use

### 1. Start the Backend Server
```bash
cd miniCart/backend
npm install
npm run dev
```

### 2. Start the Frontend Development Server
```bash
cd miniCart/frontend
npm install
npm run dev
```

### 3. Access the Application
- Open your browser and go to `http://localhost:5173`
- Click "Register" to create a new account
- Or click "Login" if you already have an account
- Once logged in, you can access the shopping cart features

## API Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <jwt-token>
```

## Environment Variables

Make sure your `.env` file in the backend contains:
```
MONGO_URI=mongodb://localhost:27017/minishoppingcart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs
2. **JWT Tokens**: Secure token-based authentication
3. **Input Validation**: Both client and server-side validation
4. **Protected Routes**: Authentication required for shopping features
5. **Token Storage**: Secure token storage in localStorage

## User Flow

1. **Unauthenticated User**: Can only see the home page with login/register options
2. **Registration**: User creates account → automatically logged in → redirected to home
3. **Login**: User enters credentials → receives JWT token → redirected to home
4. **Authenticated User**: Can access products and checkout pages
5. **Logout**: Clears token and user data → redirected to home page

## Dependencies Added

### Backend
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token generation and verification

### Frontend
- `axios`: HTTP client for API calls (already included)

The authentication system is now fully integrated and ready to use!
