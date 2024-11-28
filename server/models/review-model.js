import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema({
    rate: { type: Number, required: true, default: 5 },
    text: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, required: true, default: Date.now() }
})

export default model('Review', ReviewSchema);
