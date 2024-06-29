import styled from 'styled-components'

const Div = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 2rem;
	place-content: center;
	grid-auto-flow: column;
	align-items: center;
`

export const AllPostsPage = () => {
	return (
		<Div>
			<i className='fa-solid fa-list' />
			<h1>Posts</h1>
		</Div>
	)
}
