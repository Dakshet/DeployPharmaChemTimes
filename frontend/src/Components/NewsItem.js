import React from 'react'
import "../Pages/News.css"
import { useNavigate } from 'react-router-dom';

const NewsItem = ({ pNews }) => {

    const navigate = useNavigate();

    const handleClick = (id, tag) => {
        navigate(`/${(tag).toLowerCase()}/${id}`);
    }


    //Date Formatting|
    const date = new Date(pNews.createdAt);

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
        <div onClick={() => handleClick(pNews._id, pNews.tag)} className="newsParticularBox">
            <img src={pNews.coverImageURL} alt="" />
            {/* <h5>LEARN TO REST, NOT TO QUIT..........LEARN TO REST, NOT</h5> */}
            <h5>{pNews.title.split(" ").slice(0, 8).join(" ") + "..."}</h5>
            <div className="newsParticularTimeDate">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </div>
    )
}

export default NewsItem
