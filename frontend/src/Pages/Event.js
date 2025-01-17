import React, { useContext, useEffect } from 'react'
import "./Event.css"
import NewsContext from '../Context/News/NewsContext';
import EventItem from '../Components/EventItem';

const Event = ({ showAddMenu }) => {

    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);

    useEffect(() => {
        fetchPageSpecificNews("EVENT");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Event";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <div className={`event  ${showAddMenu ? "showMenu" : ""}`}>
            <div className="eventContainer">
                <h3>Event</h3>
                <hr />
                <div className="eventContainerInner">
                    {pageNews.map((eNews) => {
                        return <EventItem key={eNews._id} eNews={eNews} />
                    })}

                </div>
            </div>
        </div>
    )
}

export default Event
