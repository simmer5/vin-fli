import { useState, useEffect } from 'react'
import ImgCard from '../ImgCard/ImgCard'
import LoadingDots from '../LoadingDots/LoadingDots.js'
import useFetch from '../../hooks/useFetch'

const DataFeed = () => {
	const {
		data: items,
		error,
		loading,
	} = useFetch(
		`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLI_KEY}&user_id=13980928%40N03&extras=owner_name%2C+o_dims%2C+views%2C+url_z%2C+&per_page=9&page=1&format=json&nojsoncallback=1`
	)

	const [favorit, setFavorit] = useState([])

	const handelClick = idx => {
		if (favorit.includes(idx) === true) {
			const deletedFavorit = favorit.filter(value => value !== idx)
			setFavorit(prev => [...deletedFavorit])
		} else {
			setFavorit(prev => [...prev, idx])
		}
	}

	useEffect(() => {
		const data = localStorage.getItem('favorits')
		const favoritai = JSON.parse(data)
		console.log('Cia favoritai ', data)
		console.log('Cia type of favoritai ', typeof favoritai)
		setFavorit(favoritai)
	}, [])

	useEffect(() => {
		localStorage.setItem('favorits', JSON.stringify(favorit))
	}, [favorit])

	if (error) <div>Error: {error.message}</div>
	if (loading) <LoadingDots />

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

			{loading ? <LoadingDots /> : <div></div>}
		</div>
	)
}

export default DataFeed
