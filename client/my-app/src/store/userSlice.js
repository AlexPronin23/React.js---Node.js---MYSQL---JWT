import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";


 export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async function (_, {rejectWithValue}) {
        try {

            const response = await fetch('/api/users',{
                credentials:'include'
            })

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
                credentials:'include',
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

export const getOneUser = createAsyncThunk(
    'users/getOneUser',
    async function ({id}, {_,rejectWithValue}) {
        try {

            const response = await fetch(`/api/users/${id}`,{
                 credentials:'include'
            })

            if(!response.ok) {
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
                throw new Error(message)
            }

            const data = await response.json()

            return data.data
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async function ({username,password}, {_,rejectWithValue}) {

        try {
            const response = await fetch('/api/login', {
                method:'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    password:password
                })
            })

            if(!response.ok) {
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
                throw new Error(message)
            }

            const data = await response.json()

            return data.user

        } catch (error) {

            return rejectWithValue(error.message)
            
        }
        
    }
)

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include' // Отправляем cookies
            });

            if (!response.ok) {
                throw new Error('Ошибка выхода');
            }

            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getProfile = createAsyncThunk(
    'user/getProfile',
    async function (_,{rejectWithValue}) {
        try {
            const response = await fetch('/api/profile', {
                credentials:"include"
            })
            
             if(!response.ok) {      
                let message = `Произошла ошибка ${response.status} ${response.statusText}`
                throw new Error(message)
            }

            const data = await response.json()

            return data.user

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
        isAuth: false,
        currentUser: null
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
        .addCase(getOneUser.fulfilled,(state,action) => {
            state.status = 'Успешно'
            state.currentUser = action.payload
        })
        .addCase(getOneUser.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.isAuth = true
            state.currentUser = action.payload
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
            state.isAuth = false
        })
        .addCase(logoutUser.fulfilled, (state,action) => {
            state.status = 'Успешно'
            state.isAuth = false
            state.currentUser = null
        })
        .addCase(logoutUser.rejected,(state,action) => {
            state.status = 'Отклонен'
            state.error = action.payload
        })
         .addCase(getProfile.pending, (state) => {
            state.status = 'Загрузка';
            state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'Успешно';
                state.isAuth = true;
                state.currentUser = action.payload;
            })
        .addCase(getProfile.rejected, (state, action) => {
                state.status = 'Отклонен';
                state.error = action.payload;
                state.isAuth = false;
                state.currentUser = null;
            })
    }
})

export default userSlice.reducer