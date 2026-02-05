import z from "zod";



export const LoginSchema = z.object({
    email : z.string().min(1),
    password : z.string().min(4)
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;