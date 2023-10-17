# MERN User CRUD Application with Authentication Using HttpOnly Cookie

![MERN Logo](https://i.imgur.com/6nCY5yG.png)

## Introduction

This is a basic MERN (MongoDB, Express, React, Node) User CRUD application with authentication. It's designed as a learning project to enhance my expertise in full-stack web development.

## Technologies

- Frontend:

  - React
  - Redux Toolkit for state management
  - React Bootstrap for UI components

- Backend:
  - Node.js
  - Express.js
  - MongoDB for the database
  - Bcrypt.js for password hashing
  - JSON Web Tokens (JWT) for authentication
  - Mongoose for interacting with the database

## Features

- User registration and authentication
- Create, Read, Update, and Delete (CRUD) operations on user data
- Secure user data storage with password hashing and JWT authentication

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- A code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Adeel1069/Authentication-Mern-Cookies.git
```

2. Install dependencies on root:

```bash
npm run install
cd frontend
npm run install
```

3. Configure environment variables: Create a `.env` file in the project root and configure it with the following variables:

```plaintext
NODE_ENV = development
PORT = 5000
MONGO_URI={YOUR_MONGODB_URI_CONNECTION_STRING}
JWT_SECRET={YOUR_SECRET_KEY}
```

4. Start the project (run following command on a root directory, it will run both frontend and backend):

```bash
npm run dev
```
