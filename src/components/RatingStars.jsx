import React from 'react'
import { TbStar, TbStarHalfFilled, TbStarFilled } from "react-icons/tb";

function RatingStars({ rating }) {
    const stars = []

    const fullStars = Math.floor(rating)
    const hasHalf = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

    for (let i = 0; i < fullStars; i++) {
        stars.push(<TbStarFilled key={`full-${i}`} className="fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalf) {
        stars.push(<TbStarHalfFilled key="half" className="fill-yellow-400 text-yellow-400" />)
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<TbStar key={`empty-${i}`} className="text-gray-300" />)
    }

    return <div className="flex gap-1 mb-2">{stars}</div>
}

export default RatingStars