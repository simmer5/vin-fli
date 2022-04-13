import React from 'react'

import styles from './imgCard.module.css'

const ImgCard = ({ itemData, favorit, handelClick }) => {
	const { title, views, url_z } = itemData

	const cardStyle = {
		backgroundImage: `url("${url_z}")`,
		backgroundSize: 'cover',
		margin: '1rem',
		borderRadius: '15px',
		width: '30%',
		height: '50vh',
	}
	return (
		<div className={styles.card} style={cardStyle}>
			<div className={styles.cardContent}>
				<h3 className={styles.title}>{title}</h3>
				<div>
					<hr className={styles.customLine} />
				</div>
				<p className={styles.views}>
					Views
					<br />
					{views}
				</p>

				<div className={styles.favBtn} onClick={handelClick}>
					{favorit ? <span>Favourite</span> : <span>Add to favourite</span>}
				</div>
			</div>
		</div>
	)
}

export default ImgCard
