import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be filled"],
      minlength: [5, "Title minimal is 5 characters"],
      maxlength: [40, "Title maximal is 40 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description must be filled"],
      minlength: [5, "description minimal is 5 characters"],
    },
  },
  { timestamps: true },
);

export const Note = mongoose.model("Note", NoteSchema);
