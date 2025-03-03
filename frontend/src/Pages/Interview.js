import React, { useContext, useEffect } from 'react'
import "./Interview.css"
import NewsContext from '../Context/News/NewsContext';
import InterviewItem from '../Components/InterviewItem';
import AllNewsLoader from '../Components/AllNewsLoader';

const Interview = ({ showAddMenu }) => {

    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);

    useEffect(() => {
        fetchPageSpecificNews("INTERVIEW");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Interview";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <AllNewsLoader />; // Handle case when news is not yet available
    }


    return (
        <div className={`interview ${showAddMenu ? "showMenu" : ""}`}>
            <div className="interviewContainer">
                <h3>Interview</h3>
                <hr />
                <div className="interviewContainerInner">
                    {pageNews.map((iNews) => {
                        return <InterviewItem key={iNews._id} iNews={iNews} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Interview
