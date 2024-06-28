import { useState } from 'react'
import { Auth } from '../../modules'
import { Switch } from '../../ui'

export const AuthPage = () => {
	const [withoutLibs, setWithLibs] = useState(true)

	return (
		<div className=''>
			<Switch
				label='Without Yup & react-hook-form'
				checked={withoutLibs}
				onChange={setWithLibs}
			/>
			<Auth />
		</div>
	)
}
