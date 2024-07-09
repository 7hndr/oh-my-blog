import { NavLink as BaseNavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Icon } from '../../../ui'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../../../../features/Auth/store/authSlice'
import { deleteCookie } from '../../../helpers'

const NavLink = styled(BaseNavLink)`
	cursor: pointer;
	text-decoration: none !important;
	color: #353535;
	transition: all ease 0.13s;
	position: relative;

	&:hover {
		transform: scale(1.25);
	}

	&.active {
		&::after {
			content: '';
			border: 1px solid gray;
			border-radius: 50%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 2rem;
			height: 2rem;
			position: absolute;
		}
	}
`

const ControlsContainer = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	position: relative;
	padding: 1rem 1rem 1rem 2rem;
`

const Divider = styled.div`
	width: 1px;
	height: 80%;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: #000;
	opacity: 0.1;
`

export const Controls = () => {
	const dispatch = useDispatch()

	const controlButtons = [
		{
			name: 'user',
			title: 'User page',
			to: '/user',
			onlyForAuthorized: true
		},
		{
			name: 'sign-in-alt',
			title: 'Auth page',
			to: '/auth',
			onlyForAuthorized: false
		},
		{
			name: 'solar-panel',
			title: 'Dashboard',
			to: '/dashboard',
			onlyForAuthorized: true
		},
		{
			name: 'sign-out-alt',
			title: 'Logout',
			to: '/',
			onClick: () => {
				deleteCookie('token')
				dispatch(setToken(null))
			},
			onlyForAuthorized: true
		}
	]

	const { token } = useSelector(state => state.auth)
	const [buttons, setButtons] = useState([...controlButtons])

	useEffect(() => {
		setButtons(
			[...controlButtons].filter(b =>
				token ? b.onlyForAuthorized : !b.onlyForAuthorized
			)
		)
	}, [token])

	return (
		<ControlsContainer>
			{buttons.map(({ title, name, to, onClick }) => (
				<NavLink
					key={name}
					to={to}
					onClick={onClick}
				>
					<Icon
						name={name}
						size={1}
						title={title}
					/>
				</NavLink>
			))}

			<Divider />
		</ControlsContainer>
	)
}
