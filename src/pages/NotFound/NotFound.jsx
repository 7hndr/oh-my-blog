import { Button } from '../../ui'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className=''>
			<h1 className=''>Oops!</h1>
			<p className=''>Something went wrong</p>

			<Button
				simple
				onClick={() => navigate('/home')}
			>
				Go home
			</Button>
		</div>
	)
}
