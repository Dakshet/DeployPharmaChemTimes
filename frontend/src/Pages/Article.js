import React, { useContext, useEffect } from 'react'
import "./Article.css"
import NewsContext from '../Context/News/NewsContext';
import ArticleItem from '../Components/ArticleItem';

const Article = ({ showAddMenu }) => {

    const { pageNews, fetchPageSpecificNews } = useContext(NewsContext);

    useEffect(() => {
        fetchPageSpecificNews("ARTICLE");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Article";  // Set the document title to the news title
    }, []);


    if (!pageNews || pageNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }

    return (
        <div className={`article  ${showAddMenu ? "showMenu" : ""}`}>
            <div className="articleContainer">
                <h3>Article</h3>
                <hr />
                <div className="articleContainerInner">
                    {pageNews.map((aNews) => {
                        return <ArticleItem key={aNews._id} aNews={aNews} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Article
