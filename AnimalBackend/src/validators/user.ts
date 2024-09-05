import z from 'zod';

export const userSignupSchema = z.object({
    name : z.string().min(4,"Name is required"),
    phone : z.string().min(10,"Must be atleast 10 digits").max(10,"A Phone number cannot be more than 10 numbers"),
    email  : z.string().email("Invalid Email Address"),
    address : z.string().min(6,"Enter A Valid Address "),
    password : z.string().min(6,"Enter Atleast 6 characters long password")
})

export const userLoginSchema = z.object({
    email:z.string().email("Invalid Email Address"),
    password:z.string().min(6,"Invalid Password")
})