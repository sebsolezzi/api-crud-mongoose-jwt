import {Router} from 'express'
import {createTask,getTasks,deleteTask,updateTask,changeStateTask} from '../controllers/task.controllers.js'
import checkToken from '../middlewares/auth.js'

const taskRoutes = Router();

taskRoutes.post('/createtask',checkToken,createTask)
taskRoutes.get('/gettasks',checkToken,getTasks)
taskRoutes.delete('/deletetask/:id',checkToken,deleteTask)
taskRoutes.put('/updatetask/:id',checkToken,updateTask)
taskRoutes.put('/changestatetask/:id',checkToken,changeStateTask)

export default taskRoutes;