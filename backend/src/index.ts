import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db";
import userRoutes from './routes/userRoutes';
import friendRoutes from './routes/friendRoutes';


dotenv.config();

const app: Express = express();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); 
});

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

const port = process.env.PORT || 5000;

pool
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
