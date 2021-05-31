import React, { ChangeEvent, ReactElement, useCallback, useState, useEffect } from 'react'
import useFetch from 'hooks/useFetch'
import { Filter } from './types'
import './index.css';
import { List, ListItem } from './styles';
import {
	StyledLink,
	Img,
	Title,
	Details,
	Description,
	Icon,
	Genre,
} from 'components/RestCard/styles';
import { PLATFORMS, GENRES, TAGS, SORT_BY } from 'components/RestFilter/constants'
import { Form, Label } from 'components/RestFilter/styles'


const RestListContainer = (): ReactElement => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filter, setFilter] = useState<Filter>({
		platform: '',
        genre:'',
        tag:'',
		sortBy: '',
	})
	
	const {data, rests, error } = useFetch()
	
	const onFilterChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		if (filter.platform=='All categories'){filter.genre='';}
		setFilter(current => ({
			...current,
			[event.target.name]: event.target.value,
		}))
        console.log(event.target.value)
		event.preventDefault()

	}, [])

	console.log(rests)
	const icons = (isOpen: String) =>{
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
		let price =null
		switch (sortBy) {
			case 1:  price="$"; break;
			case 2:  price="$$"; break;
			case 3: price="$$$";break;
			case 4:  price="$$$$";break;
			default:
				break
		}
		return price

	}
	const genVal = (platform:string): number  =>{
		let idx =0
		switch (platform.trim()) {
			case "All categories":  idx=0; break;
			case "ร้านอาหารและเครื่องดื่ม":  idx=1; break;
			case "ร้านค้า OTOP": idx=2; break;
			case "ร้านธงฟ้า": idx=3;break;
			case "สินค้าทั่วไป":  idx=4;break;
			default:
				break
		}
		return idx
	}
	if (error) {
		return <p className="text-center">Unable to fetch restaurants</p>
	}
	if (!rests?.length) {
		return <div className="text-center"><p >No restaurants available</p></div>
	}
	return (
		<div className="bg-none">
		
		<div className="col">
			<div className="mt-1 flex rounded-md shadow-sm m-5 mt-10">
				<span className="flex rounded-md shadow-sm  bg-gray-100">
					<span className="inline-flex items-center rounded-l-md text-gray-800 text-sm">
                   <svg className="w-5 h-5 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" 
			strokeWidth={2} 
			d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  
	
                  </span>
				  <Form className="bg-gray-100 mb-10"onChange={onFilterChange}> 
				  <select className="inline-flex items-center px-8 bg-gray-100 text-gray-500 text-sm" name="tag" id="tag-select">
				  <option value="">ทุกพื้นที่</option>
						{TAGS.map(tag => (
							<option key={tag.value} value={tag.value}>
								{tag.value}
							</option>
						))}
			</select></Form></span>
			
				 
			
				<input className="bg-white-200 
				appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 
				text-gray-700 leading-tight focus:outline-none focus:bg-white 
				focus:border-purple-500" id="inline-full-name" type="text" placeholder="Search..." onChange={e => {
					setSearchTerm(e.target.value);}}>
			</input>
  	 		</div>
			<div className="col flex bg-blue-900 text-white p-3 px-10 align-self-left-center">หน้าแรก / ค้นหา</div>
			
			<div className=" mb-10 mt-5">
			<strong className="py-10 px-10">ผลการค้นหา </strong>
			<Form onChange={onFilterChange}>
				<div className="flex flex-row">
				<Label htmlFor="platform-select">
					ประเภทร้านค้า:
					<select name="platform" 
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

>
						{PLATFORMS.map(platform => 
							(
							<option key={platform.value} value={platform.value}>
								{platform.display}
							</option>
						)
							)}
					</select>
				</Label>
								
				<Label htmlFor="genre-select">
					ประเภท:
					<select name="genre" id="genre-select"
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					
					>
						<option value="">ทั้งหมด</option>
						
						{GENRES[genVal(filter.platform)].map(genre => 
							// if (genre.platform == plat)
							
								(<option key={genre.value} value={genre.value}>
								{genre.value}
							</option>)
							
							
						)}
					</select>
				</Label>

				<Label htmlFor="tag-select">
					จังหวัด/ใกล้ฉัน:
					<select 
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					
					name="tag" id="tag-select">
						<option value="">ทุกพื้นที่</option>
						{TAGS.map(tag => (
							<option key={tag.value} value={tag.value}>
								{tag.value}
							</option>
						))}
					</select>
				</Label>

				<Label htmlFor="sortBy-select">
					ราคา:
					<select
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					name="sortBy" id="sortBy-select">
					<option value="">กรุณาเลือก</option>
						{SORT_BY.map(sortBy => (
							<option key={sortBy.value} value={sortBy.value}>
								{sortBy.display}
							</option>
						))}
					</select>
				</Label>
			</div>
			</Form>
			</div>
		</div>
			<div className="row">
				<List>
					{rests.filter((val)=>{
						
						return val
					})
					.filter((val)=>{
						console.log('check search')
						console.log(filter,val)
					
						if (searchTerm == "" ) {return val}
						else {
							console.log('check search not empty');
							console.log(filter,val);
							return val? val.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;}
					})
					.filter((val)=>{
						console.log('check platform');
							console.log(filter,val);
						if (filter.platform== '' || filter.platform == "All categories"){return val}
						else {
							console.log('check platform not empty');
							console.log(filter,val);
							return val? val.platform == filter.platform : true;}
					})
					.filter((val)=>{
						console.log('check genre');
							console.log(filter,val);
						console.log(val.genre == filter.genre)
						if (filter.genre== ''){return val}
						else{return val? val.genre == filter.genre : true}
					})
					.filter((val)=>{
						if (filter.tag== ''){return val}
						else{return val? val.tag == filter.tag: true}
					})
					.filter((val)=>{
						if (filter.sortBy== ''){return val}
						else{return val? val.sortBy.toString() == filter.sortBy : true}
					})
					.map((val,key) =>{
						console.log('map')
						console.log(val)
						return (
							<ListItem >
							<StyledLink key={val.id} to={`/rest/${val.id}`}>
			<Img key={val.id} alt={`${val.title}-logo`} src={val.thumbnail} />
			<Title >{val.title}</Title>
			{icons(val.isOpen)}
			<Description> {prices(val.sortBy)} | {val.tag} </Description>
		
			<Details>
				
				<Description>{val.short_description}</Description>
				<Genre>{val.genre}</Genre>
				
				
			</Details>
		</StyledLink>
		</ListItem>
						)
					})}
					
					
				</List>
			</div>
		</div>
	)

}

export default RestListContainer
