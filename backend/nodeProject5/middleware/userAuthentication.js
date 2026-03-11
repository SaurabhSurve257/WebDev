import jwt from 'jsonwebtoken';

const userAuthentication = (req, res, next) => {
    const token = req.headers['authorization'];
    //token is bearer token, so we need to split it and get the actual token
    if(token){
        const actualToken = token.split(' ')[1];
        jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Invalid token'});
            }
            req.user = decoded;
            console.log('Authentication - Decoded user:', req.user); // Log the decoded user information
            next();
        });

    }
    else{
        res.status(401).json({message: 'Authorization token is required'});
    }
}

export default userAuthentication;