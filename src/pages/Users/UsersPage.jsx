import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUsers } from '../../app/api'
import { UserItem } from './components/UserItem'
import { Title } from '../../shared/ui'

const UsersWrapper = styled.div`
	display: grid;
	gap: 1rem;
	justify-content: center;
	overflow: hidden;
	padding: 2rem;
	align-items: start;
`
const UsersContent = styled.div`
	display: grid;
	gap: 1rem;
	overflow: auto;
	height: 100%;
	padding: 2rem;
	width: 500px;
`

export const UsersPage = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		getUsers().then(users => setUsers(users))
	}, [])

	return (
		<UsersWrapper>
			<Title center>Users</Title>
			<UsersContent>
				{users.map(user => (
					<UserItem
						key={user.id}
						user={user}
					/>
				))}
			</UsersContent>
		</UsersWrapper>
	)
}
