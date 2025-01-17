import React, { useCallback, useContext } from 'react'
import "./ADPageItem.css"
import { useNavigate } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';

const ADPageItem = ({ adS, showAlert }) => {

    const navigate = useNavigate();
    const { deleteNews } = useContext(NewsContext);


    const handleDelete = useCallback((id, coverImage, tag) => {
        // navigate(`/add/advertisement`);
        showAlert("Deleted AD Successfully!", "success");
        deleteNews(id, coverImage, tag)
    }, [deleteNews, showAlert])


    //Date Formatting
    const date = new Date(adS.createdAt);

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
        <div className="adPageBox">
            <i onClick={() => handleDelete(adS._id, adS.coverImageURL, adS.tag)} className={`ri-close-line closeIcon`} />
            <img src={adS.coverImageURL} alt="" />
            <div className="adPageItemBoxInner">
                <h5>{adS.body}</h5>
                <div className="adPageItemBoxInnerTimeDate">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>
        </div >
    )
}

export default ADPageItem

