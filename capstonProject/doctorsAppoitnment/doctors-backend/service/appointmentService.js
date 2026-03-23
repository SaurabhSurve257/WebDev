//create appointment service functions here
import Appointment from "../model/appointmentModel.js";

const getAllAppointmentsService = async () => {
    try {
        const appointments = await Appointment.find()
            .populate("patientId", "-password")
            .populate("doctorId", "-password");
        return appointments;
    } catch (error) {
        throw error;
    }
};

const getAppointmentsByDoctorIdService = async (doctorId) => {
    try {
        return await Appointment.find({ doctorId })
            .populate("patientId", "-password")
            .populate("doctorId", "-password")
            .sort({ appointmentDate: 1, appointmentTime: 1 });
    } catch (error) {
        throw error;
    }
};

const getAppointmentByIdService = async (id) => {
    try {
        const appointment = await Appointment.findById(id)
            .populate("patientId", "-password")
            .populate("doctorId", "-password");
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        return appointment;
    } catch (error) {
        throw error;
    }
};

const createAppointmentService = async (appointmentData) => {
    try {
        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();
        const appointment = await Appointment.findById(newAppointment._id)
            .populate("patientId", "-password")
            .populate("doctorId", "-password");

        return { message: "Appointment created successfully", appointment };
    } catch (error) {
        throw error;
    }
};

const updateAppointmentService = async (id, appointmentData) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointmentData, { new: true })
            .populate("patientId", "-password")
            .populate("doctorId", "-password");
        if (!updatedAppointment) {
            throw new Error("Appointment not found");
        }
        return { message: "Appointment updated successfully", appointment: updatedAppointment };
    } catch (error) {
        throw error;
    }
};

const deleteAppointmentService = async (id) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            throw new Error("Appointment not found");
        }
        return { message: "Appointment deleted successfully" };
    } catch (error) {
        throw error;
    }
};

export {
    getAllAppointmentsService,
    getAppointmentsByDoctorIdService,
    getAppointmentByIdService,
    createAppointmentService,
    updateAppointmentService,
    deleteAppointmentService
};
