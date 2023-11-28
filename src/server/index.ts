import "dotenv/config";
import express from "express";
import app from "./app.js";
import cors from "cors";
import morgan from "morgan";

app.use(morgan("dev"));
app.use(express.json());

const corsPort = process.env.ALLOWED_ORIGIN;
const corsOption = { origin: corsPort };

app.use(cors(corsOption));
