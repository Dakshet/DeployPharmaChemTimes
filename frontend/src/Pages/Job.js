import React, { useContext, useEffect } from 'react'
import "./Event.css"
import NewsContext from '../Context/News/NewsContext';
import EventItem from '../Components/EventItem';
import AllNewsLoader from '../Components/AllNewsLoader';

const Event = ({ showAddMenu }) => {

    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);

    useEffect(() => {
        fetchPageSpecificNews("JOB");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Jobs";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <AllNewsLoader />; // Handle case when news is not yet available
    }


    return (
        <div className={`event ${showAddMenu ? "showMenu" : ""}`}>
            <div className="eventContainer">
                <h3>Job</h3>
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
