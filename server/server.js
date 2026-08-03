const express = require('express')
const cors = require('cors')
const db = require('./db')
const bcrypt = require('bcrypt')
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

//Маршрут 2:  Получить одного пользователя

// Маршрут 3: Регистрация пользователя
app.post('/api/register', async (req,res) => {
    try {

        const {username,email,password} = req.body

        if(!username || !email || !password) {
            return res.status(400).json({message:'Неправильные данные'})
        }

        if(password.length < 8) {
            return res.status(400).json({message:'Длина пароля должна быть минимум 8 символов'})
        } 

        const salt = bcrypt.genSaltSync(5)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const values = [username,email,hashedPassword]

        const [rows] = await db.query('INSERT INTO users(username,email,password) VALUES(?,?,?)', values)

        const data = {
            id:rows.insertId,
            username:rows.username,
            email:rows.email
        }

        res.json({data:data})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:`Ошибка ${res.statusMessage}`})
        
        
    }
})

// Маршрут 4: Авторизация и ауентификация пользователя



app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
    
})
