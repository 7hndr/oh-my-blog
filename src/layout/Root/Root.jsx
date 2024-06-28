import { Outlet } from 'react-router-dom'
import { Footer, Header, Sidebar } from '../'

export const Root = () => {
	return (
		<>
			<div className=''>
				<Header />

				<div className=''>
					<Sidebar />

					<div className=''>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}
