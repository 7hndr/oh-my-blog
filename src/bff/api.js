import { getCurrentIsoDateTime } from '../helpers'
const BASE_URL = 'http://localhost:3004'

export const getUsers = fetch(`${BASE_URL}/users`, {}).then(users =>
	users.json()
)

export const getUserByLogin = login =>
	fetch(`${BASE_URL}/users`, {}).then(users =>
		users.json()?.find(u => u.login === login)
	)

export const createUser = userData =>
	fetch(`${BASE_URL}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {
			...userData,
			created_at: getCurrentIsoDateTime(new Date())
		}
	})
