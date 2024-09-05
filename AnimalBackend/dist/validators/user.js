"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignupSchema = zod_1.default.object({
    name: zod_1.default.string().min(4, "Name is required"),
    phone: zod_1.default.string().min(10, "Must be atleast 10 digits").max(10, "A Phone number cannot be more than 10 numbers"),
    email: zod_1.default.string().email("Invalid Email Address"),
    address: zod_1.default.string().min(6, "Enter A Valid Address "),
    password: zod_1.default.string().min(6, "Enter Atleast 6 characters long password")
});
exports.userLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid Email Address"),
    password: zod_1.default.string().min(6, "Invalid Password")
});
