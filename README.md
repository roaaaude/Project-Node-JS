# Business Card API

A REST API built with Node.js, Express.js, and MongoDB for managing users and business cards.

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Joi** - Data validation
- **dotenv** - Environment variables
- **morgan** - HTTP request logger
- **cors** - Cross-Origin Resource Sharing

## Project Structure

```
├── app.js                  # Main application file
├── config/                 # Configuration files
│   └── db.js               # Database connection
├── controllers/            # Route controllers
│   ├── cards.controller.js # Card controllers
│   └── users.controller.js # User controllers
├── middleware/             # Custom middleware
│   ├── auth.middleware.js  # Authentication middleware
│   └── error.middleware.js # Error handling middleware
├── models/                 # Mongoose models
│   ├── card.model.js       # Card model
│   └── user.model.js       # User model
├── routes/                 # API routes
│   ├── cards.routes.js     # Card routes
│   └── users.routes.js     # User routes
├── utils/                  # Utility functions
│   ├── generateBizNumber.js # Generate unique business number
│   ├── generateToken.js    # Generate JWT token
│   └── seedData.js         # Seed initial data
├── validation/             # Joi validation schemas
│   ├── card.validation.js  # Card validation
│   └── user.validation.js  # User validation
├── logs/                   # Log files
├── .env                    # Environment variables
└── package.json            # Project dependencies
```

## API Endpoints

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PATCH /api/users/:id` - Update user business status
- `DELETE /api/users/:id` - Delete user

### Cards

- `GET /api/cards` - Get all cards
- `GET /api/cards/my-cards` - Get user's cards
- `GET /api/cards/:id` - Get card by ID
- `POST /api/cards` - Create a new card (Business users only)
- `PUT /api/cards/:id` - Update card
- `PATCH /api/cards/:id` - Like/unlike card
- `DELETE /api/cards/:id` - Delete card

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/business-card-app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

### Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## Initial Data

The application automatically seeds the database with:
- 3 users (regular, business, admin)
- 3 sample business cards

## Authentication

The API uses JWT for authentication. To access protected routes, include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Validation

All incoming data is validated using Joi validation schemas.

## Testing Commands

Here are some example commands to test the API:

### Check if the API is running:
```bash
curl http://localhost:3000
```

### Register a new user:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":{"first":"John","middle":"","last":"Doe"},"phone":"0501234567","email":"john@example.com","password":"Password@123","address":{"country":"Israel","city":"Tel Aviv","street":"Main Street","houseNumber":10}}' http://localhost:3000/api/users
```

### Login:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"Password@123"}' http://localhost:3000/api/users/login
```

### Get all cards (public endpoint):
```bash
curl http://localhost:3000/api/cards
```

### Get a specific card by ID:
```bash
curl http://localhost:3000/api/cards/<card_id>
```

### Create a new card (requires business user token):
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"title":"New Card","subtitle":"New Card Subtitle","description":"This is a new business card created via API","phone":"0501234567","email":"newcard@example.com","web":"https://newcard.example.com","address":{"country":"Israel","city":"Haifa","street":"Beach Road","houseNumber":42}}' http://localhost:3000/api/cards
```

### Like a card (requires authentication):
```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer <token>" http://localhost:3000/api/cards/<card_id>
```

### Get all users (requires admin token):
```bash
curl -H "Authorization: Bearer <admin_token>" http://localhost:3000/api/users
```

### Update business status (requires authentication):
```bash
curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"isBusiness":true}' http://localhost:3000/api/users/<user_id>
```

## Seed User Credentials

You can use these credentials to test different roles:

1. **Regular User**
   - Email: regular@example.com
   - Password: Regular@123

2. **Business User**
   - Email: business@example.com
   - Password: Business@123

3. **Admin User**
   - Email: admin@example.com
   - Password: Admin@123 