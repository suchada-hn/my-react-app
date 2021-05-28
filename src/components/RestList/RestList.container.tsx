import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'
import useFetch from 'hooks/useFetch'
import RestListRender from './RestList.render'
import { Filter } from './types'

const RestListContainer = (): ReactElement => {
	const [filter, setFilter] = useState<Filter>({
		platform: 'browser',
		sortBy: 'relevance',
	})
	const { rests, error } = useFetch(filter)

	const onFilterChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		setFilter(current => ({
			...current,
			[event.target.name]: event.target.value,
		}))
		event.preventDefault()
	}, [])

	return (
		<RestListRender err={error} rests={rests} onFilterChange={onFilterChange} />
	)
}

export default RestListContainer
