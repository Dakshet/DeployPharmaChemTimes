import React from 'react'
import "./Footer.css"
import { Link, useLocation } from 'react-router-dom'
import location_icon from '../Images/location-icon.png'
import mail_icon from '../Images/mail-icon.png'
import phone_icon from '../Images/phone-icon.png'

const Footer = () => {

    const location = useLocation();

    return (
        <div className='footer'>
            <div className={`${location.pathname === "/" ? "footerPannelOne" : "hideFooter"}`}>
                <div className="footerOneInner">
                    {/* <img className='userIcon' src="https://static.vecteezy.com/system/resources/thumbnails/024/183/525/small/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" alt="" /> */}
                    <div className="footerOneInnerDiv">
                        <h1>Jitendra Nate</h1>
                        <p>Publisher & Managing Director</p>
                        <p>+91 8779345336</p>
                    </div>
                    <div className="footerOneInnerDiv">
                        <h1>Zohra Rozani</h1>
                        <p>Advertising Sales Director</p>
                        <p>+91 9860066753</p>
                    </div>
                    <div className="footerOneInnerDiv">
                        <h1>Rajiv</h1>
                        <p>Business Developer</p>
                        <p>+91 7208209653</p>
                    </div>
                    <div className="footerOneInnerDiv">
                        <h1>Anurag More</h1>
                        <p>Sub-Editor & Event Head</p>
                        <p>+91 9860443862</p>
                    </div>
                </div>
                <div className="footerOneInnerMenuList">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/article">Article</Link></li>
                        <li><Link to="/interview">Interview</Link></li>
                        <li><Link to="/event">Event</Link></li>
                        <li><Link to="/magazine ">Magazine</Link></li>
                    </ul>
                </div>
                <div className="footerOneInnerx">
                    <ul>
                        <li><img src={mail_icon} alt="" />pharmachemtimes@gmail.com</li>
                        <li><img src={phone_icon} alt="" />+91 8779345336</li>
                        <li><img src={location_icon} alt="" />Shop No. 6, Deep Divine 5, Plot No. - 21,<br /> Sector - R4, Pushpak Node, Karanjade, Panvel,<br /> Pin. - 410206. Navi Mumbai<br />Maharashtra, India</li>
                        <li className='footerSocialIcon'>
                            <a
                                href="https://wa.me/+918779345336?text=Hello%20PharmaChem%20Times!"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="ri-whatsapp-line"></i>
                            </a>
                            <a
                                href="mailto:pharmachemtimes@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="ri-mail-line"></i>
                            </a>
                            <a href="https://www.youtube.com/@PharmachemTimes" target="_blank" rel="noopener noreferrer">
                                <i className="ri-youtube-line"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/pharmachem-times-13b0662b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                                <i className="ri-linkedin-box-line"></i>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61555495514208" target="_blank" rel="noopener noreferrer">
                                <i className="ri-facebook-box-line"></i>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="ri-instagram-line"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footerPannelTwo">
                <p>&#169;2024 PharmChem Times. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Footer
