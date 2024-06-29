import { getUsers, getUserByLogin, createUser } from './api'
import { createSession } from './session'

export const server = {
	async authorize({ login, password }) {
		const user = await getUserByLogin(login)

		if (!user) {
			return {
				error: 'user_not_found',
				res: null
			}
		} else if (user.password !== password) {
			return {
				error: 'password_invalid',
				res: null
			}
		} else {
			const session = createSession(user.role_id)

			return {
				error: null,
				res: { session, token: '1' }
			}
		}
	},
	async register({ login, password, age, firstName, lastName }) {
		const users = await getUsers()

		const user = users?.find(u => u.login === login)

		if (user) {
			return {
				error: 'login_in_use',
				res: null
			}
		} else {
			await createUser({
				login,
				password,
				age,
				firstName,
				lastName,
				role_id: 2
			})

			const session = createSession(user.role_id)

			return {
				error: null,
				res: { session }
			}
		}
	}
}
