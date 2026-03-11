import jwt from 'jsonwebtoken';
const getUserIdFromToken = (req) => {
    try {
        console.log('Extracting user ID from token');
        const token = req.header('Authorization');
        const actualToken = token.split(' ')[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        console.log('Decoded token in getUserIdFromToken:', decoded); // Log the decoded token
        return decoded.id;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export default getUserIdFromToken;