import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextComponent = styled.span`
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
	font-size: ${({ size = 1 }) => `${size}rem` || '1rem'};
	font-weight: ${({ $weight }) => $weight};
`

export const Text = ({
	children,
	size = 1,
	type = 'primary',
	weight = 400
}) => {
	return (
		<TextComponent
			size={size}
			type={type}
			$weight={weight}
		>
			{children}
		</TextComponent>
	)
}

Text.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.number,
	type: PropTypes.oneOf(['primary', 'secondary', 'contrast']),
	weight: PropTypes.number
}
