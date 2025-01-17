
import React, { useContext, useEffect, useState } from 'react';
import "./News.css";
import NewsContext from '../Context/News/NewsContext';
import NewsItem from '../Components/NewsItem';
import { useNavigate } from 'react-router-dom';

const News = ({ showAddMenu }) => {
    const navigate = useNavigate();
    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Number of news items per page

    useEffect(() => {
        fetchPageSpecificNews("NEWS");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - News"; // Set the document title to the news title
    }, []);

    const handleClick = (id, tag) => {
        navigate(`/${(tag).toLowerCase()}/${id}`);
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formattedTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).replace(/\u202f/g, ' ');
    };

    if (!pageNews || pageNews.length === 0) {
        return <div className="circle"></div>; // Handle case when news is not yet available
    }

    // Pagination logic
    const totalItems = pageNews.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = pageNews.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`news  ${showAddMenu ? "showMenu" : ""}`}>
            <div className="newsContainer">
                <h3>News</h3>
                <hr />
                <div className="newsContainerInner">
                    {paginatedNews.map((pNews, index) => (
                        <div
                            key={pNews._id}
                            onClick={() => handleClick(pNews._id, pNews.tag)}
                            className={index === 0 ? "newsParticularBoxFirst" : "newsParticularBox"}
                        >
                            <img src={pNews.coverImageURL} alt="" />
                            <h5>{pNews.title.split(" ").slice(0, 18).join(" ") + "..."}</h5>
                            <div className="newsParticularTimeDateFirst">
                                <p>{formattedDate(pNews.createdAt)}</p>
                                <p>{formattedTime(pNews.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='paginationInnerBtns'
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='paginationInnerBtns'
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default News;
