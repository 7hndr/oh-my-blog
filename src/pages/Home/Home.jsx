import styled from 'styled-components'

const Div = styled.div`
	display: grid;
	grid-gap: 1rem;
	place-content: center;
`

export const Home = () => {
	return (
		<Div>
			<i className='fa-solid fa-user' />
			<h1>Hi there</h1>
		</Div>
	)
}
