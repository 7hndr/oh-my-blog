import { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { getPost } from '../../app/api'
import { Button, Title, Text, Icon } from '../../shared/ui'

const VITE_PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const PostWrapper = styled.div`
	display: grid;
	justify-content: center;
	height: 100%;
	overflow: auto;
	padding: 3rem;

	@media only screen and (max-width: 400px) {
		padding: 1rem;
	}
`

const PostBody = styled.div`
	max-width: 800px;
	display: grid;
	justify-content: center;
	align-content: start;
	grid-gap: 2rem;
`

const ColBlock = styled.div`
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	grid-gap: 1rem;
	align-items: center;
`

const CreatedAt = styled.p`
	color: gray;
	font-size: 0.875rem;
`

const Image = styled.img`
	width: 100%;
	/* max-width: 800px; */
	justify-self: center;
	height: auto;
`

export const PostPage = () => {
	const { id } = useParams()

	const [post, setPost] = useState(null)
	const [imageUrl, setImageUrl] = useState(null)

	useEffect(() => {
		if (id) {
			getPost({ id }).then(postData => {
				setPost(postData)
				if (postData.image_id) {
					fetch(
						`https://api.pexels.com/v1/photos/${postData.image_id}`,
						{
							mode: 'cors',
							headers: {
								Authorization: VITE_PEXELS_API_KEY
							}
						}
					)
						.then(r => r.json())
						.then(r =>
							setImageUrl(
								`${r?.src?.original}?auto=compress&cs=tinysrgb&fit=crop&w=800&h=400`
							)
						)
				}
			})
		}
	}, [id])
	if (!post) {
		return <div>Loading...</div>
	}

	return (
		<PostWrapper>
			<PostBody>
				<ColBlock>
					<NavLink
						to={`/`}
						key={post.id}
						style={{ textDecoration: 'none' }}
					>
						<Button
							simple
							onClick={() => null}
						>
							<Icon name='arrow-left' />
						</Button>
					</NavLink>

					<Title>{post.title}</Title>
				</ColBlock>
				<CreatedAt>
					{new Date(post.created_at).toLocaleDateString()}
				</CreatedAt>
				{post.image_url && (
					<Image
						src={imageUrl}
						alt={post.title}
					/>
				)}
				<Text>{post.text}</Text>
			</PostBody>
		</PostWrapper>
	)
}
