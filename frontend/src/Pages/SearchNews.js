import React, { useContext, useEffect } from 'react'
import "./SearchNews.css"
import NewsContext from '../Context/News/NewsContext';
import SearchItem from '../Components/SearchItem';

const SearchNews = ({ showProfile, showAddMenu }) => {

    const { searchNewsResult } = useContext(NewsContext);

    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Your Result";  // Set the document title to the news title
    }, []);


    if (!searchNewsResult || searchNewsResult.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <div className={`searchNews ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
            <div className="searchNewsContainer">
                <h3>Your Result</h3>
                <hr />
                <div className="searchNewsContainerInner">
                    {searchNewsResult.map((sNews) => {
                        return <SearchItem key={sNews._id} sNews={sNews} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchNews
