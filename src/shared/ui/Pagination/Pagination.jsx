import PropTypes from 'prop-types'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`

const PageButton = styled.button`
	border: 1px solid;
	border-color: ${({ $active }) =>
		$active ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.0)'};
	color: var(--primary-text);
	padding: 0.5rem 0.75rem;
	margin: 0 0.25rem;
	cursor: pointer;
	background-color: transparent;
	transition: border-color 0.15s;

	&:disabled {
		opacity: 0.25;
		cursor: not-allowed;
	}

	&:hover:not(:disabled) {
		border-color: ${({ $active }) =>
			$active ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.25)'};
	}
`

const Ellipsis = styled.span`
	padding: 0.5rem 0.75rem;
`

export const Pagination = ({
	totalPages,
	currentPage,
	onPageChange,
	pageRangeDisplayed = 3
}) => {
	const createPageNumbers = () => {
		const pages = []
		const startPage = Math.max(
			1,
			currentPage - Math.floor(pageRangeDisplayed / 2)
		)
		const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1)

		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<PageButton
					key={i}
					$active={i === currentPage}
					onClick={() => onPageChange(i)}
				>
					{i}
				</PageButton>
			)
		}

		return pages
	}

	return (
		<PaginationWrapper>
			<PageButton
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
			>
				First
			</PageButton>
			<PageButton
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Prev
			</PageButton>
			{currentPage > pageRangeDisplayed && <Ellipsis>...</Ellipsis>}
			{createPageNumbers()}
			{currentPage < totalPages - pageRangeDisplayed && (
				<Ellipsis>...</Ellipsis>
			)}
			<PageButton
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</PageButton>
			<PageButton
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				Last
			</PageButton>
		</PaginationWrapper>
	)
}

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	pageRangeDisplayed: PropTypes.number
}
