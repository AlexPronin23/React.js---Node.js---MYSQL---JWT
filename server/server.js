const express = require('express')
const cors = require('cors')
const db = require('./db')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))

// Маршрут 1: Получить всех пользователей
app.get('/api/users',  async (req,res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users')
        res.json({data: rows}) // Отправка на клиент
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:`Ошибка ${res.statusMessage}`})
    }

})




app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
    
})
