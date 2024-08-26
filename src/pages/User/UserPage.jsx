import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Input, Title } from '../../shared/ui'
import { getUser, updateUser } from '../../app/api'

const ProfileWrapper = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 2rem;
	justify-content: center;
	align-content: start;
	align-items: start;
	overflow: hidden;
`
const ProfileContent = styled.div`
	display: grid;
	overflow: auto;
	grid-gap: 1rem;
	padding: 2rem;
	height: 100%;
	width: 600px;
`

const ProfileField = styled.div`
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

export const UserPage = ({ user }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState(user || null)

	const handleEditToggle = () => {
		setIsEditing(!isEditing)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSave = () => {
		// Here, you would make an API call to save the updated user data
		setIsEditing(false)
		updateUser(formData).then(setFormData)
	}
	useEffect(() => {
		getUser().then(user => {
			console.log(user)
			setFormData(user)
		})
	}, [])

	return (
		<>
			{formData && (
				<ProfileWrapper>
					<Title center>User Profile</Title>
					<ProfileContent>
						<ProfileField>
							<Label>ID:</Label>
							<Value>{formData.id}</Value>
						</ProfileField>
						<ProfileField>
							<Label>Created At:</Label>
							<Value>{formData.created_at}</Value>
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						<ProfileField>
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
						</ProfileField>
						{isEditing ? (
							<EditButton onClick={handleSave}>Save</EditButton>
						) : (
							<EditButton onClick={handleEditToggle}>
								Edit
							</EditButton>
						)}
					</ProfileContent>
				</ProfileWrapper>
			)}
		</>
	)
}

UserPage.propTypes = {
	user: PropTypes.object
}
