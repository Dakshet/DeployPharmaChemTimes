import React, { useContext } from 'react'
import "../Pages/Magazine.css"
import NewsContext from '../Context/News/NewsContext';

const MagazineItem = ({ mNews, showAlert }) => {

    const { deleteMagazine } = useContext(NewsContext)


    const handleClick = (body) => {
        window.open(`${body}`, "_blank", "noreferrer");
    }


    const handleDelete = (id, coverImageURL, body) => {
        showAlert("Deleted News Successfully!", "success");
        deleteMagazine(id, coverImageURL, body);
    }


    //Date Formatting
    const date = new Date(mNews.createdAt);

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
        <div className="magazineParticularBoxOuter">
            <div onClick={() => handleClick(mNews.body)} className="magazineParticularBox">
                <img src={mNews.coverImageURL} alt="" />
                <h5>{mNews.title.split(" ").slice(0, 10).join(" ") + "..."}</h5>
                <div className="magazineParticularTimeDate">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>
            <i className="ri-close-line closeIcon" onClick={() => handleDelete(mNews._id, mNews.coverImageURL, mNews.body)}></i>
        </div>

    )
}

export default MagazineItem
