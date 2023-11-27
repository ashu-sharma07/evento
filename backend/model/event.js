import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    organizer: {
      type: String,
      required: [true, "Please enter admit card orgainzer name"],
      minlength: [2, "orgaination name must be at least 2 characters"],
      maxlength: [30, "orgaination name cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9 ]+$/,
        "Please enter a valid event orgainzer name without special characters",
      ],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
      trim: true,
    },

    participants: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Please enter name"],
            trim: true,
          },
          email: {
            type: String,
            required: [true, "Please enter email"],
            trim: true,
          },
          phone: {
            type: Number,
            required: [true, "Please enter phone"],
            trim: true,
          },
        },
      ],
    },
    date: {
      type: Date,
      required: [true, "Please enter event date"],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
