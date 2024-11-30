import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Token não fornecido!' });

    const parts = token.split(" ");
    console.log(parts[1]);

    jwt.verify(parts[1], process.env.TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido!' });

        req.user = user;
        next();
    });
};
