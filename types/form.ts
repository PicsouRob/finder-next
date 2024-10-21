import { z } from 'zod';

export const signinSchema = z.object({
    email: z.string().min(1, 'L\'adresse e-mail est obligatoire').email('Addresse email incorrect'),
    password: z.string({ message: "Le mot de passe est obligatoire" }).min(8, 'Le mot de passe doit être au moins de 8 caractères'),
});

export const resetPasswordSchema = z.object({
    password: z.string({ message: "Le mot de passe est obligatoire" }).min(8, 'Le mot de passe doit être au moins de 8 caractères'),
    confirmPassword: z.string().min(8, 'La confirmation doit être au moins 8 caractères'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ['confirmPassword']
});

export const completedSignupSchema = z.object({
    type: z.string().min(1, "Le mot de passe est obligatoire"),
    position: z.string().min(1, 'Le carrière est obligatoire'),
    location: z.string().min(1, "L'adresse est obligatoire"),
    avatar: z.string().min(1, "Votre photo de profil est obligatoire"),
    phoneNumber: z.string().min(1, "Votre numéro de téléphone est obligatoire"),
    description: z.string().min(1, "Votre biographie est obligatoire"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'L\'adresse e-mail est obligatoire').email('Addresse email incorrect'),
});

export const signUpSchema = z.object({
    name: z.string().min(1, 'Le nom est obligatoire'),
    email: z.string().min(1, 'L\'adresse e-mail est obligatoire').email('Addresse email incorrect'),
    password: z.string({ message: "Le mot de passe est obligatoire" }).min(8, 'Le mot de passe doit être au moins de 8 caractères'),
});

export type SignInSchemaType = z.infer<typeof signinSchema>;

export type SignUpchemaType = z.infer<typeof signUpSchema>;

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export type CompletedSignupSchemaType = z.infer<typeof completedSignupSchema>;