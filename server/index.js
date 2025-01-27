const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const myapp = express();

// Middleware
myapp.use(express.json());
myapp.use(cookieParser());
myapp.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001","http://localhost:3002"], 
  credentials: true,
}));

const port = 4500;


const { routejwt } = require("../server/route/jwt");
myapp.use("/", routejwt);

// Start the server
myapp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
