import React from 'react'
import styles from './homePage.module.css'
import Gallery from '../../components/Gallery/Gallery'

const HomePage = () => {
	return (
		<div className={styles.container}>
			<Gallery />
		</div>
	)
}

export default HomePage
