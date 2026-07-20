const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


const generateToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET , { expiresIn : "7d" });
}


// Register User
const registerUser = async (req , res) => {
    const { name , email , password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message : "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({ name , email , password: hashedPassword, otp, otpExpires });
        if(user){
            const message = `
            Welcome to ShopIt , ${name}! Thank you for registering with us. We are excited to have you on board. To complete your registration, please use the following One-Time Password (OTP):
            Your OTP for ShopIt registration is: ${otp}

            This OTP will expire in 10 minutes.`;

            //await sendEmail(email , "Welcome to ShopIt -Your otp for Registration" , message);
            try {
                await sendEmail(email, "Welcome to ShopIt -Your otp for Registration", message);
                console.log("Email sent successfully");
            } catch (err) {
                console.log(err);
            }


            res.status(201).json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id)
            });
        }
        else{
            res.status(400).json({ message : "Invalid user data!" });
        }
        
    } catch (error) {
        console.error("Register user error:", error.message);
        res.status(500).json({ message : "Server error!" });

    }
};


// Verify Registration OTP
const verifyOtp = async (req , res) => {
    const { email , otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({ message : "Email and OTP are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message : "User not found!" });
        }

        if (user.verified) {
            return res.status(400).json({ message : "User is already verified!" });
        }

        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ message : "Invalid OTP!" });
        }

        if (!user.otpExpires || user.otpExpires < new Date()) {
            return res.status(400).json({ message : "OTP has expired. Please register again or request a new OTP." });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verified,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("Verify OTP error:", error.message);
        res.status(500).json({ message : "Server error!" });
    }
};


// Login User
const loginUser = async (req , res) => {
    const { email , password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password , user.password))) {
            if (!user.verified) {
                return res.status(403).json({ message : "Please verify your email before logging in!" });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).json({ message : "Invalid email or password!" });
        }
    } catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};



const getUsers = async (req , res) => {
    try {
        const isPrimaryAdmin = req.user.email === "admin@shopit.com";
        const filter = isPrimaryAdmin ? {} : { _id: req.user._id };
        const users = await User.find(filter).select("-password");
        res.json(users);    
    } catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};


module.exports = { registerUser , loginUser , verifyOtp , getUsers };
