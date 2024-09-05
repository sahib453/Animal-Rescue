"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalRequestSchema = void 0;
const zod_1 = require("zod");
exports.animalRequestSchema = zod_1.z.object({
    user_phone: zod_1.z.string().min(10).max(10),
    address: zod_1.z.string().optional(),
    injury_description: zod_1.z.string().min(1, "Injury description is required"),
    animal_type: zod_1.z.string().min(1, "Animal type is required"),
});
