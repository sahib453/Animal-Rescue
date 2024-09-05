"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({
            msg: "Invalid Authorization"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, 'sahib');
        req.phone = decoded.phone;
        next();
    }
    catch (err) {
        return res.status(403).json({
            msg: "Error Occurred"
        });
    }
};
exports.authenticateToken = authenticateToken;
