import styled from 'styled-components'
import logo from '../../../assets/images/logo.svg'

const HeaderDiv = styled.div`
	display: grid;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 2rem;
	justify-content: center;
`

const Title = styled.h1`
	text-align: center;
	color: #353535;
	font-size: 3rem;
`

const Logo = styled.img`
	width: 4rem;
`

export const Header = () => (
	<HeaderDiv>
		<Logo
			src={logo}
			alt='logo'
		/>
		<Title>Thndr`s blog</Title>
	</HeaderDiv>
)

// import { NavLink } from 'react-router-dom'
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
