const express = require('express');
const router = express.Router();

const taskCtrl= require('../controllers/task.controller')

router.get('/', taskCtrl.apiGetAllTasks);
router.post('/', taskCtrl.apiCreateTask);
router.get('/:id', taskCtrl.apiGetTask);
router.patch('/:id', taskCtrl.apiUpdateTask);
router.delete('/:id', taskCtrl.apiDeleteTask);

// alternate way of using routes
// router.route('/').get(taskCtrl.getAllTasks).post(taskCtrl.createTask)
// router.route('/:id').get(taskCtrl.getTask).patch(taskCtrl.updateTask).delete(taskCtrl.deleteTask)
module.exports = router