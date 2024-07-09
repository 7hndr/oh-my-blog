import PropTypes from 'prop-types'
import { useState, useRef, forwardRef } from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div`
	position: relative;
	display: grid;
	grid-gap: 0.25rem;
`

const StyledLabel = styled.label`
	color: var(--primary-text);
	font-size: 1rem;

	&:empty {
		display: none;
	}
`

const StyledInput = styled.input`
	color: var(--primary-text);
	display: grid;
	align-items: center;
	border: none;
	border-radius: var(--border-radius);
	padding: 0.75rem 1.75rem 0.75rem 1rem;
	background-color: var(--field);
	font-size: 1rem;
	height: 2.5rem;
	width: 100%;
	position: relative;

	&:focus {
		outline: 2px solid var(--accent-hover);
	}
`

const InputCleaner = styled.button`
	position: absolute;
	right: 0.5rem;
	transform: translateY(50%);
	bottom: 1.25rem;
	width: 1rem;
	height: 1rem;
	display: grid;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: var(--secondary-text);
	padding: 0;
	border: none;
	background-color: transparent;
	transition: color 0.2s ease;

	&:hover {
		color: var(--accent-hover);
	}
`

const ErrorBlock = styled.span`
	color: var(--error-text);
	font-size: 1rem;
`

export const Input = forwardRef(
	({ label, className, error, onChange, setFocus, ...otherProps }, ref) => {
		const [inputValue, setInputValue] = useState(
			otherProps.defaultValue || ''
		)
		const internalRef = useRef()

		const clearHandler = () => {
			setInputValue('')

			if (ref && setFocus) setFocus(otherProps.name)
			if (internalRef.current) internalRef.current?.focus()

			if (onChange) {
				onChange({
					target: { name: otherProps.name || null, value: '' }
				})
			}
		}

		const handleChange = event => {
			setInputValue(event.target.value)
			if (onChange) {
				onChange(event)
			}
		}

		return (
			<>
				<InputWrapper className={className || ''}>
					{label && (
						<StyledLabel htmlFor={otherProps.id}>
							{label}
						</StyledLabel>
					)}
					<StyledInput
						value={inputValue}
						ref={ref || internalRef}
						onChange={handleChange}
						{...otherProps}
					/>
					{(!!inputValue || !!otherProps.value) && (
						<InputCleaner
							onClick={clearHandler}
							tabIndex='-1'
						>
							x
						</InputCleaner>
					)}
				</InputWrapper>
				{error && <ErrorBlock>{error}</ErrorBlock>}
			</>
		)
	}
)

Input.displayName = 'Input'

Input.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.string,
	// _ref: PropTypes.oneOfType([
	// 	PropTypes.func,
	// 	PropTypes.shape({ current: PropTypes.instanceOf(Element) })
	// ]),
	onChange: PropTypes.func,
	setFocus: PropTypes.func,
	otherProps: PropTypes.object
}
