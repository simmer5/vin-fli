import React from 'react'

import styles from './imgCard.module.css'

const ImgCard = ({ itemData, favorit, handelClick }) => {
	const { title, views, url_z } = itemData

	return (
		<div className={styles.galleryItem}>
			<img loading='lazy' src={url_z} alt={title} />
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
					{favorit ? <span>Favorite</span> : <span>Add to favorite</span>}
				</div>
			</div>
		</div>
	)
}

export default ImgCard
