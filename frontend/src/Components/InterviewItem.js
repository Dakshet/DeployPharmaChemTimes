import React from 'react'
import "../Pages/Interview.css"
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const InterviewItem = ({ iNews }) => {

    const navigate = useNavigate();

    const handleClick = (id, tag) => {
        navigate(`/${(tag).toLowerCase()}/${id}`);
    }


    //Responsiveness
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    // const isMediumScreen = useMediaQuery({ query: '(max-width: 900px)' });
    // const isLargeScreen = useMediaQuery({ query: '(min-width: 901px) and (max-width: 1200px)' });
    const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 1000px)' });

    let wordCount;
    if (isSmallScreen) {
        wordCount = 8;
    } else if (isExtraLargeScreen) {
        wordCount = 30;
    }


    //Date Formatting
    const date = new Date(iNews.createdAt);

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
        <div onClick={() => handleClick(iNews._id, iNews.tag)} className="interviewParticularBox">
            <img src={iNews.coverImageURL} alt="" />
            <div className="interviewParticularInner">
                <h5>{iNews.title.split(" ").slice(0, wordCount).join(" ") + "..."}</h5>
                <div className="interviewParticularTimeDate">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>
        </div>
    )
}

export default InterviewItem
