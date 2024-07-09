export const REGISTRATION = 'REGISTRATION'
export const AUTHORIZATION = 'AUTHORIZATION'

export const formModelByPurpouse = purpouse =>
	[
		{
			label: 'Login',
			type: 'text',
			name: 'login',
			id: 'login',
			purpouse: [REGISTRATION, AUTHORIZATION]
		},
		{
			label: 'Password',
			type: 'password',
			name: 'password',
			id: 'password',
			purpouse: [REGISTRATION, AUTHORIZATION]
		},
		{
			label: 'Last name',
			type: 'lastName',
			name: 'lastName',
			id: 'lastName',
			purpouse: [REGISTRATION]
		},
		{
			label: 'First name',
			type: 'firstName',
			name: 'firstName',
			id: 'firstName',
			purpouse: [REGISTRATION]
		},
		{
			label: 'Age',
			type: 'age',
			name: 'age',
			id: 'age',
			purpouse: [REGISTRATION]
		},
		{
			label: 'E-Mail',
			type: 'email',
			name: 'email',
			id: 'email',
			purpouse: [REGISTRATION]
		},
		{
			label: 'Repeat password',
			name: 'passwordRepeat',
			type: 'password',
			id: 'passwordRepeat',
			purpouse: [REGISTRATION]
		}
	].filter(input => input.purpouse.includes(purpouse))
export const initialStateByPurpouse = purpouse => {
	return formModelByPurpouse(purpouse).reduce(
		(a, c) => ({ ...a, [c.id]: '' }),
		{}
	)
}
