import { useState, useEffect } from 'react'
import axios from 'axios'
import { Rest } from 'types'
// import { API_HOST, API_KEY } from './constants'
import { Filter } from 'components/RestList/types'

type Response = {
	rests: Rest[]
	error: string
}

const useFetch = (params: Filter): Response => {
	const [rests, setRests] = useState<Rest[]>([])
	const [err, setErr] = useState<string>('')
	const { platform, genre, tag, sortBy } = params

	useEffect(() => {
		axios
			.get('./data.json'
            // ,{
			// 	baseURL: `https://${API_HOST}/api`,
			// 	headers: {
			// 		'x-rapidapi-key': API_KEY,
			// 		'x-rapidapi-host': API_HOST,
			// 	},
			// 	params: {
			// 		platform,
			// 		category: genre,
			// 		tag,
			// 		'sort-by': sortBy,
			// 	},
			// }
            )
			.then(res => {
                console.log(res.data)
                setRests(res.data.data)})
			.catch(e => setErr(e.message))
	}, [platform, genre, tag, sortBy])

	return {
		rests,
		error: err,
	}
}

export default useFetch
