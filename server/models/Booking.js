const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "places",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  noOfGuests: { type: Number, required: true },
  name: { type: String, required: true },
  phno: { type: String, required: true },
  price: { type: Number, required: true },
});

const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = BookingModel;
