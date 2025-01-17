import React, { useContext, useState } from 'react'
import "./SearchBar.css"
import NewsContext from '../Context/News/NewsContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ showSearch, setShowSearch }) => {

    const navigate = useNavigate();

    const { fetchSearchNews } = useContext(NewsContext);

    const [searchNews, setSearchNews] = useState("");

    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         if (searchNews) {
    //             fetchSearchNews(searchNews);
    //         }
    //     }, 300);   //300ms delay

    //     return () => {
    //         clearTimeout(handler); // Clear timeout if user types again before 300ms
    //     }
    // }, [searchNews, fetchSearchNews])

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSearch(false);
        fetchSearchNews(searchNews);
        navigate("/search/news")
    }

    // const handleSearchInput = (e) => {
    //     setSearchNews(e.target.value);
    // }
    return (
        <div className={`${showSearch ? "searchBar" : "hideSearchBar"}`}>
            <div className="searchBarInner">
                <form action="" onSubmit={handleSubmit}>
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
