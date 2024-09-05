import { z } from 'zod';

export const ngoSignupSchema = z.object({
  org_name: z.string().min(4, "Organization name is required"),
  phone : z.string().min(10,"Must be atleast 10 digits").max(10,"A Phone number cannot be more than 10 numbers"),
  email: z.string().email("Invalid email address"),
  fixed_address: z.string().min(6, "Fixed address is required"),
  working_hours: z.string().min(1, "Working hours are required"),
  upi_id: z.string().min(4, "UPI ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const ngoLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
