const nodemailer = require('nodemailer');

const normalizeEmailOptions = (toOrOptions, subject, text) => {
    if (typeof toOrOptions === 'object' && toOrOptions !== null) {
        return {
            to: toOrOptions.to || toOrOptions.email,
            subject: toOrOptions.subject,
            text: toOrOptions.text,
            html: toOrOptions.html || toOrOptions.message
        };
    }

    return { to: toOrOptions, subject, text };
};

const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('EMAIL_USER and EMAIL_PASS must be configured before sending email');
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000
    });
};

const sendEmail = async (toOrOptions, subject, text) => {
    const mailOptions = normalizeEmailOptions(toOrOptions, subject, text);

    if (!mailOptions.to) {
        throw new Error('Email recipient is required');
    }

    const transporter = createTransporter();

    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        ...mailOptions
    });

    console.log('Email sent:', info && info.messageId);
    return info;
};

module.exports = sendEmail;
