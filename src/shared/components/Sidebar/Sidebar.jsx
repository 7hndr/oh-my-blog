import styled from 'styled-components'

const SidebarDiv = styled.div`
	padding: 2rem;
	position: relative;
`

const LeftDivider = styled.div`
	width: 1px;
	height: 80%;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	background-color: #000;
	opacity: 0.1;
`

export const Sidebar = () => {
	return (
		<SidebarDiv>
			<LeftDivider />
			<h3>Sidebar</h3>
		</SidebarDiv>
	)
}
