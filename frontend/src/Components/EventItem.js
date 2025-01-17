import React from 'react'
import "../Pages/Event.css"
import { useNavigate } from 'react-router-dom';

const EventItem = ({ eNews }) => {

    const navigate = useNavigate();

    const handleClick = (id, tag) => {
        navigate(`/${(tag).toLowerCase()}/${id}`);
    }


    //Date Formatting
    const date = new Date(eNews.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(/\u202f/g, ' ');


    return (
        <div onClick={() => handleClick(eNews._id, eNews.tag)} className="eventParticularBox">
            <img src={eNews.coverImageURL} alt="" />
            <h5>{eNews.title.split(" ").slice(0, 10).join(" ") + "..."}</h5>
            <div className="eventParticularTimeDate">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </div>
    )
}

export default EventItem
