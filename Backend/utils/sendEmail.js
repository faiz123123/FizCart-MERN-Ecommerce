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

const sendEmail = async (toOrOptions, subject, text) => {
    try {
        const mailOptions = normalizeEmailOptions(toOrOptions, subject, text);

        if (!mailOptions.to) {
            throw new Error('Email recipient is required');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            ...mailOptions
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
