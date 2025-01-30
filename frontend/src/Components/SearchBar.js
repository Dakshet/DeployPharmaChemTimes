import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';
import "./SearchBar.css"

const SearchBar = ({ showSearch, setShowSearch }) => {

    const navigate = useNavigate();
    const { fetchSearchNews } = useContext(NewsContext);
    const [searchNews, setSearchNews] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedQuery = searchNews.trim();
        setShowSearch(false);
        if (!trimmedQuery) return; // Prevent empty searches


        fetchSearchNews(trimmedQuery);
        navigate("/search/news")
    }

    return (
        <div className={`searchBar ${showSearch ? "visible" : "hideSearchBar"}`}>
            <div className="searchBarInner">
                <form onSubmit={handleSubmit}>
                    <input id='inputSearch' type="text" placeholder='Search' onChange={(e) => setSearchNews(e.target.value)} />
                    {/* <input id='inputSearch' type="text" placeholder='Search' value={searchNews} onChange={handleSearchInput} /> */}
                    <button type='submit'>
                        <i className="ri-search-line"></i>
                    </button>
                </form>
            </div>
        </div >
    )
}

export default SearchBar
