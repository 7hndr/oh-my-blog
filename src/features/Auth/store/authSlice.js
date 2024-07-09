import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { server } from '../../../app/bff'
// import { deleteCookie } from '../../../shared/helpers'

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ login, password }, { rejectWithValue }) => {
		try {
			const response = await server.authorize({ login, password })
			if (response.error) {
				return rejectWithValue(response.error)
			}
			return response.res
		} catch (error) {
			return rejectWithValue('Authorization error')
		}
	}
)

// Асинхронное действие для регистрации пользователя
export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		{ login, password, age, firstName, lastName },
		{ rejectWithValue }
	) => {
		try {
			const response = await server.register({
				login,
				password,
				age,
				firstName,
				lastName
			})
			if (response.error) {
				return rejectWithValue(response.error)
			}
			return response.res
		} catch (error) {
			return rejectWithValue('Registration error')
		}
	}
)

const initialState = {
	user: null,
	token: null,
	loading: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.user = null
			state.token = null
		},
		toggleLoading: (state, action) => {
			state.loading = action.payload ?? !state.loading
		},
		clearError: state => {
			state.error = null
		},
		setToken: (state, { payload }) => {
			state.token = payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				const payload = action?.payload
				state.loading = false
				state.user = payload?.session
				state.token = payload?.token
			})
			.addCase(loginUser.rejected, (state, action) => {
				const payload = action.payload
				state.loading = false
				state.error = payload || 'Authorization error'
			})
			.addCase(registerUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				const payload = action.payload
				state.loading = false
				state.user = payload?.session
			})
			.addCase(registerUser.rejected, (state, action) => {
				const payload = action.payload
				state.loading = false
				state.error = payload || 'Registration error'
			})
	}
})

export const { setUser, setToken, clearError, logout } = authSlice.actions

export default authSlice.reducer
