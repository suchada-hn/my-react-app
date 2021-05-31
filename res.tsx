import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'
import useFetch from 'hooks/useFetch'
import RestListRender from './RestList.render'
import { Filter } from './types'
import { Rest } from 'types'
import RestCard from 'components/RestCard'
import RestFilter from '../RestFilter'
import { List, ListItem } from './styles'
import {
	StyledLink,
	Img,
	Title,
	Details,
	Description,
	Icon,
	Genre,
} from 'components/RestCard/styles'

interface Props {
	content: Rest
}
const RestListContainer = (): ReactElement => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<Filter>({
		platform: '',
        genre:'',
        tag:'',
		sortBy: '',
	})
	const {data, rests, error } = useFetch(filter)

	const onFilterChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		setFilter(current => ({
			...current,
			[event.target.name]: event.target.value,
		}))
        console.log(event.target.value)
		event.preventDefault()
	}, [])
	console.log(rests)
	const { id, title, thumbnail, short_description, genre, platform, isOpen, tag, sortBy } = content	
	const icons = (isOpen: String) =>{
		// const price = String;
		let icon =null
		switch (isOpen) {
			case 'Y':icon = (<Icon style={{backgroundColor: 'green'}}>เปิดอยู่</Icon>)
					break
					case 'N':icon = (<Icon style={{backgroundColor: 'red'}}>ปิดแล้ว</Icon>)
						break
					default:
						break
				}
				return icon
	}
	const prices = (sortBy: Number): String | null =>{
		// const price = String;
		let price =null
		switch (sortBy) {
			case 1:  price=("$"); break;
			case 2:  price="$$"; break;
			case 3: price="$$$";break;
			case 4:  price="$$$$";break;
			default:
				break
		}
		return price

	}
	prices(sortBy)

		
	// const link = `/rest/${id}`
	if (error) {
		return <p>Unable to fetch restaurants</p>
	}
	if (!rests?.length) {
		return <p>No restaurants available</p>
	}
	return (
		<><div className="col">
			<input type="text" placeholder="Search.." onChange={e => {
				setSearchTerm(e.target.value);
			}}></input>
			<RestFilter onChange={onFilterChange} />
		</div>
			<div className="col">
				<List>
					{rests.filter((val)=>{
						if (searchTerm == ""){
							return val
						} else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
							return val
						}
					}
					).map((val,key) =>{
						return (
							<StyledLink key={val.id} to={val.link}>
			<Img key={val.id} alt={`${val.title}-logo`} src={thumbnail} />
			<Title >{title}</Title>
			{icons(isOpen)}
			<Description> {prices(sortBy)} | {tag} </Description>
		
			<Details>
				
				<Description>{short_description}</Description>
				<Genre>{genre}</Genre>
				
				
			</Details>
		</StyledLink>
						)
					})}
					{/* {rests.map(rest => (
						<ListItem key={rest.id}>
							<RestCard content={rest} />
						</ListItem>
					))} */}
				</List>
			</div></>
	)
	// return (
	// 	<RestListRender err={error} rests={rests} onFilterChange={onFilterChange} />
	// )
}

export default RestListContainer
