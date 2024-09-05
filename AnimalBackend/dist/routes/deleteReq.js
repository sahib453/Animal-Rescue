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
const delReq = (0, express_1.Router)();
delReq.delete('/delReq', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.query.id);
    try {
        const phone = req.phone;
        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const request = yield prisma_1.default.animal_requests.findUnique({
            where: {
                request_id: id
            },
            select: {
                user_phone: true
            }
        });
        if (!request) {
            return res.status(404).json({ error: 'Request not found.' });
        }
        if (phone !== request.user_phone) {
            return res.status(403).json({ error: 'You are not authorized to delete this request.' });
        }
        yield prisma_1.default.animal_requests.delete({
            where: {
                request_id: id
            }
        });
        return res.json({ message: 'Request deleted successfully.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the request.' });
    }
}));
exports.default = delReq;
