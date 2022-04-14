import { useState, useEffect } from 'react'

const useFetch = url => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)

		fetch(url)
			.then(res => res.json())
			.then(data => {
				setData(prev => [...prev, ...data.photos.photo])
			})
			.catch(err => setError(err))
			.finally(() => setLoading(false))
	}, [url])

	return { data, loading, error }
}

export default useFetch
