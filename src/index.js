import express from "express";
import dotenv from "dotenv";
import router from "../src/routes";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();
const { PORT, DB_URL } = process.env;

app.use(cors());
app.use(express.json());
mongoose.connect(`${DB_URL}`).then(() => {
  console.log("first connection");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} !`);
});

// Khi chay json-server khong duoc,thi them npx truoc cau lenh chay json-server -w db.json
