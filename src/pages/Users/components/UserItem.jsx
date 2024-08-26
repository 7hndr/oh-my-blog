import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Input } from '../../../shared/ui'
import { updateUser } from '../../../app/api'

const UserWrapper = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.5);
`

const UserField = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0;
`

const Label = styled.label`
	font-weight: bold;
	margin-right: 1rem;
`

const Value = styled.span`
	font-size: 1rem;
`

const EditButton = styled(Button)`
	margin-top: 1rem;
	width: 100px;
`

export const UserItem = ({ user }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState(user)

	const handleEditToggle = () => {
		setIsEditing(!isEditing)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSave = () => {
		setIsEditing(false)
		updateUser(formData).then(setFormData)
	}

	return (
		<UserWrapper>
			<UserField>
				<Label>ID:</Label>
				<Value>{formData.id}</Value>
			</UserField>
			<UserField>
				<Label>Created At:</Label>
				<Value>{formData.created_at}</Value>
			</UserField>
			<UserField>
				<Label>Login:</Label>
				{isEditing ? (
					<Input
						name='login'
						value={formData.login}
						onChange={handleChange}
					/>
				) : (
					<Value>{formData.login}</Value>
				)}
			</UserField>
			<UserField>
				<Label>Password:</Label>
				{isEditing ? (
					<Input
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
					/>
				) : (
					<Value>******</Value>
				)}
			</UserField>
			<UserField>
				<Label>First Name:</Label>
				{isEditing ? (
					<Input
						name='first_name'
						value={formData.first_name}
						onChange={handleChange}
					/>
				) : (
					<Value>{formData.first_name}</Value>
				)}
			</UserField>
			<UserField>
				<Label>Last Name:</Label>
				{isEditing ? (
					<Input
						name='last_name'
						value={formData.last_name}
						onChange={handleChange}
					/>
				) : (
					<Value>{formData.last_name}</Value>
				)}
			</UserField>
			<UserField>
				<Label>Age:</Label>
				{isEditing ? (
					<Input
						name='age'
						value={formData.age}
						onChange={handleChange}
					/>
				) : (
					<Value>{formData.age}</Value>
				)}
			</UserField>
			<UserField>
				<Label>Role ID:</Label>
				{isEditing ? (
					<Input
						name='role_id'
						value={formData.role_id}
						onChange={handleChange}
					/>
				) : (
					<Value>{formData.role_id}</Value>
				)}
			</UserField>
			{isEditing ? (
				<EditButton onClick={handleSave}>Save</EditButton>
			) : (
				<EditButton onClick={handleEditToggle}>Edit</EditButton>
			)}
		</UserWrapper>
	)
}

UserItem.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number.isRequired,
		created_at: PropTypes.string.isRequired,
		login: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		first_name: PropTypes.string.isRequired,
		last_name: PropTypes.string.isRequired,
		age: PropTypes.number.isRequired,
		role_id: PropTypes.number.isRequired
	}).isRequired
}
