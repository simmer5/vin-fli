import { useState, useEffect } from 'react'
import { getPhotos } from '../../API/getPhotos.js'

const DataFeed = () => {
	const [page, setPage] = useState(1)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])
	const [favorits, setFavorits] = useState([])

	// useEffect(() => {
	// 	const loadPhotos = async () => {
	// 		setIsLoaded(true)
	// 		const newItems = await getPhotos(page)
	// 		setItems(prev => [...prev, ...newItems])
	// 		console.log('Ka turim', newItems)
	// 		setIsLoaded(false)
	// 	}

	// 	loadPhotos()
	// }, [page])
	const showFavorits = () => {}
	const handelClick = id => {
		console.log('Paklikinau:', id)
		setFavorits(prev => [...prev, items[id]])
		console.log(favorits)
	}

	const testScroll = e => {
		const scrollHeight = e.target.documentElement.scrollHeight
		const currentHeight = Math.ceil(
			e.target.documentElement.scrollTop + window.innerHeight
		)
		if (currentHeight + 5 >= scrollHeight) {
			console.log('Pasiektas dugnas...', page)
			setPage(prev => prev + 1)
			console.log('itemai', items)
		}
	}

	useEffect(() => {
		fetch(
			`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLI_KEY}&user_id=13980928%40N03&extras=owner_name%2C+o_dims%2C+views%2C+url_z%2C+&per_page=9&page=${page}&format=json&nojsoncallback=1`
		)
			.then(res => res.json())
			.then(
				result => {
					setIsLoaded(true)
					const newItems = result.photos.photo
					setItems(prev => [...prev, ...newItems])
				},

				error => {
					setIsLoaded(true)
					setError(error)
				}
			)

		window.addEventListener('scroll', testScroll)
		return () => window.removeEventListener('scroll', testScroll)
	}, [page])

	if (error) {
		return <div>Error: {error.message}</div>
	} else if (!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<div
				// onScroll={handleScroll}
				style={{
					background: 'green',
					// height: '800px',
					margin: '0 auto',
					// overflow: 'auto',
				}}
			>
				{items.map((item, i) => (
					<div
						onClick={() => handelClick(i)}
						key={item.id}
						style={{
							height: '50vh',
							width: '30vw',
							backgroundImage: `url("${item.url_z}")`,
							margin: 3,
						}}
					>
						{i + 1}. {item.title}
					</div>
				))}
				{isLoaded ? <div>Loading...</div> : <div></div>}
			</div>
		)
	}
}

export default DataFeed
