import { useState, useEffect } from 'react'
import ImgCard from '../ImgCard/ImgCard'
import LoadingDots from '../LoadingDots/LoadingDots.js'
import { getPhotos } from '../../API/getPhotos.js'

const DataFeed = () => {
	const [page, setPage] = useState(1)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])
	const [favorit, setFavorit] = useState([])

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

	// const handelClick = idx => {
	// 	console.log('Paklikinau:', idx)
	// 	const clickedItem = items[idx]
	// 	console.log('paklikintas itemas', clickedItem)
	// 	const withUpdatedItem = items.map((item, id) =>
	// 		id === idx ? { ...item, isFavorit: !item.isFavorit } : item
	// 	)
	// 	console.log('Itemai su pakeistu favoritu', withUpdatedItem)
	// 	setItems(prev => [...prev, withUpdatedItem])
	// }
	const handelClick = idx => {
		if (favorit.includes(idx) === true) {
			console.log('Istrintas is favoritu: ', idx)
			const deletedFavorit = favorit.filter(value => value !== idx)
			setFavorit(prev => [...deletedFavorit])
			// console.log('Favoritai po istrinimoo: ', favorit)
		} else {
			console.log('Pridetas prie favoritu: ', idx)
			setFavorit(prev => [...prev, idx])
			// console.log('Favoritai po proidejimo: ', favorit)
		}
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
					const updatedItems = newItems.map(item => ({
						...item,
						isFavorit: false,
					}))

					setItems(prev => [...prev, ...updatedItems])
				},

				error => {
					setIsLoaded(true)
					setError(error)
				}
			)

		window.addEventListener('scroll', testScroll)
		return () => window.removeEventListener('scroll', testScroll)
	}, [page])

	useEffect(() => {
		let data = []
		data = localStorage.getItem('favorits')
		const favoritai = JSON.parse(data)
		setFavorit(favoritai)
	}, [])

	useEffect(() => {
		localStorage.setItem('favorits', JSON.stringify(favorit))
		console.log('Favoritai is use effecto: ', favorit)
	})

	if (error) {
		return <div>Error: {error.message}</div>
	} else if (!isLoaded) {
		return <LoadingDots />
	} else {
		return (
			<>
				{items.map((item, i) => (
					<ImgCard
						itemData={item}
						handelClick={() => handelClick(i)}
						favorit={favorit.includes(i)}
					/>
				))}

				{isLoaded ? <LoadingDots /> : <div></div>}
			</>
		)
	}
}

export default DataFeed
