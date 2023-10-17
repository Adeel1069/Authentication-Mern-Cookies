## Backend

- Basic express server
  - make user of express package
- ES modules
- Configure env through dotenv.config()
  - make user of dotenv package
- Folder structure
- Routes
- Controllers
- Custom Error Middleware
  - make of express-async-handler under controllers
- Connection to mongoose
  - make user of mongoose package
- Installation of compas
- Add all routes to the postman collection
- Register Profile
  - Check if user already exist
  - Hasth the password
  - Generate jwt token and set it httpOnly cookie
  - make use of bcrypt package and jsonwebtoken package
- Auth route
  - Check the credentials
  - Compare the password
  - Generate jwt token and set it httpOnly cookie
- Logout route
  - Remove the cookie
- Auth middleware
  - Protect private routes
  - Make use of cookie-parser to parse the res.cookies
  - Add current user to the req object by removing password

## Frontend

- Install react with vite into the frontend folder and some other packages
  - npm create vite@latest frontend
  - run both frontend and backend server with Concurrent package
    - npm run dev
  - npm i react-bootstrap bootsrap react-icons concurrent react-router-dom
- Added routes and some other components
