import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { login } from './authActions'

const fakeAuthApi = (username, password) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (username === 'user' && password === 'password') {
				resolve({ username })
			} else {
				reject(new Error('Invalid credentials'))
			}
		}, 1000)
	})

export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const user = await fakeAuthApi(username, password) // замените на ваш API вызов
			return user
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const initialState = {
	user: null,
	loading: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.user = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { logout } = authSlice.actions

export default authSlice.reducer
