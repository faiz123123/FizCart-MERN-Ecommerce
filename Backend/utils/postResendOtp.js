require('dotenv').config();
const http = require('http');

const data = JSON.stringify({ email: 'aashiya.riyaz@gmail.com' });

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 5000,
  path: '/api/auth/resend-otp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();
