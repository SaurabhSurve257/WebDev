import {Router} from "express";

const doctorRouter = Router();

// GET /doctors - Get all doctors (admin only)
doctorRouter.get("/", (req, res) => {
  // TODO: Add verifyAdmin middleware
  // Controller: getAllDoctors
  res.status(200).json({ message: "Get all doctors" });
});

// GET /doctors/:id - Get a specific doctor by ID
doctorRouter.get("/:id", (req, res) => {
  // TODO: Add verifyToken middleware (if required)
  // Controller: getDoctorById
  const { id } = req.params;
  res.status(200).json({ message: `Get doctor with id: ${id}` });
});

// POST /doctors - Create a new doctor
doctorRouter.post("/", (req, res) => {
  // TODO: Add verifyToken middleware (if required)
  // Controller: createDoctor
  res.status(201).json({ message: "Doctor created successfully" });
});

// PUT /doctors/:id - Update a doctor's information
doctorRouter.put("/:id", (req, res) => {
  // TODO: Add verifyToken middleware
  // Controller: updateDoctor
  const { id } = req.params;
  res.status(200).json({ message: `Doctor with id: ${id} updated successfully` });
});

// DELETE /doctors/:id - Delete a doctor (admin only)
doctorRouter.delete("/:id", (req, res) => {
  // TODO: Add verifyAdmin middleware
  // Controller: deleteDoctor
  const { id } = req.params;
  res.status(200).json({ message: `Doctor with id: ${id} deleted successfully` });
});

export default doctorRouter;