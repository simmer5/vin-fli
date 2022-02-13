import { useState, useEffect } from 'react'
import ImgCard from '../ImgCard/ImgCard'
import LoadingDots from '../LoadingDots/LoadingDots.js'

const DataFeed = () => {
	const [page, setPage] = useState(1)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const [items, setItems] = useState([])
	const [favorit, setFavorit] = useState([])

	const handelClick = idx => {
		if (favorit.includes(idx) === true) {
			const deletedFavorit = favorit.filter(value => value !== idx)
			setFavorit(prev => [...deletedFavorit])
		} else {
			setFavorit(prev => [...prev, idx])
		}
	}
	// ====== Klausimas ==============
	//
	// Niekaip neisgaudau, kodel pasiekus puslapio apacia man page
	//reiksme pasikeicia du ar net tris kartus is eiles ?
	//Scrollinima stebi funkcija testScroll.
	//
	//=========================
	const testScroll = e => {
		const scrollHeight = e.target.documentElement.scrollHeight
		const currentHeight = Math.ceil(
			e.target.documentElement.scrollTop + window.innerHeight
		)
		if (scrollHeight <= currentHeight + 10) {
			setPage(prev => prev + 1)
			console.log('Pasiektas dugnas...', page)
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
					console.log('1. logas is pirmo UseEffecto')
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
	}, [favorit])

	if (error) {
		return <div>Error: {error.message}</div>
	} else if (!isLoaded) {
		return <LoadingDots />
	} else {
		return (
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flex: ' 1 1 23%',
					margin: '1rem',
					padding: '1rem',
					maxWidth: '80%',
					justifyContent: 'space-between',
				}}
			>
				{items.map((item, i) => (
					<ImgCard
						itemData={item}
						handelClick={() => handelClick(i)}
						favorit={favorit.includes(i)}
						key={item.id}
					/>
				))}

				{isLoaded ? <LoadingDots /> : <div></div>}
			</div>
		)
	}
}

export default DataFeed
