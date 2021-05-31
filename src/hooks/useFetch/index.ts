import { useState, useEffect } from 'react'
import { Rest } from 'types'

type Response = {
	rests: Rest[]
	error: string
    data: Rest[]
}

const useFetch = (): Response => {
	const [rests, setRests] = useState<Rest[]>([])
	const [err, setErr] = useState<string>('')
    const [data, setData] = useState<Rest[]>([])
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/suchada-hn/res/main/data2.json')
        .then((response) => response.json())
        .then((responseJson) => {
            setData(responseJson)
            setRests(responseJson)
            console.log('set rests')
           
        })
        .catch((error) => {
            console.error(error);
            setErr(error)
          });
        
        console.log('done');
      },[])


    console.log('final rests')

	return {
        data,
		rests,
		error: err,
	}
}

export default useFetch
