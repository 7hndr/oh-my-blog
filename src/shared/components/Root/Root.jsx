import { Outlet } from 'react-router-dom'
import { Footer, Header, Sidebar } from '../'
import styled from 'styled-components'

const Layout = styled.div`
	display: grid;
	background-color: #fff;
	height: 100vh;
	grid-template-rows: 20rem 1fr 3rem;
`
const Content = styled.main`
	display: grid;
	padding: 2rem;
`
const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 30rem;
	background-color: #ffffff;
`

export const Root = () => {
	return (
		<Layout className='dark'>
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
