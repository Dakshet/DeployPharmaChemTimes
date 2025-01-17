import React from 'react'
import "../Pages/SpecificNews.css"
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive'
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon
} from "react-share";
import { useSelector } from 'react-redux';

const SpecificNewsInner = ({ title, shareUrl, body, image, showAddMenu, handleDeleteNews, handleUpdateNews, shareModal, setShareModal, specificNews }) => {

    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;

    //Adjust height of share icon.
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    // const isMediumScreen = useMediaQuery({ query: '(max-width: 900px)' });
    // const isLargeScreen = useMediaQuery({ query: '(min-width: 901px) and (max-width: 1200px)' });
    const isExtraLargeScreen = useMediaQuery({ query: '(min-width: 600px)' });

    let size;
    if (isSmallScreen) {
        size = 30;
    } else if (isExtraLargeScreen) {
        size = 40;
    }


    //Date Formating Here   
    const date = new Date(specificNews.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(/\u202f/g, ' ');



    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={title} />
                <meta property="og:url" content={shareUrl} />
                <meta property="og:description" content={body} />
                <meta property="og:type" content="news" />
                <meta property="og:image" content={image} />
            </Helmet>

            <div className={`specificNews ${showAddMenu ? "showMenu" : ""}`}>
                <div className="specificNewsInner">
                    <h1>{title}</h1>
                    <div className="specificTimeZone">
                        <p>Updated:</p>
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                    </div>
                    <img className='specificNewsImage' src={image} alt="" />
                    {/* <pre className='specificPara'>{body}</pre> */}
                    <p className='specificPara' dangerouslySetInnerHTML={{ __html: body }}></p>
                    <div className="specificIcon">
                        <div className="specificIconInner">
                            <i onClick={() => handleUpdateNews(specificNews)} className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" && userLoginRedux._id === specificNews.createdUser ? ("ri-edit-box-line hoverIcon") : "")}`}></i>
                            <p className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? "hoverText" : "hideLogin")}`}>Edit</p>
                        </div>
                        <div className="specificIconInner">
                            <i onClick={() => setShareModal(!shareModal)} className="ri-share-line hoverIcon"></i>
                            <p className='hoverText'>Share</p>
                        </div>
                        <div className="specificIconInner">
                            <i onClick={() => { handleDeleteNews(specificNews) }} className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" && userLoginRedux._id === specificNews.createdUser ? ("ri-delete-bin-6-line hoverIcon") : "")}`}></i>
                            <p className={`${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? "hoverText" : "hideLogin")}`}>Delete</p>
                        </div>

                        <div className={`${shareModal ? "shareOption" : "hideSocialMenu"} `}>

                            <FacebookShareButton url={shareUrl} title={body} hashtag={"#title"}>
                                <FacebookIcon size={size} round={true} />
                            </FacebookShareButton>

                            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                                <WhatsappIcon size={size} round={true} iconFillColor="white" style={{ marginLeft: "10px" }} />
                            </WhatsappShareButton>

                            <TwitterShareButton url={shareUrl} title={title} hashtag="news">
                                <TwitterIcon size={size} round={true} iconFillColor="white" style={{ marginLeft: "10px" }} />
                            </TwitterShareButton>

                            <EmailShareButton url={shareUrl} subject="Share this news" body={`Check out this news: ${title}`}>
                                <EmailIcon size={size} round={true} style={{ marginLeft: "10px" }} />
                            </EmailShareButton>
                        </div>
                    </div>

                </div>
                <hr />
            </div >
        </>

    )
}

export default SpecificNewsInner
