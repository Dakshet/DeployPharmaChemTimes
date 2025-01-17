import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './AdSection.css';
import backIcon from '../Images/back-icon.png';
import nextIcon from '../Images/next-icon.png';
import NewsContext from '../Context/News/NewsContext';
import { useLocation } from 'react-router-dom';

const AdSection = ({ showProfile }) => {
    const slider = useRef();
    // const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { seeAds, fetchPageSpecificNews } = useContext(NewsContext);
    const hideOnRoutes = ['/', '/news', '/article', '/interview', '/event', '/job', '/magazine']
    const location = useLocation();
    const showAds = hideOnRoutes.includes(location.pathname); // Determine ad visibility based on the route


    const handleNextBtn = useCallback(() => {
        if (seeAds.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % seeAds.length);
    }, [seeAds])

    const handleBackBtn = useCallback(() => {
        if (seeAds.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + seeAds.length) % seeAds.length);
    }, [seeAds])


    useEffect(() => {
        fetchPageSpecificNews("AD");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fetch seeAds from the database
    // useEffect(() => {
    //     // Simulating a database fetch
    //     const fetchSlides = async () => {
    //         // Replace this with your API call to fetch seeAds
    //         const fetchedSlides = [{
    //             ad: ad10, link: "https://www.google.com"
    //         }, {
    //             ad: ad11, link: "https://www.facebook.com"
    //         }, {
    //             ad: ad12, link: "https://www.instagram.com"
    //         }, {
    //             ad: ad13, link: "https://www.linkedin.com"
    //         }, {
    //             ad: ad5, link: "https://www.amazon.com"
    //         }, {
    //             ad: ad8, link: "https://www.ebay.com"
    //         }, {
    //             ad: ad4, link: "https://www.youtube.com"
    //         }];
    //         setSlides(fetchedSlides);
    //     };

    //     fetchSlides();
    // }, []);

    useEffect(() => {
        if (seeAds.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % seeAds.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [seeAds]);

    // console.log(currentIndex)

    return (
        <>
            {seeAds.length > 0 && showAds &&
                (
                    <div className={`${showProfile ? "showProfileSectionForAd" : ""}`}>
                        <div className="adSection">
                            <img src={backIcon} alt="Back" id='backIcon' className='adBtn' onClick={handleBackBtn} />
                            <div className="slider" ref={slider}>
                                {seeAds.map((slide, index) => (
                                    <div
                                        className="slide"
                                        key={index}
                                        style={{
                                            transform: `translateX(${-currentIndex * 100}%)`,
                                        }}
                                    >
                                        <a href={slide.body} target="_blank" rel="noopener noreferrer">
                                            <img src={slide.coverImageURL} alt={`Advertisement ${index + 1}`} />
                                            <p className='adImageBtn'>Click For More Details</p>
                                        </a>

                                    </div>
                                ))}
                            </div>
                            <img src={nextIcon} alt="Next" id='nextIcon' className='adBtn' onClick={handleNextBtn} />
                        </div>
                    </div >)
            }
        </>
    );
};

export default AdSection;
