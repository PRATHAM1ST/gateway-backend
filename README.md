# Node.js Backend Project

**Project Description:** This Node.js backend project provides several routes for user authentication, OTP handling, appointment creation, and free slot management. It uses Express for routing and interacts with a MongoDB database using Prisma. The project also includes error handling, validation, and authentication middleware.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Routes and Endpoints](#routes-and-endpoints)
- [Middleware](#middleware)
- [Database](#database)
- [Prisma Schema](#prisma-schema)
- [Dependencies](#dependencies)
- [License](#license)
- [Contact Information](#contact-information)

## Installation

To get started with this project, follow these installation steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/PRATHAM1ST/gateway-backend.git
   cd gateway-backend
   ```

2. Install the project dependencies:

   ```bash
    npm install && npx prisma generate
   ```

3. Set up the required environment variables. Create a `.env` file in the project root directory and configure the following variables:

   ```dotenv
   DATABASE_URL=<mongodb_connection_url>
   JWT_SECRET=<your_jwt_secret_key>
   ```

## Configuration

Explain how to configure the project, including setting up the MongoDB connection and JWT secret key in the `.env` file.

## Usage

To run the project, use the following command:

```bash
npm start
```

This will start the server, and it will be accessible at `http://localhost:4000`.

## Routes and Endpoints

### Authentication Routes

#### Sign In (POST /auth/signin)

**Request:**

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "myPassword123"
}
```

**Successful Response:**

```json
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2023-10-07T12:34:56.789Z",
    "updatedAt": "2023-10-07T12:34:56.789Z",
    "otpVerified": true
    // Other user properties
  },
  "message": "User Found"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "User not found"
}
```

#### Sign Up (POST /auth/signup)

**Request:**

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newPassword123"
}
```

**Successful Response:**

```json
{
  "success": true,
  "data": {
    "id": "54321",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2023-10-07T12:34:56.789Z",
    "updatedAt": "2023-10-07T12:34:56.789Z",
    "otpVerified": false
    // Other user properties
  },
  "message": "User Created"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "User not created"
}
```

#### Verify OTP (POST /auth/verify)

**Request:**

```http
POST /auth/verify
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "otp": 123456
}
```

**Successful Response:**

```json
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2023-10-07T12:34:56.789Z",
    "updatedAt": "2023-10-07T12:34:56.789Z",
    "otpVerified": true
    // Other user properties
  },
  "message": "OTP Verified"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "OTP does not match"
}
```

### Slot Routes

#### Create Free Slot (POST /slot/create-free-slot)

**Request:**

```http
POST /slot/create-free-slot
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "dates": [
    {
      "startDateTime": "2023-10-07T14:00:00Z",
      "endDateTime": "2023-10-07T15:00:00Z"
    },
    {
      "startDateTime": "2023-10-08T10:00:00Z",
      "endDateTime": "2023-10-08T11:00:00Z"
    }
  ]
}
```

**Successful Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "startDateTime": "2023-10-07T14:00:00Z",
      "endDateTime": "2023-10-07T15:00:00Z",
      "duration": "2023-10-07T01:00:00Z",
      "userId": "12345"
    },
    {
      "id": "def456",
      "startDateTime": "2023-10-08T10:00:00Z",
      "endDateTime": "2023-10-08T11:00:00Z",
      "duration": "2023-10-08T01:00:00Z",
      "userId": "12345"
    }
    // Other free slots
  ],
  "message": "Free Slot Created"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Free Slot not created"
}
```

#### Create Appointment (POST /slot/create-appointment)

**Request:**

```http
POST /slot/create-appointment
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "startDateTime": "2023-10-10T14:00:00Z",
  "endDateTime": "2023-10-10T15:00:00Z",
  "slotId": "abc123",
  "title": "Meeting",
  "details": "Discuss project"
}
```

**Successful Response:**

```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "title": "Meeting",
    "details": "Discuss project",
    "startDateTime": "2023-10-10T14:00:00Z",
    "endDateTime": "2023-10-10T15:00:00Z",
    "duration": "2023-10-10T01:00:00Z",
    "appointerId": "12345",
    "appointeeId": "67890",
    "occupiedSlotId": "abc123"
  },
  "message": "Appointment Created"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Appointment not created"
}
```

These examples provide a clear understanding of the expected request format and the corresponding responses for each route in your Node.js backend project.

## Middleware

- `authMiddleware`: Middleware for user authentication. It checks for a valid JWT token in the request cookies.

## Database

The project uses a MongoDB database. Make sure to configure the `DATABASE_URL` environment variable in the `.env` file.

## Prisma Schema

The Prisma schema file (`prisma/schema.prisma`) defines the data models and their relationships used in the project.

## Dependencies

- `cookie-parser`: Middleware for parsing cookies in incoming requests.
- `cors`: Middleware for handling Cross-Origin Resource Sharing.
- `dotenv`: Library for loading environment variables from a `.env` file.
- `express`: Web framework for handling HTTP requests.
- `js-sha512`: Library for hashing passwords using SHA-512.
- `jsonwebtoken`: Library for working with JWT tokens.
- `nodemailer`: Library for sending emails.
- `zod`: Library for data validation.

## License

Specify the license under which your project is distributed.

## Contact Information

Provide a way for users to get in touch with you or the project maintainers for questions or support.