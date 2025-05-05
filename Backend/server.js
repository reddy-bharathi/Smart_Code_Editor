/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Major-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

  const uploadRoutes = require("./routes/Upload");
  app.use("/api", uploadRoutes);
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

/*const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");  // Store files in uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// API to handle file upload and execution
app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "uploads", req.file.filename);
    const extension = path.extname(req.file.filename);

    let command;

    switch (extension) {
        case ".py":
            command = `python "${filePath}"`;
            break;
        case ".java":
            command = `javac "${filePath}" && java -cp uploads ${req.file.filename.replace(".java", "")}`;
            break;
        case ".js":
            command = `node "${filePath}"`;
            break;
        case ".c":
            command = `gcc "${filePath}" -o uploads/output && uploads/output`;
            break;
        case ".cpp":
            command = `g++ "${filePath}" -o uploads/output && uploads/output`;
            break;
        default:
            return res.status(400).json({ error: "Unsupported file type" });
    }

    // Execute the command and return output or errors
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/code-compiler', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });
  
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  });
  
  

// Code Snippet Schema & Model
const CodeSchema = new mongoose.Schema({
  language: String,
  code: String,
  filename: String,
  createdAt: { type: Date, default: Date.now },
});

const CodeSnippet = mongoose.model("CodeSnippet", CodeSchema);

// Route to save code snippet
app.post('/api/code', async (req, res) => {
  try {
    const { language, code, filename } = req.body;
    const snippet = new CodeSnippet({ language, code, filename });
    await snippet.save();
    res.status(201).json({ message: "Code saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving code", error: err.message });
  }
});
// Route to login a user
app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


