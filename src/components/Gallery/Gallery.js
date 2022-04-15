import { useState, useEffect, useRef } from 'react'
import ImgCard from '../ImgCard/ImgCard'
import LoadingDots from '../LoadingDots/LoadingDots.js'
import useFetch from '../../hooks/useFetch'
import styles from './gallery.module.css'

const DataFeed = () => {
	const myRef = useRef()

	const [favorit, setFavorit] = useState([])
	const [page, setPage] = useState(1)

	const { data: items } = useFetch(
		`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLI_KEY}&user_id=13980928%40N03&extras=owner_name%2C+o_dims%2C+views%2C+url_z%2C+&per_page=9&page=${page}&format=json&nojsoncallback=1`
	)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const entry = entries[0]
				if (entry.isIntersecting) {
					setPage(prev => prev + 1)
				}
			},
			{ threshold: 1 }
		)
		observer.observe(myRef.current)
	}, [])

	useEffect(() => {
		let data = localStorage.getItem('favorits')
		if (data !== null) {
			const favoritai = JSON.parse(data)
			setFavorit(favoritai)
		}
		if (data === 'null') {
			localStorage.setItem('favorits', '')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('favorits', JSON.stringify(favorit))
	}, [favorit])

	const handelClick = idx => {
		if (favorit.includes(idx) === true) {
			const deletedFavorit = favorit.filter(value => value !== idx)
			setFavorit(prev => [...deletedFavorit])
		} else {
			setFavorit(prev => [...prev, idx])
		}
	}

	return (
		<div className={styles.gallery}>
			{items.map((item, i) => (
				<ImgCard
					itemData={item}
					handelClick={() => handelClick(i)}
					favorit={favorit.includes(i)}
					key={item.id}
				/>
			))}
			<div style={{ width: '100%', alignSelf: 'end' }} ref={myRef}>
				<LoadingDots />
			</div>
		</div>
	)
}

export default DataFeed
