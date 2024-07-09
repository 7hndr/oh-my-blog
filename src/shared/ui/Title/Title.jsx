import PropTypes from 'prop-types'
import styled from 'styled-components'

const TitleComponent = styled.h1`
	color: ${({ type }) => {
		switch (type) {
			case 'secondary':
				return 'var(--secondary-text)'
			case 'contrast':
				return 'var(--contrast-text)'
			default:
				return 'var(--primary-text)'
		}
	}};
	text-transform: ${({ $uppercase }) => ($uppercase ? 'uppercase' : 'none')};
	letter-spacing: ${({ letterSpacing }) => letterSpacing};
	font-size: ${({ size }) => {
		switch (size) {
			case 'h1':
				return '2.5rem'
			case 'h2':
				return '2rem'
			case 'h3':
				return '1.75rem'
			case 'h4':
				return '1.5rem'
			case 'h5':
				return '1.25rem'
			case 'h6':
				return '1rem'
			default:
				return '2rem'
		}
	}};
	font-weight: ${({ $weight }) => $weight};
`

export const Title = ({
	children,
	size = 'h1',
	type = 'primary',
	uppercase = false,
	letterSpacing = 0,
	weight = 300
}) => {
	return (
		<TitleComponent
			size={size}
			type={type}
			$weight={weight}
			$uppercase={uppercase}
			letterSpacing={letterSpacing}
		>
			{children}
		</TitleComponent>
	)
}

Title.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	type: PropTypes.oneOf(['primary', 'secondary', 'contrast']),
	weight: PropTypes.number,
	letterSpacing: PropTypes.string,
	uppercase: PropTypes.bool
}
