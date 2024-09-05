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
exports.createAnimalRequest = void 0;
const aws_1 = __importDefault(require("../config/aws"));
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const createAnimalRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_phone, injury_description, animal_type } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: fileStream,
        ContentType: file.mimetype,
    };
    try {
        const data = yield aws_1.default.upload(uploadParams).promise();
        const imageUrl = data.Location;
        const animalRequest = yield prisma.animal_requests.create({
            data: {
                user_phone,
                image_url: imageUrl,
                injury_description,
                animal_type,
                address: req.body.address || "",
            },
        });
        res.status(201).json({ message: 'Animal request created successfully', animalRequest });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating animal request' });
    }
    finally {
        fs_1.default.unlinkSync(file.path); // Delete the local file after uploading to S3
    }
});
exports.createAnimalRequest = createAnimalRequest;
