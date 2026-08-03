import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


 export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async function (_, {rejectWithValue}) {
        try {

            const response = await fetch('/api/users')

            if(!response.ok) {
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
            }

            const data = await response.json()

            return data.data
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const createUser = createAsyncThunk(
    'users/createUser',
    async function ({username,email,password}, {_,rejectWithValue}) {
        try {
            
            const response = await fetch ('/api/register', {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username:username,
                    email: email,
                    password:password
                })
            })

            if(!response.ok) {
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
                throw new Error (message)
            }

            const data = await response.json()

            return data.data
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[],
        status:null,
        error:null,
        isAuth: false
    },
    extraReducers:(builder) => {
        builder
        .addCase(getAllUsers.pending, (state,action) => {
            state.status = 'Загрузка'
            state.error = null
        })
        .addCase(getAllUsers.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.users = action.payload
        })
        .addCase(getAllUsers.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(createUser.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.users = action.payload
        })
        .addCase(createUser.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
    }
})

export default userSlice.reducer