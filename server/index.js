const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose.connect(
  "mongodb+srv://Lemn:UJPefhUYXwzDoI7v@cluster.nqtzkr1.mongodb.net/discord?retryWrites=true&w=majority"
);

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    username: String,
    password: String,
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credatials" });
    }

    const userData = {
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", (msg) => {
    io.emit("sendMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3001);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
