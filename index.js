const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./config/db");
connectDB();

const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const express = require('express');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

// app.use(cors({
//   origin: "https://mern-auth-frontend.vercel.app"
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
        return callback(null, true);
    } 
    if (origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } 
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
    res.send("Welcome to the User Authentication API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;