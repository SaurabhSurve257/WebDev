const loginRequired = (req, res, next) => {

    console.log('Login middleware executed');
    const {email, password} = req.body;
    if(email && password){
        next();
    }
    else{
        res.status(400).json({message: 'Email and password are required'})
    }
}

const registrationRequired = (req, res, next) => {

    const {name, email, password, role} = req.body;
    if(name && email && password && role){
        next();
    }
    else{
        res.status(400).json({message: 'Name, email, password and role are required'})
    }
}

export {loginRequired, registrationRequired};