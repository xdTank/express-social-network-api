import nodemailer from 'nodemailer';

export const emailAdapter = {
    async sendEmail(email: string, message: string, subject: string) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "xdtank777@gmail.com",
                pass: "",
            },
        })
        async function main() {
            const info = await transporter.sendMail({
                from: 'xdtank777 <xdtank777@gmail.com>',
                to: email,
                subject: subject,
                html: message,
            })
            return info
        }

        main().catch(console.error);
    }
}




