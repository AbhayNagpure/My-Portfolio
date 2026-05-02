import mongoose from "mongoose";

const creativeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Photography", "Design", "Other"],
      default: "Photography",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Creative = mongoose.model("Creative", creativeSchema);
export default Creative;
