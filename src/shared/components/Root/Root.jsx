import { Outlet } from 'react-router-dom'
import { Footer, Header, Sidebar } from '../'
import styled from 'styled-components'

const Layout = styled.div`
	display: grid;
	background-color: #fff;
	/* background-color: #222; */
	height: 100vh;
	grid-template-rows: 20rem 1fr 4rem;
`
const Content = styled.main`
	display: grid;
	padding: 2rem;
`
const Middle = styled.div`
	display: grid;
	grid-template-columns: 1fr 30rem;
	background-color: #e4e0e0;
`

export const Root = () => {
	return (
		<Layout>
			<Header />

			<Middle>
				<Content>
					<Outlet />
				</Content>
				<Sidebar />
			</Middle>
			<Footer />
		</Layout>
	)
}
