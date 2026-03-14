import jwt from 'jsonwebtoken';
const userAuthorization = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token){
        const actualToken = token.split(' ')[1];
        jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Invalid or expired token'});
            }
            if(decoded.role !== 'admin'){
                return res.status(403).json({message: 'You do not have access to this database'});
            }
            console.log('Authorization - Decoded user role:', decoded.role); // Log the decoded user role
            req.user = decoded;
            next();
        });
    }
    else{
        res.status(401).json({message: 'Authorization token is required'});
    }
}

export default userAuthorization;