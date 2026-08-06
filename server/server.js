const express = require('express')
const cors = require('cors')
const db = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/auth')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
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



// Маршрут 2: Получить одного пользователя
app.get('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Проверка, что ID передан
        if (!id) {
            return res.status(400).json({ message: 'ID пользователя не указан' });
        }

       
        const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
        
        // Проверяем, найден ли пользователь
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Возвращаем первого (и единственного) пользователя
        res.json({ data: rows[0] });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ошибка сервера: ${error.message}` });
    }
});

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

// Маршрут 4: Авторизация пользователя

app.post('/api/login', async (req,res) => {
    const {username,password} = req.body

    if(!username || !password) {
        return res.status(401).json({message : 'Логин и пароль должны быть заполнены'})
    }

    const [rows] = await db.query('SELECT id,username,password FROM users WHERE username = ?',username)
    
    if(rows.length === 0) {
        return res.status(401).json({message : 'Пользователь с таким логином не найден'})
    }

    const user = rows[0]

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if(!isPasswordValid){
        res.status(401).json({message:'Пароль не верный'})
    }

    const JWT_SECRET = process.env.JWT_SECRET

    const token = jwt.sign({
        id:user.id,
        username: user.username
    }, 
    JWT_SECRET, 
    {expiresIn:'7d'})


    res.cookie('token', token, {
        httpOnly:true,
        sameSite:'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дне
    })

    
    res.json({user:{
        id:user.id,
        username:user.username,
        email:user.email
    }, 
    message:"Успешная авторизация"})

})

// Маршрут 5: Выход
app.post('/api/logout',(req,res) => {
    res.clearCookie('token', {
        httpOnly:true,
        sameSite:'lax',
        path:'/'
    })

    res.json({message: 'Выход выполнен успешно'})
})

// Маршрут 6: Ауетефикация и защищенный маршрут
app.get('/api/profile', auth, async (req,res) => {

    try {
        
       const [rows] = await db.query(
            'SELECT id, username, email FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ 
                message: 'Пользователь не найден' 
            });
        }

        // Отправляем данные профиля
        res.json({
            message: 'Доступ разрешен',
            user: rows[0]
        });
        
    } catch (error) {
          res.status(500).json({ 
            message: 'Ошибка сервера' 
        });
    }
})


app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
    
})
