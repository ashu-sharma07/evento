// Import Required Modules
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import sendCertificate from "./src/certificate.js";
import sendEmail from "./src/mailer.js";
import connectDB from "./config/database.js";
import Event from "./model/event.js";

dotenv.config();

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Passing Middlewares
app.use(cors());
app.use(express.json());
app.use(upload.single("file"));

// Api routes

// Api routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Evento API" });
});

// get all events
app.get("/events", async (req, res) => {
  try {
    const { organizer } = req.query;
    let query = {};

    if (organizer) {
      // If organizer parameter is provided, filter by organizer
      query = { organizer: organizer };
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get single event
app.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create new Event
app.post("/event", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// update event
app.put("/event/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// delete event
app.delete("/event/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add new participant to an event
app.put("/participant/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const newParticipant = req.body;
    event.participants.push(newParticipant);

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// contact us
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log(req.body);
    await sendEmail({
      email: process.env.EMAIL_ADMIN,
      subject: "Contact Form",
      message: `
          <h1>Contact Form</h1>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
        `,
    });
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

app.post("/upload/csv", async (req, res) => {
  if (!req.file) {
    res.status(403).json({
      success: false,
      message: "Please select a file",
    });
    return;
  }

  if (req.file.mimetype !== "text/csv") {
    res.status(403).json({
      success: false,
      message: "Only csv files are allowed",
    });
    return;
  }

  fs.writeFileSync("players.csv", req.file.buffer);

  await sendCertificate(req.body.url);

  fs.unlink("players.csv", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("players.csv is deleted.");
    }
  });

  res.status(200).json({
    success: true,
    message: "csv uploaded Successfully and mail sent",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}.`);
});
