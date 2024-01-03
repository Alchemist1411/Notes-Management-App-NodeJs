# Asssment-Speer-Backend
Speer Asssment-> Backend Engineer

# Notes API

The Notes API is a Node.js application that provides CRUD operations for managing notes. Users can create, read, update, and delete their notes, as well as share notes with other users.

## Features

- User authentication using JSON Web Tokens (JWT)
- CRUD operations for managing notes
- Share notes with other users
- Search functionality based on keywords

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM (Object Data Modeling)
- JSON Web Tokens (JWT) for authentication
- Rate limiting and request throttling for handling high traffic

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Alchemist1411/Asssment-Speer-Backend.git
   cd <project-directory>
   ```
2. Install Dependencies:
   
   ```bash
   npm install
   ```
4. Required enviornment:
   
   Has been setup already with dummy **JWT_SECRET_KEY** and **User/Notes Database** for easily testing the endpoints.

6. Run the Application:
   
   To run app using nodemon on your machine
   ```bash
   npm run dev
   ```
8. For API Testing:
   
   Use either Postman or Thunderclient to test the API endpoints
   While using **/api/notes/** endpoints pass the **Authorization** token, which you got during user login.
