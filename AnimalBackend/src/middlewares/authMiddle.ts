import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    phone?: string;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            msg: "Invalid Authorization"
        });
    }

    try {
        const decoded = jwt.verify(authHeader,'sahib') as { phone: string };
        req.phone = decoded.phone;
        next();
    } catch (err) {
        return res.status(403).json({
            msg: "Error Occurred"
        });
    }
};
