"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors.map((err) => ({
                path: err.path[0],
                message: err.message,
            })),
        });
    }
    next();
};
exports.validateRequest = validateRequest;
