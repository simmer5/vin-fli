import React from 'react'
import styles from './LoadingDots.module.css'

const LoadingDots = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
		</div>
	)
}

export default LoadingDots
