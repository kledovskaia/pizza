import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  types: {
    type: [Number],
    required: true,
  },
  sizes: {
    type: [Number],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});
export const Pizza = mongoose.model('Pizza', pizzaSchema);
