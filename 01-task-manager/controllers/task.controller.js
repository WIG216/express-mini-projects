const taskServices = require("../services/task.service");
const asyncWrapper = require("../middleware/async")


module.exports = class taskController {

    static async apiCreateTask(req, res, next) {
        try {
            const task = await taskServices.createTask(req.body);
            res.status(201).json({task});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    }

    static async apiGetAllTasks(req, res, next){
        try {
            const tasks = await taskServices.getAllTasks()

            res.status(200).json({tasks})
        } catch (error) {
            res.status(500).json({msg: error})
        }
    }

    static async apiGetTask(req, res, next) {
        try {
            const task = await taskServices.getTask(req.params.id)
            if(!task){
                return res.status(404).json({msg: `No task with id ${req.params.id} exist`})
            }
            res.status(200).json({task})
        } catch (error) {
            res.status(500).json({msg: error})
        }
    }

    static async apiDeleteTask(req, res, next) {
        try {
            const task = await taskServices.deleteTask(req.params.id)

            if(!task){
                return res.status(404).json({msg: `No task with id ${req.params.id} found` })
            }

            // res.status(200).json({task})
            res.status(200).json({task: null, status: 'Success'})
            // res.status(200).send()
        } catch (error) {
            res.status(500).json({msg: error})
        }
    }

    static async apiUpdateTask(req, res, next) {
        try {
            const task = await taskServices.updateTask(req.params.id, req.body)
            res.status(200).json({task})
        } catch (error) {
            res.status(500).json({msg: `Task with id ${req.params.id} not found`})
        }
    }

    static async apiEditTask(req, res, next) {
        try {
            const task = await taskServices.updateTask(req.params.id, req.body)
            res.status(200).json({task})
        } catch (error) {
            res.status(500).json({msg: `Task with id ${req.params.id} not found`})
        }
    }
};  

// const getAllTasks = async (req,res) =>{ 
//     const response = await Task.find()

//     return response
// }

// const createTask = async (req,res) => {
//     const newTask = {
//         name: req.body.name,
//         completed: req.body.completed
//     }

//     res.status(201).json({newTask})
//     // const addTask = await Task.create(newTask)
// }

// const getTask = async (req,res) => {
//     const response = await Task.findById({name: req.body})
//     res.json({id:req.params.id})
// }

// const updateTask = (req,res) => {
//     res.send("update task")
// }

// const deleteTask = (req,res) => {
//     res.send("delete task")
// }

// module.exports ={
//     getAllTasks,
//     createTask,
//     getTask,
//     updateTask,
//     deleteTask
// }
