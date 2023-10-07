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

- `POST /auth/signin`: Endpoint for user login.
- `POST /auth/signup`: Endpoint for user registration.
- `POST /auth/verify`: Endpoint for OTP verification.

### Slot Routes

- `POST /slot/create-free-solt`: Endpoint for creating free slots.
- `POST /slot/create-appointment`: Endpoint for creating appointments.

For detailed information on each endpoint, refer to the corresponding route files in the project.

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