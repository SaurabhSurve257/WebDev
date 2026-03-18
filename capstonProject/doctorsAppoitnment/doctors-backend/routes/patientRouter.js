import {Router} from "express";

const patientRouter = Router();

// GET /patients - Get all patients (admin only)
patientRouter.get("/", (req, res) => {
  // TODO: Add verifyAdmin middleware
  // Controller: getAllPatients
  res.status(200).json({ message: "Get all patients" });
});

// GET /patients/:id - Get a specific patient by ID
patientRouter.get("/:id", (req, res) => {
  // TODO: Add verifyToken middleware (if required)
  // Controller: getPatientById
  const { id } = req.params;
  res.status(200).json({ message: `Get patient with id: ${id}` });
});

// POST /patients - Create a new patient
patientRouter.post("/", (req, res) => {
  // TODO: Add verifyToken middleware (if required)
  // Controller: createPatient
  res.status(201).json({ message: "Patient created successfully" });
});

// PUT /patients/:id - Update a patient's information
patientRouter.put("/:id", (req, res) => {
  // TODO: Add verifyToken middleware
  // Controller: updatePatient
  const { id } = req.params;
  res.status(200).json({ message: `Patient with id: ${id} updated successfully` });
});

// DELETE /patients/:id - Delete a patient (admin only)
patientRouter.delete("/:id", (req, res) => {
  // TODO: Add verifyAdmin middleware
  // Controller: deletePatient
  const { id } = req.params;
  res.status(200).json({ message: `Patient with id: ${id} deleted successfully` });
});

export default patientRouter;