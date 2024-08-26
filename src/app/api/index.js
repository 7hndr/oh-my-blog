import { getCurrentIsoDateTime } from '../../shared/helpers'
const BASE_URL = 'http://localhost:3004'
const INT_FIELDS = ['age', 'role_id', 'id']

export const getUsers = () =>
	fetch(`${BASE_URL}/users`, {})
		.then(r => r.json())
		.then(users =>
			users.map(u => {
				const user = {}
				for (const key in u) {
					user[key] = INT_FIELDS.includes(key)
						? Number(u[key])
						: u[key]
				}
				return user
			})
		)

export const getPosts = ({ limit, page }) =>
	fetch(`${BASE_URL}/posts?_per_page=${limit}&_page=${page}`, {}).then(
		posts => posts.json()
	)

export const getPost = ({ id }) =>
	fetch(`${BASE_URL}/posts/${id}`, {}).then(r => r.json())

export const getUser = (id = 1) =>
	fetch(`${BASE_URL}/users/${id}`, {}).then(r => r.json())

export const updateUser = async user => {
	console.log(user)
	return fetch(`${BASE_URL}/users/${user.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...user,
			age: Number(user.age),
			role_id: Number(user.role_id),
			id: Number(user.id)
		})
	}).then(user => user.json())
}

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
