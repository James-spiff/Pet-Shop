//function/middleware used to verify the jwt
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; //Bearer token
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No authorization Header' });
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(401).json({ error: 'Null token' });
    jwt.verify(token, process.env.ACCESS_SECRET, (error, user) => {
        if (error) return res.status(403).json({ error: error.message }); //invalid token
        req.user = user.email;
        req.role = user.role;
        next();
    });
} 

export default authenticateToken;