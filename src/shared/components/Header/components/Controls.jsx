import { NavLink as BaseNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../../../ui'

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

const controlButtons = [
	{
		name: 'user',
		title: 'User page',
		to: '/user'
	},
	{
		name: 'sign-in-alt',
		title: 'Auth page',
		to: '/auth'
	},
	{
		name: 'solar-panel',
		title: 'Dashboard',
		to: '/dashboard'
	},
	{
		name: 'sign-out-alt',
		title: 'Logout',
		to: '/'
	}
]

export const Controls = () => {
	return (
		<ControlsContainer>
			{controlButtons.map(({ title, name, to }) => (
				<NavLink
					key={name}
					to={to}
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
