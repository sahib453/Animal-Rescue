"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const animalRequestController_1 = require("../controllers/animalRequestController");
const authMiddle_1 = require("../middlewares/authMiddle");
const animalRequest_1 = require("../validators/animalRequest");
const validateRequest_1 = require("../middlewares/validateRequest");
const animalRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
animalRouter.post('/animal-request', authMiddle_1.authenticateToken, upload.single('image'), (0, validateRequest_1.validateRequest)(animalRequest_1.animalRequestSchema), animalRequestController_1.createAnimalRequest);
exports.default = animalRouter;
