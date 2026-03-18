import { Router } from "express";
import {Routes, Router} from "express";
import { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } from "../controllers/appointmentController.js";

const appointmentRouter = Router(); 

appointmentRouter.post("/appointments", createAppointment);
appointmentRouter.get("/appointments", getAppointments);
appointmentRouter.get("/appointments/:id", getAppointmentById);
appointmentRouter.put("/appointments/:id", updateAppointment);
appointmentRouter.delete("/appointments/:id", deleteAppointment);




export default appointmentRouter;