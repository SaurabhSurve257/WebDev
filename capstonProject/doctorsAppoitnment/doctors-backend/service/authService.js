//create login and register service functions here
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patientModel";
import Doctor from "../model/doctorModel";


const registerPatientService = async (patientData) => {
    try {
        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: patientData.email });
        if (existingPatient) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(patientData.password, 10);
        patientData.password = hashedPassword;

        // Create and save the patient
        const newPatient = new Patient(patientData);
        await newPatient.save();

        return { message: "Patient registered successfully" };
    } catch (error) {
        throw error;
    }
};

const registerDoctorService = async (doctorData) => {
    try {
        // Check if email already exists
        const existingDoctor = await Doctor.findOne({ email: doctorData.email });
        if (existingDoctor) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(doctorData.password, 10);
        doctorData.password = hashedPassword;

        // Create and save the doctor
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        return { message: "Doctor registered successfully" };
    } catch (error) {
        throw error;
    }
};

const loginService = async (email, password) => {
    try {
        // Check if user exists in patients
        let user = await Patient.findOne({ email });
        let role = "patient";

        // If not found in patients, check in doctors
        if (!user) {
            user = await Doctor.findOne({ email });
            role = "doctor";
        }

        if (!user) {
            throw new Error("User not found");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return { message: "User logged in successfully", token };
    } catch (error) {
        throw error;
    }
};

export { registerPatientService, registerDoctorService, loginService };