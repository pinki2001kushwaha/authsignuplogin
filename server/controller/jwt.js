const con = require("../model/dbcon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Use a consistent secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Signup Controller
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const query = "SELECT * FROM jwt WHERE email = $1";
        const result = await con.query(query, [email]);

        if (result.rows && result.rows.length > 0) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const insertQuery = "INSERT INTO jwt (username, email, password) VALUES ($1, $2, $3)";
        const insertValues = [username, email, hashpassword];
        await con.query(insertQuery, insertValues);

        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const query = "SELECT * FROM jwt WHERE email = $1";
        const result = await con.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Create a JWT token
        const token = jwt.sign(
            { email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { email: user.email, username: user.username } 
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


const protectRoute = (req, res, next) => {
    try {
      
        const token = req.cookies?.usertoken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { email: decoded.email, username: decoded.username };
console.log(req.user)
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

// Example protected route
const loginreturn = (req, res) => {
    return res.json({
        email: req.user.email,
        username: req.user.username,
        login: "success"
    });
    // console.log(object)
};

const logout = (req, res) => {
    try {
        res.clearCookie("usertoken");  
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { signup, login, protectRoute, loginreturn ,logout};
