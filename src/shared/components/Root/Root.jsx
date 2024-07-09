import { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'

import { Footer, Header, Sidebar } from '../'
import { getCookie, deleteCookie } from '../../helpers'
import { setToken } from '../../../features//Auth/store/authSlice'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const Layout = styled.div`
	display: grid;
	background-color: var(--bg);
	height: 100vh;
	grid-template-rows: 16rem 1fr 4rem;
`
const Content = styled.main`
	display: grid;
	padding: 2rem;
`
const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 30rem;
`

export const Root = () => {
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		if (location.state?.logout) {
			console.log(1)
			deleteCookie('token')
			dispatch(setToken(null))
		} else {
			dispatch(setToken(getCookie('token')))
		}
	}, [])

	return (
		<Layout className='light'>
			<Header />

			<Container>
				<Content>
					<Outlet />
				</Content>
				<Sidebar />
			</Container>
			<Footer />
		</Layout>
	)
}
