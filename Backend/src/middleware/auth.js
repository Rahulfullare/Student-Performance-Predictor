let jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  let token = req.cookies?.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided " });
  }

  // If token starts with "Bearer " → remove it
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload (id, role, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token " });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access Denied: Admins only " });
  }
  next();
}

module.exports = { verifyToken, isAdmin };
