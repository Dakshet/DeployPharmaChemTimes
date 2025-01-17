import React, { useContext, useEffect, useState } from 'react'
import NewsContext from '../Context/News/NewsContext'
import "./SpecificNews.css"
import { useLocation, useNavigate } from "react-router-dom"
import UpdateNews from '../Components/UpdateNews'
import Comments from '../Components/Comments'
import SpecificNewsInner from '../Components/SpecificNewsInner'
import GoToPreviousePage from '../Components/GoToPreviousePage'

const SpecificNews = ({ showAddMenu, showAlert }) => {

    const shareUrl = window.location.href;
    // const shareUrl = "https://www.youtube.com";
    const navigate = useNavigate();
    const location = useLocation();
    const { specificNews, getNewsUsingId, deleteNews } = useContext(NewsContext);
    const [currentNews, setCurrentNews] = useState();
    const [updateModal, setUpdateModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);



    //Method call when we go to the new route
    useEffect(() => {
        getNewsUsingId(location.pathname.split("/")[2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        if (specificNews?.title) {
            document.title = specificNews.title;  // Set the document title to the news title
        } else {
            document.title = "INDUSTRIAL TIMES";  // Default title if the news title is not available
        }
    }, [specificNews]);



    //Delete news
    const handleDeleteNews = (news) => {
        showAlert("Deleted News Successfully!", "success");
        navigate(`/${(news.tag).toLowerCase()}`);
        deleteNews(news._id, news.coverImageURL);
    }


    //Update News
    const handleUpdateNews = (currentNew) => {
        setCurrentNews(currentNew);
        setUpdateModal(true);
    }



    if (!specificNews || specificNews.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }


    return (
        <>
            {/* Set dynamic meta tags */}
            {/* <Helmet>
                <title>{specificNews.title}</title>
                <meta property="og:title" content={specificNews.title} />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:description" content={specificNews.title} /> */}
            {/* <meta property="og:image" content={specificNews.coverImageURL || "http://res.cloudinary.com/dpkaxrntd/image/upload/v1727242172/df85jrwmbue1cjymxoc4.jpg"} /> */}
            {/* <meta property="og:type" content="website" />
                <meta property="og:image" content={"http://res.cloudinary.com/dpkaxrntd/image/upload/v1727242172/df85jrwmbue1cjymxoc4.jpg"} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
            </Helmet> */}


            {/* {console.log(specificNews.coverImageURL)} */}


            <GoToPreviousePage />
            <UpdateNews showAlert={showAlert} currentNews={currentNews} updateModal={updateModal} setUpdateModal={setUpdateModal} />

            <SpecificNewsInner
                title={specificNews.title}
                shareUrl={shareUrl}
                body={specificNews.body}
                image={specificNews.coverImageURL}
                showAddMenu={showAddMenu}
                handleDeleteNews={handleDeleteNews}
                handleUpdateNews={handleUpdateNews}
                shareModal={shareModal}
                setShareModal={setShareModal}
                specificNews={specificNews}
            />

            <Comments showAlert={showAlert} />
        </>
    )
}

export default SpecificNews
