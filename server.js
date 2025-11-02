import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

// ✅ Schema and Model
const userSchema = new mongoose.Schema({
  task: String,
});

const User = mongoose.model("User", userSchema);

// ✅ POST — Create User
app.post("/task", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save(); // <-- Save in MongoDB
    res.send("Data Saved Successfully ✅");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ GET — Read All Users
app.get("/task", async (req, res) => {
  try {
    const users = await User.find(); // <-- Get from MongoDB
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ DELETE — Delete User by ID
app.delete("/task/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id); // <-- Delete from DB
    res.send("Deleted Successfully 🗑️");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ PATCH — Update User by ID
app.patch("/task/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // <-- Update in DB
    res.send("Updated Successfully ✏️");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("MongoDB CRUD API Working 🚀");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
