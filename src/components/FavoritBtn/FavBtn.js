import React from 'react'

const FavBtn = ({ title, handleClick }) => {
	return <div onclick={handleClick}>{title}</div>
}

export default FavBtn
