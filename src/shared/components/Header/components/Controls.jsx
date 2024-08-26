import { useEffect, useState, useMemo } from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'
import styled from 'styled-components'

import { Icon } from '../../../ui'
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
	grid-auto-flow: column;
	grid-gap: 2rem;
	justify-items: center;
	position: relative;
	padding: 1rem 1rem 1rem 2rem;
`

export const Controls = () => {
	const dispatch = useDispatch()

	const getControlButtons = useMemo(
		() => () =>
			[
				{
					name: 'user',
					title: 'User page',
					to: '/user',
					onlyForAuthorized: true
				},
				{
					name: 'users',
					title: 'Users page',
					to: '/users',
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
			],
		[dispatch]
	)

	const { token } = useSelector(state => state.auth)
	const [buttons, setButtons] = useState([...getControlButtons()])

	useEffect(() => {
		setButtons(
			[...getControlButtons()].filter(b =>
				token ? b.onlyForAuthorized : !b.onlyForAuthorized
			)
		)
	}, [token, getControlButtons])

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
		</ControlsContainer>
	)
}
