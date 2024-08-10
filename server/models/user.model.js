import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  profileImage: {
    type: String,
    default: '', // You can also add a default image URL if needed
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
