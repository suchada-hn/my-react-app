import React, { ChangeEvent, ReactElement } from 'react'
import { Rest } from 'types'
import RestCard from 'components/RestCard'
import RestFilter from '../RestFilter'
import { List, ListItem } from './styles'
interface Props {
	err?: string
	rests: Rest[]
	onFilterChange: (e: ChangeEvent<HTMLFormElement>) => void
}

const RestList = ({ err, rests, onFilterChange }: Props): ReactElement => {
	if (err) {
		return <p>Unable to fetch restaurants</p>
	}
	if (!rests?.length) {
		return <p>No restaurants available</p>
	}
	return (
		<><div className="col">
			<RestFilter onChange={onFilterChange} />
		</div>
			<div className="col">
				<List>
					{rests.map(rest => (
						<ListItem key={rest.id}>
							<RestCard content={rest} />
						</ListItem>
					))}
				</List>
			</div></>
	)
}

export default RestList
