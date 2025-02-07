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
                        <p>Publisher & Sales Head</p>
                    </div>
                    <div className="footerOneInnerDiv">
                        <h1>Disha Nate</h1>
                        <p>Ad Co-Ordinator</p>
                    </div>
                    <div className="footerOneInnerDiv">
                        <h1>Sakshi Rikame</h1>
                        <p>Graphic Designer</p>
                    </div>
                </div>
                <div className="footerOneInner">
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
                        <li><img src={phone_icon} alt="" />+91 8779345336 / +91 8652654519</li>
                        <li><img src={location_icon} alt="" />C-204, Today Royal Elisum,<br /> Sector - 2, Karanjade, <br /> Panvel - 410206</li>
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
