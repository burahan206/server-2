// Step 1
import express from "express";
import cors from "cors";
import "dotenv/config";

// Step 2
import connectDB from "./Config/mongodb.js";
import connectCloudinary from "./Config/cloudinary.js";
import userRouter from "./Routes/userRoute.js";
import productRouter from "./Routes/productRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

const allowedOrigins = [
  "front-end-admin-kappa.vercel.app",
  "http://localhost:5174", // For local development
  "http://localhost:5176", // For local development
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorization headers
  })
);
// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on PORT : ${port} 🌐`);
});





















