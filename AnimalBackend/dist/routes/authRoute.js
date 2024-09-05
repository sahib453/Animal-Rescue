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
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const authMiddle_1 = require("../middlewares/authMiddle");
const authRouter = (0, express_1.Router)();
authRouter.get('/me', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.phone;
    if (!phone) {
        return res.status(400).json({ msg: 'Phone is missing from the token.' });
    }
    try {
        const user = yield prisma_1.default.users.findFirst({
            where: {
                phone
            },
            select: {
                address: true,
                email: true
            },
        });
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.json({
            phone,
            email: user.email,
            address: user.address,
        });
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ msg: 'An error occurred while fetching user data.' });
    }
}));
authRouter.get('/ngome', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.phone;
    if (!phone) {
        return res.status(400).json({ msg: 'Phone is missing from the token.' });
    }
    try {
        const ngo = yield prisma_1.default.ngo.findFirst({
            where: {
                phone
            },
            select: {
                fixed_address: true,
                email: true,
                org_name: true
            },
        });
        console;
        if (!ngo) {
            return res.status(404).json({ msg: 'Ngo not found.' });
        }
        res.json({
            phone,
            fixed_address: ngo.fixed_address,
            email: ngo.email,
            org_name: ngo.org_name
        });
    }
    catch (error) {
        console.error('Error fetching ngo:', error);
        res.status(500).json({ msg: 'An error occurred while fetching ngo data.' });
    }
}));
exports.default = authRouter;
