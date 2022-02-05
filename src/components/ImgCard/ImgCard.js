import React from 'react'
import FavBtn from '../FavoritBtn/FavBtn'
import styles from './imgCard.module.css'

const ImgCard = ({ itemData, favorit, handelClick }) => {
	console.log('Cia Favoritas ar nelabai:', favorit)
	const { title, views, url_z, id } = itemData
	return (
		<div
			key={id}
			className={styles.card}
			style={{
				backgroundImage: `url("${url_z}")`,
			}}
		>
			<div className={styles.cardContent}>
				<h3>{title}</h3>
				<div>
					<hr className={styles.customLine} />
				</div>
				<h5>
					Views
					<br />
					{views}
				</h5>

				<div className={styles.favBtn} onClick={handelClick}>
					{favorit ? <span>Favourite</span> : <span>Add to favourite</span>}
				</div>
			</div>
		</div>
	)
}

export default ImgCard
