import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true, select: false },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  lastLoginAt: Date
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  }
});

export default mongoose.model('User', userSchema);
