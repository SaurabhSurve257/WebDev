const isNonEmptyString = (value) => typeof value === "string" && value.trim() !== "";

const validateLoginBody = (req, res, next) => {
	const { email, password, role } = req.body;

	if (!isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(role)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "email, password, and role are required"
		});
	}

	next();
};

const validateRegisterBody = (req, res, next) => {
	const {
		name,
		email,
		age,
		contactNumber,
		password,
		role,
		address,
		specialization,
		experience
	} = req.body;

	if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(role)) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "name, email, password, and role are required"
		});
	}

	if (role !== "patient" && role !== "doctor" && role !== "admin") {
		return res.status(400).json({
			message: "Invalid request body",
			error: "role must be either patient, doctor, or admin"
		});
	}

	if (role === "admin") {
		return next();
	}

	if (
		typeof age !== "number" ||
		age <= 0 ||
		!isNonEmptyString(contactNumber) ||
		!isNonEmptyString(address)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			error: "age, contactNumber, and address are required for patient and doctor registration"
		});
	}

	if (role === "doctor") {
		if (!isNonEmptyString(specialization) || typeof experience !== "number" || experience < 0) {
			return res.status(400).json({
				message: "Invalid request body",
				error: "specialization and experience are required for doctor registration"
			});
		}
	}

	next();
};

export { validateLoginBody, validateRegisterBody };
