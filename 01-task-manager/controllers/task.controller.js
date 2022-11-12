const taskServices = require("../services/task.service");
const {createCustomError} = require("../errors/custom-error")
const asyncWrapper = require("../middleware/async")


module.exports = class taskController {

    static apiCreateTask = asyncWrapper( async (req, res, next) =>{
            const task = await taskServices.createTask(req.body);
            res.status(201).json({task});
    })

    static apiGetAllTasks = asyncWrapper( async (req, res, next) =>{
            const tasks = await taskServices.getAllTasks()
            res.status(200).json({tasks})
    })

    static apiGetTask = asyncWrapper( async (req, res, next) =>{
            const task = await taskServices.getTask(req.params.id)
            if(!task){
                return next(createCustomError(`No task with id ${req.params.id}`, 404))
            }
            res.status(200).json({task})
    })

    static apiDeleteTask = asyncWrapper( async (req, res, next) =>{
            const task = await taskServices.deleteTask(req.params.id)

            if(!task){
                return next(createCustomError(`No task with id ${req.params.id}`, 404))
            }

            // res.status(200).json({task})
            res.status(200).json({task: null, status: 'Success'})
            // res.status(200).send()
    })

    static apiUpdateTask = asyncWrapper( async (req, res, next) =>{
        const task = await taskServices.updateTask(req.params.id, req.body)
        if(!task){
            return next(createCustomError(`No task with id ${req.params.id}`, 404))
        }
        res.status(200).json({task})
    })
};  
