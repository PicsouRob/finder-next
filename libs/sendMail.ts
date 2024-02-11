import { Resend } from 'resend';
import Handlebars from "handlebars";

import { ResetPasswordEmailTemplateProps } from "@/types/user";
import { resetPasswordEmailTemplate } from './resetPasswordEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (
    { name, url, email }: ResetPasswordEmailTemplateProps
) => {
    const template: HandlebarsTemplateDelegate<any> = Handlebars.compile(resetPasswordEmailTemplate);
    const data: ResetPasswordEmailTemplateProps = {
        "name": name,
        "email": email,
        "url": url,
        "year": new Date().getFullYear(),
    }
    const htmlBody: string = template(data);

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'www.phanordpicsouroberto11@gmail.com',
        subject: 'Réinitialiser votre mot de passe',
        html: htmlBody
    });
}