import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../../ui'
import { Controls } from './components/Controls'

const HeaderContainer = styled.div`
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 2rem;
	justify-content: space-between;
	padding: 2rem;
	position: relative;
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
`

const Title = styled.h1`
	text-align: center;
	color: #353535;
	font-weight: 300;
	font-size: 2.5rem;
	letter-spacing: 0.4rem;
	text-transform: uppercase;
`

export const Header = () => (
	<HeaderContainer>
		<NavLink
			to='/'
			style={{ textDecoration: 'none' }}
		>
			<InfoContainer>
				<Logo />
				<Title>Thndr`s blog</Title>
			</InfoContainer>
		</NavLink>
		<Controls />
		<Divider />
	</HeaderContainer>
)

//
// import { routeList } from '../../router/index.jsx'
// const navLinks = routeList
// 	.find(route => route.path === '/')
// 	.children.filter(route => !!route.path?.startsWith('/'))
{
	/* <div className=''>
				<nav className=''>
					{navLinks
						.filter(({ path }) => path !== '*')
						.map(({ name, path }) => {
							const _path = path.replace('/*', '')

							return (
								<NavLink
									key={path}
									to={_path}
									className={({ isActive }) =>
										isActive ? `` : ''
									}
								>
									<span className=''>{name}</span>
								</NavLink>
							)
						})}
				</nav>
			</div> */
}
