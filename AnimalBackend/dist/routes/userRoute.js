"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../validators/user");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const userRouter = express_1.default.Router();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, phone, password, address } = req.body;
        const validatedData = user_1.userSignupSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({
                msg: 'Validation failed'
            });
        }
        const result = yield prisma.users.findFirst({
            where: { phone }
        });
        if (result) {
            return res.status(403).json({
                msg: "User already exists"
            });
        }
        else {
            const create = yield prisma.users.create({
                data: {
                    email,
                    name,
                    phone,
                    address,
                    password
                }
            });
            const token = jsonwebtoken_1.default.sign({ phone }, "sahib");
            res.json({
                msg: "Signup successful",
                token: token
            });
        }
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json(err.errors);
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validatedData = user_1.userLoginSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({
                msg: 'Validation failed'
            });
        }
        const result = yield prisma.users.findUnique({
            where: { email, password },
            select: {
                phone: true
            }
        });
        if (!result) {
            return res.status(403).json({
                msg: "Wrong login credentials"
            });
        }
        const phone = result.phone;
        const token = jsonwebtoken_1.default.sign({ phone }, "sahib");
        res.json({
            msg: "Login successful",
            token: token
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json(err.errors);
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = userRouter;
