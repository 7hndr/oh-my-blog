import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Icon, Input, Text } from '../../shared/ui'
import { SentSuccess } from './components/SentSuccess'

import { validationSchemaByPurpouse } from './validation'
import {
	formModelByPurpouse,
	initialStateByPurpouse,
	REGISTRATION,
	AUTHORIZATION
} from './config'
import { loginUser, registerUser } from './store/authSlice'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const AuthWrapper = styled.div`
	display: grid;
	width: 100%;
	align-content: start;
	grid-gap: 0.5rem;
	border-radius: var(--border-radius);
	justify-content: center;
`

const Form = styled.form`
	width: 20rem;
	display: grid;
	grid-gap: 1rem;
`

const ButtonsBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-gap: 0.5rem;
`

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const Auth = () => {
	const [isSent, setIsSent] = useState(false)

	const [mode, setMode] = useState(AUTHORIZATION)
	const submitRef = useRef()
	const prevSubmitDisabledState = useRef(false)
	const dispatch = useDispatch()
	const { loading, error } = useSelector(state => state.auth)

	const navigate = useNavigate()

	const {
		reset,
		control,
		handleSubmit,
		setFocus,
		formState: { errors }
	} = useForm({
		defaultValues: {
			...initialStateByPurpouse(mode)
		},
		resolver: yupResolver(validationSchemaByPurpouse(mode))
	})

	const isSubmitDisabled = !!Object.values(errors)
		.map(e => e?.message)
		.filter(Boolean)?.length

	const onSubmit = async form => {
		switch (mode) {
			case REGISTRATION:
				dispatch(registerUser({ ...form }))
				break
			case AUTHORIZATION:
				dispatch(loginUser({ ...form }))
				break

			default:
				break
		}
		navigate('/')
	}

	const handleTryAgain = () => {
		reset()
		setIsSent(false)
	}

	const handleReset = () => {
		reset()
	}

	const toggleMode = () => {
		setMode(mode === AUTHORIZATION ? REGISTRATION : AUTHORIZATION)
	}

	useEffect(() => {
		setMode(AUTHORIZATION)
		!isSent &&
			!!prevSubmitDisabledState.current &&
			!isSubmitDisabled &&
			submitRef.current.focus()

		prevSubmitDisabledState.current = isSubmitDisabled
	}, [isSubmitDisabled, isSent])

	return (
		<AuthWrapper>
			{isSent ? (
				error ? (
					<>
						<SentSuccess handleTryAgain={handleTryAgain} />
						<Text>{error}</Text>
					</>
				) : (
					<Text>Success! You`ll be redirected to the main page</Text>
				)
			) : (
				<>
					<Form onSubmit={handleSubmit(onSubmit)}>
						{formModelByPurpouse(mode).map(input => (
							<Controller
								key={input.id}
								name={input.name}
								control={control}
								render={({ field }) => (
									<Input
										label={input.label}
										placeholder={input.label}
										error={errors[input.id]?.message}
										type={input.type}
										name={input.name}
										setFocus={setFocus}
										{...field}
									/>
								)}
							/>
						))}
						<ButtonsBlock>
							<Button
								_ref={submitRef}
								disabled={isSubmitDisabled}
								type='submit'
								loading={loading}
							>
								Enter
							</Button>
							<Button
								onClick={handleReset}
								type='button'
								title='Reset'
							>
								<Icon name='arrow-rotate-left' />
							</Button>
						</ButtonsBlock>
					</Form>

					<Button
						simple
						onClick={toggleMode}
					>
						{mode === REGISTRATION
							? 'Already have an account?'
							: "Don't have an account?"}
					</Button>
				</>
			)}
		</AuthWrapper>
	)
}
