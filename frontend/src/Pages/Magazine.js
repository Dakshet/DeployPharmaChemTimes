import React, { useContext, useEffect } from 'react'
import "./Magazine.css"
import NewsContext from '../Context/News/NewsContext';
import MagazineItem from '../Components/MagazineItem';
import issuuImage from '../Images/issuuImage1.png'
import { Link } from 'react-router-dom';

const Magazine = ({ showAddMenu, showAlert }) => {
    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);


    useEffect(() => {
        fetchPageSpecificNews("MAGAZINE");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Magazine";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <div className={`magazine  ${showAddMenu ? "showMenu" : ""}`}>
            <div className="magazineContainer">
                <div className="magazineHeader">
                    <h3>Magazine</h3>
                    <Link to="https://issuu.com/raigadmat" target='_blank'><img src={issuuImage} alt="" /></Link>
                </div>
                <hr />
                <div className="magazineContainerInner">
                    {pageNews.map((mNews) => {
                        return <MagazineItem key={mNews._id} mNews={mNews} showAlert={showAlert} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Magazine
