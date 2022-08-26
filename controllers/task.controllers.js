import jwt from 'jsonwebtoken';
import Task  from '../models/Task.js';
import secretKey from '../config/secretKey.js';

export const getTasks = async (req, res) => {

    try {
        if (jwt.verify(req.token, secretKey)) {
            const user = jwt.decode(req.token)
            const result = await Task.find({author: user.id})
            return res.json({ 'msg': 'Ok', 'task': result })
        } else {
            return res.json({ 'msg': 'unauthorized user' })
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json({ 'msg': 'unauthorized user' })
    }

}

export const createTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token)
            const task = req.body.task;
            const userId = user.id

    
            const newTask = new Task({task,author: userId})
            await newTask.save()
            return res.status(200).json({ 'msg': 'task crated' })

        } catch (error) {
            console.log(error)
            return res.status(403).json({ 'msg': 'unauthorized user' })
        }
    } else {
        return res.status(403).json({ 'msg': 'unauthorized user' })
    }
}

export const deleteTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token)
            const id = req.params.id;
            const userId = user.id


            const a =  await Task.deleteOne({_id:id, author: userId})

            
            return res.status(200).json({ 'msg': 'Task deleted', 'a':a })
            

        } catch (error) {
            console.log(error)
            return res.status(403).json({ 'msg': 'unauthorized user' })
        }
    } else {
        return res.status(403).json({ 'msg': 'unauthorized user' })
    }
}
export const updateTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token);
            const id = req.params.id;
            const taskName = req.body.taskname;
            const userId = user.id;
            console.log(id)
            console.log(userId)


            await Task.update({
                taskName
            }, {
                where: {
                    id,
                    userId
                }
            })

            const updateTask = await Task.findOne({
                where: {
                    id,
                    userId
                }
            })

            return res.status(200).json({ 'msg': 'Ok', 'task': updateTask })

        } catch (error) {
            console.log(error)
            return res.status(403).json({ 'msg': 'usuario no autorizado' })
        }
    } else {
        return res.status(403).json({ 'msg': 'usuario no autorizado' })
    }
}   