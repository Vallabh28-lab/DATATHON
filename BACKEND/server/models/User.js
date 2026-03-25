import mongoose from 'mongoose';
import bcrypt    from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:     { type: String },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
});

userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', userSchema);
