import express from 'express';
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import './config/db.js'

const app = express();
app.use(express.json())

app.use('/users',userRoutes)
app.use('/tasks',taskRoutes)

app.get('*',(req,res)=>{
    return res.status(404).json({'msg':'path not found'})
})

app.listen(3333,()=>{
    console.log('Server corriendo en el puerto 3333');
})