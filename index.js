import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);


app.get("/health", (req, res)=>{
    return res.status(200).json({
        status : "success",
        message : "Server is healthy"
    });
})


app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});