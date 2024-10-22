import { Resend } from 'resend';

export interface ResetPasswordEmailData {
    email: string,
    emailTemplate: any
}

export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendMail = async (
    { emailTemplate, email }: ResetPasswordEmailData
) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'www.phanordpicsouroberto11@gmail.com',
        subject: 'Réinitialiser votre mot de passe',
        react: emailTemplate
    });
}