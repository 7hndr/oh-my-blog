import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const loaderAnimation = keyframes`
	0% {
		content: '•';
		opacity: 0.5;
	}
	25% {
		content: '• • •';
		opacity: 1;
	}
	50% {
		content: '• • • • •';
		opacity: 0.75;
	}
	75% {
		content: '• • •';
		opacity: 0.5;
	}
	95% {
		content: '';
		opacity: 0.25;
	}
`

const ButtonStyled = styled.button`
	display: grid;
	align-items: center;
	justify-content: center;
	background-color: var(--accent);
	border-radius: var(--border-radius);
	cursor: pointer;
	transition: all 0.15s ease;
	border: none;
	padding: 0.5rem 0.75rem;
	grid-auto-flow: column;
	border: 1px solid transparent;
	grid-gap: 0.5rem;
	font-size: 1rem;
	color: var(--contrast-text);
	text-align: center;
	height: 2.5rem;
	text-decoration: none;
	font-weight: bold;
	position: relative;

	&:active {
		background-color: var(--disabled-color);
	}

	&:hover {
		background-color: var(--accent-hover);
	}

	${({ loading }) =>
		loading &&
		css`
			&::after {
				content: '•';
				animation: ${loaderAnimation} 1.5s ease infinite;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 0.75rem;
			}
		`}

	${({ $disabled }) =>
		$disabled &&
		css`
			opacity: 0.6;
			pointer-events: none;
		`}

	${({ $active }) =>
		$active &&
		css`
			color: var(--accent) !important;
		`}

	${({ $square }) =>
		$square &&
		css`
			height: 2.5rem;
			width: 2.5rem;
			padding: 0;
		`}

	${({ $simple }) =>
		$simple &&
		css`
			background-color: transparent;
			outline: 0 solid gray;
			color: var(--primary-text);
			padding: 0.25rem;
			height: auto;
			transition: all 0.1s ease;

			&:active {
				outline: 1px solid;
				color: var(--accent-hover);
				background-color: transparent;
				outline-color: var(--disabled-color);
			}

			&:hover {
				border: 1px solid;
				color: var(--accent-hover);
				background-color: transparent;
				border-color: var(--accent-hover);
			}
		`}
`

export const Button = (
	{
		disabled,
		loading,
		type,
		simple,
		active,
		square,
		className,
		children,
		onClick,
		title,
		_ref
	} = {
		disabled: false,
		loading: false,
		simple: false,
		active: false,
		square: false,
		type: 'button'
	}
) => {
	return (
		<ButtonStyled
			ref={_ref}
			type={type}
			$disabled={disabled}
			onClick={onClick}
			title={title}
			$loading={loading}
			$simple={simple}
			$square={square}
			active={active}
			className={className}
		>
			{!loading && children}
		</ButtonStyled>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	simple: PropTypes.bool,
	square: PropTypes.bool,
	active: PropTypes.bool,
	title: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	_ref: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) })
	])
}
