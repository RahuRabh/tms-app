const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    shipperName: { type: String, required: true },
    carrierName: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    pickupDate: { type: Date },
    deliveryDate: { type: Date },
    rate: { type: Number, required: true },
    flagged: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Shipment", shipmentSchema);
