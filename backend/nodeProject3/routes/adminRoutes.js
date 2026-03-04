import { Router } from  "express";
const adminRouter=Router();

adminRouter.get('/details',(req,res)=>{
    res.send('This is admin details page')
});

adminRouter.post('/details',(req,res)=>{
    res.send('This is admin details POST request received details updated')
});
export default adminRouter;