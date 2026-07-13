require('dotenv').config();
const sendEmail = require('./sendEmail');

const target = process.env.TEST_TARGET_EMAIL || process.env.EMAIL_USER;

(async () => {
  try {
    console.log('Sending test email to', target);
    const info = await sendEmail(target, 'FizCart Test Email', 'This is a test email from FizCart.');
    console.log('Send result:', info);
  } catch (err) {
    console.error('Test send failed:', err);
    process.exitCode = 1;
  }
})();
