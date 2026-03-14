import jwt from 'jsonwebtoken';

const userAuthentication = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token){
        const actualToken = token.split(' ')[1];
        jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Invalid or expired token'});
            }
            req.user = decoded;
            console.log('Authentication - Decoded user information:', req.user); // Log the decoded user information
            next();
        });
    }
    else{
        res.status(401).json({message: 'Authorization token is required'});
    }
}

export default userAuthentication;