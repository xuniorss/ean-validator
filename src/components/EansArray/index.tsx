'use client'

import { EansProps } from '@/types'
import { useCallback, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface EansArrayProps {
	data: EansProps[]
}

const ITEMS_PER_PAGE = 100

export const EansArray = ({ data = [] }: EansArrayProps) => {
	const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE)

	const loadMore = useCallback(
		() => setItemsToShow(itemsToShow + ITEMS_PER_PAGE),
		[itemsToShow],
	)

	const hasMoreItems = itemsToShow < data.length

	const displayedEans = useMemo(
		() => data.slice(0, itemsToShow),
		[data, itemsToShow],
	)

	return (
		<InfiniteScroll
			dataLength={itemsToShow}
			next={loadMore}
			hasMore={hasMoreItems}
			loader={<h4>Carregando...</h4>}
			height={800}
			className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent scrollbar-thumb-rounded"
		>
			<ul>
				{displayedEans.map((ean, idx) => (
					<li key={idx}>
						<strong>COD_PRODUTO:</strong> {ean.codProduto}
						{'; '}
						<strong>COD_EAN:</strong> {ean.ean}
					</li>
				))}
			</ul>
		</InfiniteScroll>
	)
}
