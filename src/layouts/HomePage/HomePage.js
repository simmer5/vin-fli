import React from 'react'
import styles from './homePage.module.css'
import DataFeed from '../../components/DataFeed/DataFeed'

const HomePage = () => {
	return (
		<div className={styles.container}>
			<DataFeed />
		</div>
	)
}

export default HomePage
