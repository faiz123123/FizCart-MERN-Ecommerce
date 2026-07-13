require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const User = require('../model/User');

const base = `http://localhost:${process.env.PORT||5000}`;

const doRequest = (path, method='GET', data=null, token=null) => new Promise((resolve,reject)=>{
  const body = data?JSON.stringify(data):null;
  const options = new URL(base+path);
  const opts = {
    hostname: options.hostname,
    port: options.port,
    path: options.pathname + (options.search||''),
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if(body) opts.headers['Content-Length']=Buffer.byteLength(body);
  if(token) opts.headers['Authorization']='Bearer '+token;
  const req = http.request(opts, res=>{
    let b=''; res.on('data',c=>b+=c); res.on('end',()=>{
      let parsed;
      try{ parsed=JSON.parse(b);}catch(e){parsed=b}
      resolve({status:res.statusCode,body:parsed});
    });
  });
  req.on('error',reject);
  if(body) req.write(body);
  req.end();
});

(async ()=>{
  console.log('Connecting to DB...');
  await mongoose.connect(process.env.MONGO_URI,{});

  const testEmail = 'qa.test.user@example.com';
  const testName = 'QA Test';
  const testPassword = 'Password123!';

  console.log('1) Registering user');
  let r = await doRequest('/api/auth/register','POST',{name:testName,email:testEmail,password:testPassword});
  console.log('Register:', r.status, r.body);

  console.log('2) Fetching user from DB to read OTP');
  const user = await User.findOne({email:testEmail});
  if(!user){ console.error('User not found in DB'); process.exit(1); }
  console.log('User found. verified:',user.verified,'otp:',user.otp);

  console.log('3) Verifying OTP via API');
  r = await doRequest('/api/auth/verify-otp','POST',{email:testEmail,otp:user.otp});
  console.log('Verify OTP:', r.status, r.body);

  console.log('4) Logging in');
  r = await doRequest('/api/auth/login','POST',{email:testEmail,password:testPassword});
  console.log('Login:', r.status, r.body);
  const token = r.body && r.body.token;

  console.log('5) Fetching products');
  r = await doRequest('/api/products','GET',null,token);
  console.log('Products:', r.status, Array.isArray(r.body)?`count=${r.body.length}`:r.body);

  console.log('QA smoke test finished');
  process.exit(0);
})();
