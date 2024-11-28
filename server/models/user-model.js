import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    regDate: { type: String, default: Date.now() },
    role: { type: String, default: 'user' },
    balance: { type: Number, default: 0 },
    password: { type: String, required: true }
})

export default model('User', UserSchema);
