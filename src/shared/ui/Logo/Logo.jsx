import logo from '../../../assets/images/logo.svg'
import styled from 'styled-components'

const LogoImg = styled.img`
	width: 5rem;
`

export const Logo = () => (
	<LogoImg
		src={logo}
		alt='logo'
	/>
)
