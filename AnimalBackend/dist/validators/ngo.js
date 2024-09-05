"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngoLoginSchema = exports.ngoSignupSchema = void 0;
const zod_1 = require("zod");
exports.ngoSignupSchema = zod_1.z.object({
    org_name: zod_1.z.string().min(4, "Organization name is required"),
    phone: zod_1.z.string().min(10, "Must be atleast 10 digits").max(10, "A Phone number cannot be more than 10 numbers"),
    email: zod_1.z.string().email("Invalid email address"),
    fixed_address: zod_1.z.string().min(6, "Fixed address is required"),
    working_hours: zod_1.z.string().min(1, "Working hours are required"),
    upi_id: zod_1.z.string().min(4, "UPI ID is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.ngoLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
