import React, { useCallback, useContext } from 'react'
import "./ADPageItem.css"
import NewsContext from '../Context/News/NewsContext';

const ADPageItem = ({ adS, showAlert }) => {


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
            <i onClick={() => handleDelete(adS._id, adS.tag)} className={`ri-close-line closeIcon`} />
            {/* <img src={adS.coverImageURL} alt="" /> */}
            {adS.coverImageURL ? (
                <img
                    src={`${adS.coverImageURL}`}
                    alt="User"
                />
            ) : (
                <p>Loading image...</p>
            )}
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

