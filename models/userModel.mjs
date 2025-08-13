//userModel.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  cash: { type: Number, default: 5000 },
  portfolio: [{
    symbol: String,
    quantity: Number,
    purchasePrice: {type: Number, default: 0}
  }]
});

userSchema.methods.comparePassword = async function (password) {
    try {

        return password === this.password;    
    } catch (error) {
      throw new Error('Password comparison failed');
  }
  };
export default mongoose.model('User', userSchema);
