
# Food Ordering System

A MERN stack application for a food ordering system with user authentication, profile management, and order processing.

## Project Structure

```
/food-ordering-system
├── /backend
│   ├── /controllers
│   ├── /middlewares
│   ├── /models
│   ├── /routes
│   ├── .env
│   ├── package.json
│   └── server.js
└── /frontend
    ├── /public
    ├── /src
    │   ├── /components
    │   ├── /context
    │   ├── /hooks
    │   ├── /lib
    │   ├── /pages
    │   └── /services
    ├── package.json
    └── vite.config.js
```

## Features

- User authentication (login/signup)
- User profile management
- Food browsing and filtering by categories
- Shopping cart functionality
- Order placement (with or without account)
- Order history for registered users

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-ordering
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

### Frontend
- React
- React Router
- TanStack Query
- Tailwind CSS
- Framer Motion
- Axios

## License

MIT
