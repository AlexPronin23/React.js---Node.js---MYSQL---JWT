const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req,res,next) => {
    try {
        const token = req.cookies.token
        
        if(!token) {
            return res.status(401).json({ 
            message: 'Не авторизован. Токен не найден' 
        });
        }

        // Проверяем токен

        const decode = jwt.verify(token,JWT_SECRET)

        // Добавляем пользователя в тело запроса
        req.user = decode

        next()
    } catch (error) {
        return res.status(500).json({ 
            message: error.message
        });
    }
}

module.exports = auth