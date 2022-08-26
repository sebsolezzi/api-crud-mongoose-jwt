import {Router} from 'express'
import {createUser,loginUser} from '../controllers/users.controllers.js'
const userRoutes = Router();

userRoutes.post('/createuser',createUser)
userRoutes.post('/login',loginUser)


export default userRoutes;