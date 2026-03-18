const isNonEmptyString = (value) =>  typeof value === 'string' && value.trim() !== '';

const validatLoginBody = (req ,res, next) => {
    const { email, password } = req.body;   
    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return res.status(400).json({ error: "Email and password are required and must be non-empty strings." });
    }
    next();

};

const validateRegisterBody = (req, res, next) => {
    const { name, email, age, contactNumber, password, role, address, specialization, experience } = req.body;
    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(address)) {
        return res.status(400).json({ error: "Name, email, password, and address are required and must be non-empty strings." });
    }
    next();
};

export { validatLoginBody, validateRegisterBody };


