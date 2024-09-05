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
const getReqNgo = (0, express_1.Router)();
getReqNgo.get('/getReq', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.phone;
        const status = req.query.status;
        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const data = yield prisma_1.default.ngo.findFirst({
            where: { phone },
            select: {
                org_name: true
            }
        });
        const requests = yield prisma_1.default.animal_requests.findMany({
            where: {
                request_status: false,
            },
        });
        return res.json(requests);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
}));
getReqNgo.get('/getReqTrue', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.phone;
        const org_name = req.headers['x-custom-header'];
        console.log(org_name);
        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const requests = yield prisma_1.default.animal_requests.findMany({
            where: {
                request_status: true,
                org_name: org_name
            },
        });
        return res.json(requests);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
}));
getReqNgo.get('/acceptReq', authMiddle_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.query.id);
    const phone = req.phone;
    if (!id || !phone) {
        return res.status(400).json({ error: 'Request ID is required.' });
    }
    try {
        const animal = yield prisma_1.default.animal_requests.findUnique({
            where: {
                request_id: id,
            },
        });
        if (!animal) {
            return res.status(404).json({ error: 'Request not found.' });
        }
        if (animal.request_status) {
            return res.status(403).json({ msg: 'Request is already assigned to another NGO.' });
        }
        const ngo = yield prisma_1.default.ngo.findFirst({
            where: {
                phone: phone,
            },
            select: {
                org_name: true,
            },
        });
        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found.' });
        }
        yield prisma_1.default.animal_requests.update({
            where: {
                request_id: id,
            },
            data: {
                request_status: true,
                org_name: ngo.org_name,
            },
        });
        return res.json({ msg: 'Request accepted successfully.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while accepting the request.' });
    }
}));
exports.default = getReqNgo;
