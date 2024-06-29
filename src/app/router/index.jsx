import { Navigate } from 'react-router-dom'
import { Root } from '../../shared/components'
import {
	AllPostsPage,
	NotFoundPage,
	AuthPage,
	PostPage,
	NewPostPage,
	UsersPage,
	DashboardPage,
	ErrorPage
} from '../../pages'

export const routeList = [
	{
		path: '/',
		element: <Root />,
		children: [
			{ path: '*', element: <NotFoundPage /> },
			{
				index: true,
				element: (
					<Navigate
						to='/home'
						replace={true}
					/>
				)
			},
			{ name: 'ErrorPage', path: '/error', element: <ErrorPage /> },
			{ name: 'AllPostsPage', path: '/home', element: <AllPostsPage /> },
			{ name: 'PostPage', path: '/post:post_id', element: <PostPage /> },
			{ name: 'NewPostPage', path: '/post', element: <NewPostPage /> },
			{ name: 'UsersPage', path: '/users', element: <UsersPage /> },
			{
				name: 'DashboardPage',
				path: '/dashboard',
				element: <DashboardPage />
			},
			{
				name: 'Auth',
				path: '/auth',
				element: <AuthPage />
			}
		]
	}
]
