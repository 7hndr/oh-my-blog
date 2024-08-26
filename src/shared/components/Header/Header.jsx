import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Logo, Title } from '../../ui'
import { Controls } from './components/Controls'

const HeaderContainer = styled.div`
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 2rem;
	justify-content: space-between;
	padding: 2rem;
	position: relative;

	@media only screen and (max-width: 600px) {
		justify-content: center;
		grid-auto-flow: row;
	}
`

const Divider = styled.div`
	height: 1px;
	width: 80%;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: #000;
	opacity: 0.1;
`

const InfoContainer = styled.div`
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 2rem;
	justify-content: center;

	@media only screen and (max-width: 400px) {
		grid-auto-flow: row;
		justify-items: center;
	}
`

export const Header = () => (
	<HeaderContainer>
		<NavLink
			to='/'
			style={{ textDecoration: 'none' }}
		>
			<InfoContainer>
				<Logo />
				<Title
					letterSpacing='0.05rem'
					size='h3'
					weight={700}
				>
					Thndr`s blog
				</Title>
			</InfoContainer>
		</NavLink>
		<Controls />
		<Divider />
	</HeaderContainer>
)
