import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure you have a user model
const protect = async(req, res, next) => {
    let token;
    // Check if token is provided in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            next(); // Move to the next middleware/controller
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;