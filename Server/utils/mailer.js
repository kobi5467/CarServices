import nodeMailer from 'nodemailer'

const SENDER_EMAIL = 'okhl.server.client@gmail.com';
const SENDER_PASSWORD = 'o1k2h3l4@'

export const sendEmailAsync = async (recipientEmail, subject, message) => {
    let testAccount = await nodeMailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = await nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: SENDER_EMAIL, // generated ethereal user
        pass: SENDER_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: SENDER_EMAIL,
        to : recipientEmail,
        subject : subject,
        text : message
    })

    console.log(`Message sent: ${info.messageId}`)
}