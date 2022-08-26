/* import jwt from 'jsonwebtoken'
import { User } from '../models/models.js'
import { secretKey } from '../config/secretKey'
 */

export const checkToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        console.log(req.headers)

        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).json({ 'mgs': 'Token invalido' });
        }
    } catch (error) {
        res.status(403).json({ 'mgs': 'Token invalido' });
        console.log(error)
    }
}

export default checkToken;