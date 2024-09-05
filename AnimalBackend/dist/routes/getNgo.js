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
const getNgo = (0, express_1.Router)();
getNgo.get('/ngos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ngos = yield prisma_1.default.ngo.findMany({
            select: {
                org_name: true,
                fixed_address: true,
                working_hours: true,
                upi_id: true,
                phone: true,
                email: true,
            },
        });
        res.json(ngos);
    }
    catch (error) {
        console.error('Error fetching NGOs:', error);
        res.status(500).json({ msg: 'An error occurred while fetching NGOs.' });
    }
}));
exports.default = getNgo;
