import { setCookie } from '../../shared/helpers'
import { getUserByLogin, createUser } from '../api'

export const server = {
	authorize({ login, password }) {
		return new Promise(resolve => {
			getUserByLogin(login).then(user => {
				if (!user) {
					resolve({
						error: 'user_not_found',
						res: null
					})
				} else if (user.password !== password) {
					resolve({
						error: 'password_invalid',
						res: null
					})
				} else {
					const token = (+new Date()).toString(16)

					setCookie('token', token, 1)

					resolve({
						error: null,
						res: { user, token }
					})
				}
			})
		})
	},
	async register({ login, password, age, firstName, lastName }) {
		return new Promise(resolve => {
			getUserByLogin(login).then(user => {
				if (user) {
					resolve({
						error: 'login_in_use',
						res: null
					})
				} else {
					createUser({
						login,
						password,
						age,
						firstName,
						lastName,
						role_id: 2
					}).then(user => {
						const token = (+new Date()).toString(16)

						setCookie('token', token, 1)

						resolve({
							error: null,
							res: { user, token }
						})
					})
				}
			})
		})
	}
}
