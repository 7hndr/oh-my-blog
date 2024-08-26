import styled from 'styled-components'
import { PostItem } from './components/PostItem'
import { useEffect, useState } from 'react'
import { getPosts } from '../../app/api'
import { NavLink } from 'react-router-dom'
import { Text, Pagination } from '../../shared/ui'
const VITE_PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const Wrapper = styled.div`
	padding: 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(200px, 400px));
	justify-content: center;
	grid-gap: 3rem;
	width: 100%;
	overflow: auto;
	height: 100%;

	@media only screen and (max-width: 1920px) {
		grid-template-columns: repeat(3, minmax(200px, 400px));
		grid-gap: 3rem;
	}

	@media only screen and (max-width: 1024px) {
		grid-template-columns: repeat(2, minmax(200px, 400px));
		grid-gap: 2rem;
	}

	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(1, minmax(200px, 400px));
		grid-gap: 1rem;
	}
`

export const AllPostsPage = () => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [totalPagesCount, setTotalPagesCount] = useState(1)
	const PAGE_LIMIT = 4

	const onPageChange = p => {
		setPage(p)
	}

	useEffect(() => {
		setLoading(true)
		getPosts({ limit: PAGE_LIMIT, page })
			.then(async ({ pages, data: posts }) => {
				const images = await Promise.all(
					posts.map(({ image_id }) =>
						fetch(`https://api.pexels.com/v1/photos/${image_id}`, {
							mode: 'cors',
							cache: 'force-cache',
							headers: {
								Authorization: VITE_PEXELS_API_KEY
							}
						})
					)
				).then(results => Promise.all(results.map(r => r.json())))

				setTotalPagesCount(pages)

				return { images, posts }
			})
			.then(({ posts, images }) => {
				setPosts(
					posts.map((p, i) => ({
						...p,
						image_url: `${images[i]?.src?.original}?auto=compress&cs=tinysrgb&fit=crop&w=300&h=400`
					}))
				)
			})
			.finally(() => setLoading(false))
	}, [page])

	return (
		<Wrapper>
			{posts.length ? (
				<>
					<Grid>
						{posts.map(post => (
							<NavLink
								to={`/post/${post.id}`}
								key={post.id}
								style={{ textDecoration: 'none' }}
							>
								<PostItem
									title={post.title}
									text={post.text}
									image_url={post.image_url}
									created_at={post.created_at}
								/>
							</NavLink>
						))}
					</Grid>
					<Pagination
						totalPages={totalPagesCount}
						onPageChange={onPageChange}
						currentPage={page}
					/>
				</>
			) : loading ? (
				<Text>Loading</Text>
			) : (
				<Text>There is no posts</Text>
			)}
		</Wrapper>
	)
}
