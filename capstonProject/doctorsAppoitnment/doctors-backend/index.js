import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import patientRouter from "./routes/patientRouter.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config(); //loading environment variables from .env file

const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000; //defining the port number

dbConnect(); //connecting to the database

app.use(cors()); //enabling CORS for all routes

app.use(express.json()); //middleware to parse JSON bodies


// Define a simple route to test the server
app.get("/", (req, res)=>{
    res.send("Welcome to the Doctor's Appointment API");
});

app.use("/api/auth", authRouter); //mounting the auth router
app.use("/api/doctors", doctorRouter); //mounting the doctor router
app.use("/api/patients", patientRouter); //mounting the patient router

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



