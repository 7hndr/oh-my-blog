import styled from 'styled-components'

const FooterDiv = styled.div`
	display: grid;
	align-content: center;
	padding: 1rem;
	position: relative;
	justify-content: center;
`

const Copyright = styled.span`
	text-align: center;
	font-size: 0.8rem;
	opacity: 0.5;
`

const Divider = styled.div`
	height: 1px;
	width: 80%;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: #000;
	opacity: 0.1;
`

export const Footer = () => {
	return (
		<FooterDiv>
			<Copyright>{`All rights reserved | ${new Date().getFullYear()}`}</Copyright>
			<Divider />
		</FooterDiv>
	)
}
