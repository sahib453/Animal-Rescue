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
const getReq = (0, express_1.Router)();
getReq.get('/getReq', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.phone;
        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const user = yield prisma_1.default.users.findUnique({
            where: { phone: phone },
        });
        if (!user) {
            return res.status(404).json({ error: 'User phone not found.' });
        }
        const requests = yield prisma_1.default.animal_requests.findMany({
            where: {
                user_phone: user.phone
            }
        });
        return res.json(requests);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
}));
exports.default = getReq;
