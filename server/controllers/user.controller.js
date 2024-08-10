import UserModel from '../models/user.model.js';

// Get User Controller
export const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await UserModel.findById(userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    try {
        // Find the user by ID and update with new data
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
            new: true, // return the updated document
            runValidators: true // validate the data against the model schema
        }).select('-password'); // Exclude the password field

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};