import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
const app = express();
app.use(express.json())
// Express Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

connectDB();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server Working correctly.");
});
app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
