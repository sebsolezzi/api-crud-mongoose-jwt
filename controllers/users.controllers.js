import User from '../models/User.js';
import secretKey from '../config/secretKey.js'
import jtw from 'jsonwebtoken';
import bcrypt from 'bcrypt'


export const createUser = async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if (username.length < 6 || password.length < 6 || email.length < 6) {
            return res.status(404).json({ 'msg': 'username or password to short' });
        }

        if (await User.findOne({ username }) || await User.findOne({ email })) {
            return res.status(404).json({ 'msg': 'the user or email is already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newuser = new User({ username, email, password: hashedPassword });
        await newuser.save();

        //const respuesta = await user.save()
        //return res.status(200).json({ 'msg': 'user created', 'user': respuesta });
        return res.status(200).json({ 'msg': 'user created' });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ 'msg': 'fail to create user' });
    }

}

export const loginUser = async (req, res) => {

    try {

        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ 'msg': 'Usuario no registrado' });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jtw.sign({ id: user._id }, secretKey, { expiresIn: "30d" })
            return res.status(200).json({ 'token': token });
        } else {
            return res.status(404).json({ 'msg': 'User or password bad' });
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({ 'msg': 'Error al generar token' });
    }
}