export const checkToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).json({ 'mgs': 'Invalid Token' });
        }
    } catch (error) {
        res.status(403).json({ 'mgs': 'Invalid Token' });
        console.log(error)
    }
}

export default checkToken;