import { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'

import {
	Footer,
	Header
	// , Sidebar
} from '../'
import { getCookie, deleteCookie } from '../../helpers'
import { setToken } from '../../../features//Auth/store/authSlice'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const Layout = styled.div`
	display: grid;
	background-color: var(--bg);
	height: 100vh;
	grid-template-rows: 8rem 1fr 3rem;
	overflow: hidden;

	@media only screen and (max-width: 600px) {
		grid-template-rows: 12rem 1fr 3rem;
	}

	@media only screen and (max-width: 400px) {
		grid-template-rows: 16rem 1fr 3rem;
	}
`
const Content = styled.main`
	display: grid;
	padding: 1rem 0;
	overflow: hidden;
`
const Container = styled.div`
	overflow: hidden;
	display: grid;

	/* grid-template-columns: 1fr 30rem; */
`

export const Root = () => {
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(() => {
		if (location.state?.logout) {
			deleteCookie('token')
			dispatch(setToken(null))
		} else {
			dispatch(setToken(getCookie('token')))
		}
	}, [dispatch, location])

	return (
		<Layout className='light'>
			<Header />

			<Container>
				<Content>
					<Outlet />
				</Content>
			</Container>
			<Footer />
		</Layout>
	)
}
