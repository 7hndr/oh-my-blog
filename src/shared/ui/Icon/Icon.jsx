import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconContainer = ({ name, className = '', ...props }) => (
	<i
		className={`fa fa-${name} ${className}`}
		{...props}
	/>
)

export const Icon = styled(IconContainer)`
	font-size: ${({ size }) => size}rem;
	color: ${({ color }) => color};
`

IconContainer.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number
}
