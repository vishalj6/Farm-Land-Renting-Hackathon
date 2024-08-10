import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';


// User Signup Controller
export const signUpUser = async (req, res) => {
    const { firstName, lastName, email, mobile, password, profileImage } = req.body;

    try {
        // Check if the user already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        user = new UserModel({
            firstName,
            lastName,
            email,
            mobile,
            profileImage,
            password,
        });

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        
        await user.save();

        
        const payload = {
            user: {
                id: user._id,
            },
        };
        const {password, ...userData} = user._doc;
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' }, 
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token ,user:userData});
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Payload for JWT
        const payload = {
            user: {
                id: user._id,
            },
        };

        // Exclude password from user data in response
        const { password: _, ...userData } = user._doc;

        // Generate and return JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' }, 
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, user: userData });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};