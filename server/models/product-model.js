import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, required: true }
})

export default model('Product', ProductSchema);
