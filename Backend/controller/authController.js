const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const genrateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn :'30d'})
}

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


// Register new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            verified: false
        });

        if (user) {
            const otp = generateOtp();
            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000;
            await user.save();

            const message = `
Welcome to FizCart, ${name}!

🎉 Thank you for registering with FizCart.

Your OTP for account verification is: ${otp}

Please do not share this OTP with anyone. It is valid for 10 minutes.

Happy Shopping!
Team FizCart
`;
        try {
            await sendEmail(normalizedEmail, 'Welcome to FizCart - Your OTP for Registration', message);
        } catch (err) {
            console.error('Failed to send OTP email:', err);
            return res.status(500).json({ message: 'Failed to send OTP email. Check email configuration.' });
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified,
            message: 'OTP sent to your email. Please verify your account.'
        });
            // Your email sending code goes here
        }else{
            res.status(400).json({message:'Invalid user data'});
        }
        

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    try{
        const user=await User.findOne({email:normalizedEmail});
        if(user && (await bcrypt.compare(password,user.password))){
            if (!user.verified) {
                return res.status(403).json({ message: 'Please verify your account with the OTP sent to your email.' });
            }
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:genrateToken(user._id)
            });
        } else{
            res.status(401).json({message:'Invalid email or password'});
        }
    }catch(error){
        res.status(500).json({message:'Server error'});
    }       
    };
// verify user otp
const verifyUserOtp = async (req, res) => {
    const { email, otp } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ message: 'OTP is not available. Please request a new one.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        user.verified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({
            message: 'Account verified successfully',
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: true,
            token: genrateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// resend verification otp
const resendVerificationOtp = async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const message = `
Hello ${user.name},

Your new OTP for account verification is: ${otp}

This OTP is valid for 10 minutes.

Team FizCart
`;

        try {
            await sendEmail(normalizedEmail, 'FizCart - OTP Verification', message);
        } catch (err) {
            console.error('Failed to resend OTP email:', err);
            return res.status(500).json({ message: 'Failed to send OTP email. Check email configuration.' });
        }

        return res.json({ message: 'A new OTP has been sent to your email.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
//getUsers
const getUsers=async(req,res)=>{
    try{
        const users=await User.find({}).select('-password');
        res.json(users);
    }catch(error){
        res.status(500).json({message:'Server error'});
    }
}
module.exports={registerUser,loginUser,getUsers,verifyUserOtp,resendVerificationOtp};
