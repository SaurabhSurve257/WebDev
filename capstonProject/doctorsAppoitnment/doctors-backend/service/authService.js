//create login and register service functions here
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Admin from "../model/adminModel.js";

const getJwtSecret = () => process.env.JWT_SECRET || process.env.jwtSecretKey;
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const registerPatientService = async (patientData) => {
    try {
        const normalizedEmail = normalizeEmail(patientData.email);

        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: normalizedEmail });
        if (existingPatient) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(patientData.password, 10);
        patientData.password = hashedPassword;
        patientData.email = normalizedEmail;

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
        const normalizedEmail = normalizeEmail(doctorData.email);

        // Check if email already exists
        const existingDoctor = await Doctor.findOne({ email: normalizedEmail });
        if (existingDoctor) {
            throw new Error("Email already in use");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(doctorData.password, 10);
        doctorData.password = hashedPassword;
        doctorData.email = normalizedEmail;

        // Create and save the doctor
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        return { message: "Doctor registered successfully" };
    } catch (error) {
        throw error;
    }
};

const loginService = async (email, password, role) => {
    try {
        const normalizedEmail = normalizeEmail(email);
        const normalizedPassword = String(password || "");

        // Check if user exists in patients
        let user;
        if (role === "patient") {
            user = await Patient.findOne({ email: normalizedEmail });
        } else if (role === "doctor") {
            user = await Doctor.findOne({ email: normalizedEmail });
        } else if (role === "admin") {
            user = await Admin.findOne({ email: normalizedEmail });
        } else {
            throw new Error("Invalid role specified");
        }

        if (!user) {
            throw new Error("User not found");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(normalizedPassword, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const jwtSecret = getJwtSecret();

        if (!jwtSecret) {
            throw new Error("JWT secret is not configured");
        }

        const token = jwt.sign({ id: user._id, role }, jwtSecret, { expiresIn: "1h" });

        return {
            message: "User logged in successfully",
            token,
            role,
            userId: user._id.toString(),
            doctorId: role === "doctor" ? user._id.toString() : undefined,
            patientId: role === "patient" ? user._id.toString() : undefined,
            adminId: role === "admin" ? user._id.toString() : undefined,
        };
    } catch (error) {
        throw error;
    }
};

const registerAdminService = async (adminData) => {
    try {
        const normalizedEmail = normalizeEmail(adminData.email);

        const existingAdmin = await Admin.findOne({ email: normalizedEmail });
        if (existingAdmin) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        adminData.password = hashedPassword;
        adminData.email = normalizedEmail;

        const newAdmin = new Admin(adminData);
        await newAdmin.save();

        return { message: "Admin registered successfully" };
    } catch (error) {
        throw error;
    }
};

export { registerPatientService, registerDoctorService, registerAdminService, loginService };
