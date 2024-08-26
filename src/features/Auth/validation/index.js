import * as yup from 'yup'
import { formModelByPurpouse } from '../config'
export const rules = {
	isEmail: email => {
		const exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return exp.test(email)
	},
	required: v => Boolean(v.trim()),
	minLength: (v, num) => v.trim().length >= num,
	maxLength: (v, num) => v.trim().length <= num,
	mathchOriginPassword: (pass, _, data) => {
		return pass === data?.password
	}
}

export const schema = {
	email: {
		required: { message: 'E-Mail required' },
		isEmail: { message: 'Enter valid E-Mail' }
	},
	password: {
		minLength: { arg: 5, message: 'Minimum number of characters 5' },
		maxLength: { arg: 24, message: 'Maximum number of characters 24' },
		required: { message: 'Password required' }
	},
	login: {
		minLength: { arg: 4, message: 'Minimum number of characters 4' },
		maxLength: { arg: 24, message: 'Maximum number of characters 24' },
		required: { message: 'Login required' }
	},
	lastName: {
		minLength: { arg: 2, message: 'Minimum number of characters 2' },
		maxLength: { arg: 24, message: 'Maximum number of characters 24' }
	},
	age: {},
	firstName: {
		minLength: { arg: 2, message: 'Minimum number of characters 2' },
		maxLength: { arg: 24, message: 'Maximum number of characters 24' }
	},
	passwordRepeat: {
		required: { message: 'Repeat your password' },
		mathchOriginPassword: {
			message: 'Password mismatch'
		}
	}
}

const formValidations = {
	email: yup
		.string()
		.email(schema.email.isEmail.message)
		.required(schema.email.required.message),
	password: yup
		.string()
		.min(schema.password.minLength.arg, schema.password.minLength.message)
		.max(schema.password.maxLength.arg, schema.password.maxLength.message)
		.required(schema.password.required.message),
	login: yup
		.string()
		.min(schema.login.minLength.arg, schema.login.minLength.message)
		.max(schema.login.maxLength.arg, schema.login.maxLength.message)
		.required(schema.login.required.message),
	lastName: yup
		.string()
		.min(schema.lastName.minLength.arg, schema.lastName.minLength.message)
		.max(schema.lastName.maxLength.arg, schema.lastName.maxLength.message),
	firstName: yup
		.string()
		.min(schema.firstName.minLength.arg, schema.firstName.minLength.message)
		.max(
			schema.firstName.maxLength.arg,
			schema.firstName.maxLength.message
		),
	age: yup.number(),
	passwordRepeat: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			schema.passwordRepeat.mathchOriginPassword.message
		)
		.required(schema.passwordRepeat.required.message)
}

export const validationSchemaByPurpouse = purpouse =>
	yup.object().shape(
		formModelByPurpouse(purpouse)
			.map(input => input.name)
			.reduce((a, c) => ({ ...a, [c]: formValidations[c] }), {})
	)
