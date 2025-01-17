import React, { useContext, useEffect } from 'react'
import "./Event.css"
import NewsContext from '../Context/News/NewsContext';
import ADPageItem from '../Components/ADPageItem';
import { useSelector } from 'react-redux';

const ADPage = ({ showProfile, showAddMenu, showAlert }) => {

    const { seeAds, fetchPageSpecificNews } = useContext(NewsContext);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    useEffect(() => {
        fetchPageSpecificNews("AD");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Advertisement";  // Set the document title to the news title
    }, []);


    if (!seeAds || seeAds.length === 0) {
        return <div className='circle'></div>; // Handle case when news is not yet available
    }

    // console.log(seeAds);

    return (
        <>
            {userLoginRedux.role === "REPORTER" ?
                (
                    <div className={`event ${showProfile ? "userMenu" : ""} ${showAddMenu ? "showMenu" : ""}`}>
                        <div className="eventContainer">
                            <h3>Advertisement</h3>
                            <hr />
                            <div className="eventContainerInner">
                                {seeAds.map((adS) => {
                                    return <ADPageItem showAlert={showAlert} key={adS._id} adS={adS} />
                                })}

                            </div>
                        </div>
                    </div>) : (
                    <h1 style={{ margin: "20px 0px", textAlign: "center" }}>You don't have access of this page</h1>
                )}
        </>
    )
}

export default ADPage
