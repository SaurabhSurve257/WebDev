import { loginService, registerAdminService, registerDoctorService, registerPatientService } from "../service/authService.js";

const loginController = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const result = await loginService(email, password, role);
        res.status(200).json(result);
    }
    catch (error) {
        const statusCode =
            error.message === "User not found" ||
            error.message === "Invalid credentials" ||
            error.message === "Invalid role specified"
                ? 401
                : 500;

        res.status(statusCode).json({ message: "Login failed", error: error.message });
    }
}

const regsiterController = async (req, res) => {
    try {
        const data = req.body;
        const role = data.role; // Assuming the request body contains a 'role' field to determine if it's a patient or doctor registration
        if (role === "patient") {
            const result = await registerPatientService(data);
            res.status(201).json(result);
        } else if (role === "doctor") {
            const result = await registerDoctorService(data);
            res.status(201).json(result);
        } else if (role === "admin") {
            const result = await registerAdminService(data);
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: "Invalid role specified" });
        }
    }
    catch (error) {
        const statusCode =
            error.message === "Email already in use"
                ? 409
                : error.name === "ValidationError"
                    ? 400
                    : error.code === 11000
                        ? 409
                        : 500;

        res.status(statusCode).json({ message: "Registration failed", error: error.message });
    }
}




// const registerPatientController = async (req, res) => {
//     try {
//         const patientData = req.body;
//         const result = await registerPatientService(patientData);
//         res.status(201).json(result);
//     }
//     catch (error) {
//         res.status(500).json({ message: "Registration failed", error: error.message });
//     }
// }


// const registerDoctorController = async (req, res) => {
//     try {
//         const doctorData = req.body;
//         const result = await registerDoctorService(doctorData);
//         res.status(201).json(result);
//     }
//     catch (error) {
//         res.status(500).json({ message: "Registration failed", error: error.message });
//     }
// }


export { loginController, regsiterController };
