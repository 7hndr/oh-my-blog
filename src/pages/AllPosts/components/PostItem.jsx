import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Title } from '../../../shared/ui'

const PostContainer = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 2rem;
	display: grid;
	grid-gap: 2rem;
	justify-items: center;
	align-items: center;
	transition: border 0.15s;

	&:hover {
		border: 1px solid rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
`

const PostImage = styled.img`
	height: auto;
	width: 300px;
	overflow: hidden;
`

const PostText = styled.p`
	font-size: 1rem;
	color: var(--primary-text);
	flex-grow: 1;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`

const PostDate = styled.div`
	font-size: 0.875rem;
	color: var(--secondary-text);
	text-align: right;
	margin-top: 1rem;
`

export const PostItem = ({ title, text, image_url, created_at }) => {
	return (
		<PostContainer>
			{image_url && (
				<PostImage
					src={image_url}
					alt={title}
				/>
			)}
			<Title
				size='h5'
				weight={700}
			>
				{title}
			</Title>
			<PostText>{text}</PostText>
			<PostDate>{new Date(created_at).toLocaleDateString('ru')}</PostDate>
		</PostContainer>
	)
}

PostItem.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string,
	image_url: PropTypes.string,
	created_at: PropTypes.string.isRequired
}
