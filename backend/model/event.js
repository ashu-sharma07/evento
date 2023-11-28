import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    organizer: {
      type: String,
      required: [true, "Please enter event  orgainzer name"],
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

    poster: {
      type: String,
      required: [true, "Please enter poster"],
      trim: true,
    },
    author: {
      name: {
        type: String,
        required: [true, "Please enter author name"],
      },
      avatar: {
        type: String,
        required: [true, "Please enter author photo"],
      },
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
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
