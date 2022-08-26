import {Router} from 'express'
import {createTask,getTasks,deleteTask} from '../controllers/task.controllers.js'
import checkToken from '../middlewares/auth.js'

const taskRoutes = Router();

taskRoutes.post('/createtask',checkToken,createTask)
taskRoutes.get('/gettasks',checkToken,getTasks)
taskRoutes.delete('/deletetask/:id',checkToken,deleteTask)

export default taskRoutes;