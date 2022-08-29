import express from 'express';
import 'dotenv/config'
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import './config/db.js'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

app.use('/users',userRoutes)
app.use('/tasks',taskRoutes)

app.get('/hola',(req,res)=>{
    return res.json({'hola':'gracias por pasar'})
})

app.get('*',(req,res)=>{
    return res.status(404).json({'msg':'path not found'})
})

app.listen(3333,()=>{
    console.log('Server corriendo en el puerto 3333');
})