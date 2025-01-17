import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoToPreviousePage = () => {
    const navigate = useNavigate();
    return (
        <div className='goToPreviousePage'>
            <i
                className="ri-arrow-left-line go-back-arrow"
                onClick={() => navigate(-1)} // Navigate to the previous page
                title="Go Back"
            ></i>
        </div>
    )
}

export default GoToPreviousePage
