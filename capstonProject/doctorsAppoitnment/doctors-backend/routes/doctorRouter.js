import {Router} from "express";
import {
  getAllDoctorsController,
  getDoctorByIdController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
  updateDoctorTimeSlotsController,
} from "../controller/doctorController.js";
import { authorizeRoles, verifyAdmin } from "../middleware/authoraization.js";
import { validateCreateDoctorBody, validateUpdateDoctorBody } from "../middleware/doctorMiddleware.js";

const doctorRouter = Router();
const verifyAuthenticatedUser = authorizeRoles("patient", "doctor", "admin");

// GET /doctors - Get all doctors for authenticated users
doctorRouter.get("/", authorizeRoles("patient", "doctor", "admin"), getAllDoctorsController);

// POST /doctors - Create a new doctor (admin only)
doctorRouter.post("/", verifyAdmin, validateCreateDoctorBody, createDoctorController);

// PUT /doctors/:id/timeSlots - Update doctor's available time slots (more specific route first)
doctorRouter.put("/:id/timeSlots", verifyAuthenticatedUser, updateDoctorTimeSlotsController);

// GET /doctors/:id - Get a specific doctor by ID
doctorRouter.get("/:id", verifyAuthenticatedUser, getDoctorByIdController);

// PUT /doctors/:id - Update a doctor's information
doctorRouter.put("/:id", verifyAuthenticatedUser, validateUpdateDoctorBody, updateDoctorController);

// DELETE /doctors/:id - Delete a doctor (admin only)
doctorRouter.delete("/:id", verifyAdmin, deleteDoctorController);

export default doctorRouter;
