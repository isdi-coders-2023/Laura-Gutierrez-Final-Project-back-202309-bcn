import express from "express";
import app from "./app.js";
import cors from "cors";

const corsPort = process.env.ALLOWED_ORIGIN;
const corsOption = { origin: corsPort };

app.use(cors(corsOption));
app.use(express.json());
