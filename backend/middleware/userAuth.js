const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/userModel");

const clientJwt = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication failed: Token missing");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken,"decodedTokenvvvvvvvvvvvvvvvvvvv");
    if (!decodedToken) {
      throw new Error("Authentication failed: Invalid token");
    }

    if (decodedToken.role !== "client") {
      throw new Error("Authentication failed: User is not a client");
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error("Authentication failed: User not found");
    }

    if (user.isBlocked) {
      throw new Error("Authentication failed: User is blocked");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    if (error.name === "TokenExpiredError") {
        console.log("koppppppppp");
        
      return res.status(403).json({ message: "Token expired" });
      
    }
    return res.status(401).json({ message: error.message });
  }
};

module.exports = clientJwt;


