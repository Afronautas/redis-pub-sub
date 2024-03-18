import nodemailer from 'nodemailer'

const MAIL_FROM = "your_email@gmail.com"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: MAIL_FROM,
        pass: ""
    },
    debug: true
})

export const sendMail = async (subject, to, message) => {
    try {
        await transporter.sendMail({
            from: MAIL_FROM,
            subject,
            to,
            html: message
        })
    } catch (error) {
        throw new Error("UNABLE TO SEND MAIL")
    }
}