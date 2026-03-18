import {loginService, registerDoctorService, registerPatientService} from "../services/authService.js";

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        res.json({ token });
    } catch (error) {       
        res.status(400).json({ error: error.message });
    }   
};

const registerDoctorController = async (req, res) => {
    try {
        const { name, email, password, specialization } = req.body;
        const doctor = await registerDoctorService(name, email, password, specialization);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const registerPatientController = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const patient = await registerPatientService(name, email, password, age);
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};  

export { loginController, registerDoctorController, registerPatientController };