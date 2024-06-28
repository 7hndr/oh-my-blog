import { Navigate } from 'react-router-dom'
import { Root } from '../layout'
import { Home, NotFound, AuthPage } from '../pages'

export const routeList = [
	{
		path: '/',
		element: <Root />,
		children: [
			{ path: '*', element: <NotFound /> },
			{
				index: true,
				element: (
					<Navigate
						to='/home'
						replace={true}
					/>
				)
			},
			{ name: 'Home', path: '/home', element: <Home /> },
			{
				name: 'Auth',
				path: '/auth',
				element: <AuthPage />
			}
		]
	}
]
