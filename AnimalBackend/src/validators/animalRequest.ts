import { z } from 'zod';

export const animalRequestSchema = z.object({
  user_phone: z.string().min(10).max(10),
  address: z.string().optional(), 
  injury_description: z.string().min(1, "Injury description is required"),
  animal_type: z.string().min(1, "Animal type is required"),
});
