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
        return res.status(404).json({ 'msg': 'get error', 'error': error })
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
            return res.status(404).json({ 'msg': 'create error', 'error': error })
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

            
            return res.status(200).json({ 'msg': 'Task deleted'})
            

        } catch (error) {
            console.log(error)
            return res.status(404).json({ 'msg': 'delete error', 'error': error })
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
            const taskname = req.body.taskname;
            const userId = user.id;
            
            const task =  await Task.findOne({_id:id, author: userId})
           
            task.task = taskname
            await task.save()

            return res.status(200).json({ 'msg': 'Ok', 'task': task })

        } catch (error) {
            console.log(error)
            return res.status(404).json({ 'msg': 'update error', 'error': error })
        }
    } else {
        return res.status(403).json({ 'msg': 'unauthorized user' })
    }
}
export const changeStateTask = async (req, res) => {
    if (jwt.verify(req.token, secretKey)) {

        try {
            const user = jwt.decode(req.token);
            const id = req.params.id;
            const userId = user.id;
            
            const task =  await Task.findOne({_id:id, author: userId})
           
            task.completed = !task.completed
            await task.save()

            return res.status(200).json({ 'msg': 'Ok', 'task': task })

        } catch (error) {
            console.log(error)
            return res.status(404).json({ 'msg': 'update error', 'error': error })
        }
    } else {
        return res.status(403).json({ 'msg': 'unauthorized user' })
    }
}      