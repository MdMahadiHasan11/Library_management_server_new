# Library Management API

A comprehensive RESTful API for managing library books and borrowing operations built with Node.js, Express.js, TypeScript, and MongoDB.

## 🚀 Features

### Core Functionality
- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Borrow books with quantity tracking
- **Inventory Management**: Automatic availability tracking based on copies
- **Borrowed Books Summary**: Aggregated view of all borrowed books

### Technical Features
- **Schema Validation**: Comprehensive input validation using Zod
- **Error Handling**: Global error handling with detailed error responses
- **Database Transactions**: Safe borrowing operations with MongoDB transactions
- **Filtering & Sorting**: Advanced book filtering by genre with sorting options
- **TypeScript**: Full type safety throughout the application
- **Mongoose Integration**: Advanced MongoDB operations with static/instance methods

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/md-nasim-mondal/next-level-assignment-03-library-management-api
cd next-level-assignment-03-library-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017
# Or use MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net
```

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL


### Book Endpoints

#### Create a Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "FICTION",
  "isbn": "978-0-7432-7356-5",
  "description": "A classic American novel",
  "copies": 5
}
```

#### Get All Books
```http
GET /api/books?filter=FICTION&sortBy=title&sort=asc&limit=10
```

**Query Parameters:**
- `filter`: Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sortBy`: Sort by field (title, author, createdAt, copies)
- `sort`: Sort order (asc, desc)
- `limit`: Number of results to return

#### Get Book by ID
```http
GET /api/books/:bookId
```

#### Update a Book
```http
PUT /api/books/:bookId
Content-Type: application/json

{
  "title": "Updated Title",
  "copies": 3
}
```

#### Delete a Book
```http
DELETE /api/books/:bookId
```

### Borrow Endpoints

#### Borrow a Book
```http
POST /api/borrow
Content-Type: application/json

{
  "book": "60d5ecb74b24c72d88e4e123",
  "quantity": 2,
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Get Borrowed Books Summary
```http
GET /api/borrow
```

**Response Format:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Great Gatsby",
        "isbn": "978-0-7432-7356-5"
      },
      "totalQuantity": 5
    }
  ]
}
```

## 🏗️ Project Structure


## 🔧 Key Features Implementation

### Schema Validation
- **Zod Integration**: Comprehensive input validation for all endpoints
- **Custom Error Messages**: User-friendly validation error responses
- **Type Safety**: Full TypeScript integration with Zod schemas

### Business Logic
- **Copy Management**: Automatic tracking of available book copies
- **Availability Updates**: Real-time availability status based on inventory
- **Transaction Safety**: MongoDB transactions for borrowing operations

### Mongoose Advanced Features
- **Static Methods**: `Book.hasEnoughCopies()` for inventory checking
- **Instance Methods**: `book.updateAvailability()` for status updates
- **Pre-save Middleware**: Automatic availability calculation

### Aggregation Pipeline
- **Borrowed Books Summary**: Complex aggregation with book details lookup
- **Data Transformation**: Proper response formatting with projection

### Error Handling
- **Global Error Handler**: Centralized error processing
- **Validation Errors**: Detailed Zod and Mongoose validation errors
- **Database Errors**: Cast errors, duplicate key errors handling
- **Consistent Response Format**: Standardized error response structure

## 🧪 Testing the API

### Using Postman or Thunder Client

1. **Create a Book**:
   - POST `http://localhost:5000/api/books`
   - Add the book creation payload

2. **Get All Books**:
   - GET `http://localhost:5000/api/books`
   - Try with query parameters for filtering

3. **Borrow a Book**:
   - POST `http://localhost:5000/api/borrow`
   - Use a valid book ID from step 1

4. **Check Borrowed Summary**:
   - GET `http://localhost:5000/api/borrow`

## 🚀 Deployment

### Vercel Deployment
The project includes `vercel.json` configuration for easy deployment:

```bash
npm run build
vercel --prod
```

### Environment Variables for Production
```env
PORT=5000
DATABASE_URL=your_mongodb_atlas_connection_string
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Md. Nasim Mondal**
- GitHub: https://github.com/md-nasim-mondal
- Email: mdnasimmondal622@gmail.com

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- Mongoose team for the powerful ODM
- Zod team for the schema validation library
- MongoDB team for the robust database solution