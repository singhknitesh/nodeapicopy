import Errorhandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask =async(req,res,next)=>{
try{
    const{title,discription}= req.body;

await Task.create({
    title,
    discription,
    user: req.user,
});

res.status(201).json({
    success:true,
    message:"Task added Succesfully",
});

}catch(error)  {
 next(error);
}


};


export const getMyTask = async(req,res,next)=>{
    try{
        const userid=req.user._id;

        const tasks = await Task.find({ user: userid  });
    
        res.status(200).json({
        success:true,
        tasks,
        });
    }
    catch(error)  {
          next(error);
    }

    
};
export const updateTask = async(req,res,next)=>{

    try {
        const task = await Task.findById(req.params.id);

    if(!task) return next(new Errorhandler("Task Not found",404));
    
      
    task.isCompleted=!task.isCompleted;
    await task.save();

    res.status(200).json({
    success:true,
    message:"Task Updated!",
    });
    } catch (error) {
       next(error); 
    }
};
export const deleteTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

     

if(!task) return next(new Errorhandler);
 
    await task.deleteOne();
    
    res.status(200).json({
    success:true,
    message:"Task Deleted!",
    });
    } catch (error) {
       next(error); 
    }
};