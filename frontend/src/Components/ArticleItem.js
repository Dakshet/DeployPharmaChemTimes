import React from 'react'
import "../Pages/Article.css"
import { useNavigate } from 'react-router-dom';

const ArticleItem = ({ aNews }) => {

    const navigate = useNavigate();

    const handleClick = (id, tag) => {
        navigate(`/${(tag).toLowerCase()}/${id}`);
    }


    //Date Formatting
    const date = new Date(aNews.createdAt);

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
        <div onClick={() => handleClick(aNews._id, aNews.tag)} className="articleParticularBox">
            <img src={aNews.coverImageURL} alt="" />
            <div className="articleParticularInner">
                <h5>{aNews.title.split(" ").slice(0, 10).join(" ") + "..."}</h5>
                <div className="articleParticularTimeDate">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem
