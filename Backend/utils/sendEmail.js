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
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

const sendEmail = async (toOrOptions, subject, text) => {
    const mailOptions = normalizeEmailOptions(toOrOptions, subject, text);

    if (!mailOptions.to) {
        throw new Error('Email recipient is required');
    }

    const transporter = createTransporter();

    // Verify transporter configuration before sending
    await transporter.verify();

    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        ...mailOptions
    });

    console.log('Email sent:', info && info.messageId);
    return info;
};

module.exports = sendEmail;
