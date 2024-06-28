import { NavLink } from 'react-router-dom'
import { routeList } from '../../router/index.jsx'

export const Sidebar = () => {
	const navLinks = routeList
		.find(route => route.path === '/')
		.children.filter(route => !!route.path?.startsWith('/'))

	return (
		<div className=''>
			<h3>App list</h3>
			<div className=''>
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
			</div>
		</div>
	)
}
