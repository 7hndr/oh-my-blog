import { getCurrentIsoDateTime } from '../../shared/helpers'
const BASE_URL = 'http://localhost:3004'

export const getUsers = fetch(`${BASE_URL}/users`, {}).then(users =>
	users.json()
)

export const getUserByLogin = async login => {
	return fetch(`${BASE_URL}/users`, {})
		.then(res => res.json())
		.then(users => users?.find(u => u.login === login))
}

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
