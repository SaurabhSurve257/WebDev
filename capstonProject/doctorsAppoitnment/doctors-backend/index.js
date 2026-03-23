import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import patientRouter from "./routes/patientRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config(); //loading environment variables from .env file

const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000; //defining the port number

app.use(cors()); //enabling CORS for all routes

app.use(express.json()); //middleware to parse JSON bodies


// Define a simple route to test the server
app.get("/", (req, res)=>{
    res.send("Welcome to the Doctor's Appointment API");
});

app.use("/api/auth", authRouter); //mounting the auth router
app.use("/api/doctors", doctorRouter); //mounting the doctor router
app.use("/api/patients", patientRouter); //mounting the patient router
app.use("/api/appointments", appointmentRouter); //mounting the appointment router

//invalid route handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server only after database connection succeeds
const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup aborted because database connection failed.");
        process.exit(1);
    }
};

startServer();



