const Task = require('../models/task.model')

module.exports = class taskService{
    static async createTask(data){
        try {
            const newTask = {
                name: data.name,
                completed: data.completed
            }
    
            const response = await new Task(newTask).save()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllTasks(){
        try {
            const response = await Task.find()

            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async getTask(taskID){
        try {
            const response = await Task.findOne({_id: taskID})

            return response

        } catch (error) {
            console.log(error)
        }
    }

    static async updateTask(taskID, data){
        try {
            const updateTask = {
                name: data.name,
                completed: data.completed
            }
            const response = await Task.findOneAndUpdate({_id: taskID}, updateTask, {new:true,runValidators:true})

            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteTask(taskID){
        try {
            const response = await Task.findOneAndDelete({_id: taskID})

            return response
        } catch (error) {
            console.log(error)
        }
    }
}