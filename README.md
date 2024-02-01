# WebArcade
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](http://forthebadge.com)
[<img src="https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white" />](https://codepen.io/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/insooeric/WebArcade)
[![Website webarcade](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://webarcade.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Full Stack MERN web application where user can login and compete with others by playing games and achieving high scores.

## Deployed link! => [WebArcade](https://webarcade.onrender.com/)

# Tables of Contents
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

# Installation
The following instruction includes both Backend and Frontend installation.
To only operate Frontend, feel free to skip the [Backend](##backend)
## Backend
1. Create `.env` file under `/backend` folder.
2. Create MongoDB account (https://www.mongodb.com/atlas/database)
   - After creation, proceed to connect compass.
   - Copy the connection string. `mongodb+srv://...`
3. Make sure to replace the following brackets `[]`
```
// .env
NODE_ENV=development
PORT=8000
MONGO_URI=[mongodb+srv://YourDatabaseURL:IncludePasswordhere...]
JWT_SECRET=[secret code]
```

## Frontend
$\color{#CC5500}{\textsf{In case of using Backend follow the instruction below}}$
1. Open `vite.config.js`.
2. Make sure the `target`:
```
"/api": {
target: "http://localhost:8000",
changeOrigin: true,
},
```
...matches with the backend URL. (8000 by default)

# Usage
## Backend
1. Open terminal at `\backend`
2. Run `$ npm install` to install all dependencies.
3. Run `$ node server.js`

## Frontend
1. Open terminal at `\frontend`
2. Run `$ npm install` to install all dependencies.
3. Run `$ npm run dev`

# Features
- Backend
  - **ExpressJS:** A fast, unopinionated, minimalist web framework for Node.js.
  - **MongoDB:** NoSQL database used for storing user information.
  - **BCryptJS:** A library to help hash passwords securely.
  - **JSON Web Token (JWT):** Used for authentication and secure data exchange.
  
- Frontend
  - **ReactJS (Vite):** A JavaScript library for building user interfaces.
  - **Redux:** A predictable state container used for managing application state.
  - **jQuery:** A fast, small, and feature-rich JavaScript library.
  - **ThreeJS:** An API used to create and display animated 3D graphics in a web browser.


## License
MIT License: see the [LICENSE file](../master/LICENSE) for details.
