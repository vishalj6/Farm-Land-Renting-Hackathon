import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

// User Signup Controller
export const signUpUser = async (req, res) => {
    const { firstName, lastName, email, phoneNo, profileImage, password } = req.body;

    try {
        // Check if the user already exists
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        let newUser = new UserModel({
            firstName,
            lastName,
            email,
            phoneNo,
            profileImage,
            password: hashedPassword,
        });

        await newUser.save();

        // Create JWT payload
        const payload = {
            user: {
                id: newUser._id,
            },
        };

        // Exclude password from user data
        const { password: _, ...userData } = newUser._doc;

        // Sign the JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '8h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, user: userData });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// User Login Controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user._id,
            },
        };

        // Exclude password from user data
        const { password: _, ...userData } = user._doc;

        // Sign the JWT token
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
