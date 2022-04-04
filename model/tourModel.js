import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  duration: Number,
  maxGroupSize: Number,
  difficulty: String,
  ratingsAverage: Number,
  ratingsQuantity: Number,
  summary: String,
  description: String,
  imageCover: String,
  images: [String],
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Tour = model("Tour", tourSchema);

export default Tour;
