import React from 'react'
import "./Logo.css"
import logo from '../Images/logo.jpg'

const Logo = () => {
    return (
        <>
            <div className='logo'>
                {/* <img src={logoImage} alt="" /> */}
                <div className="logoInner">
                    <img src={logo} alt="" />
                    <h2>Industrial <span>Times 24</span></h2>
                </div>
            </div>
            <div className="socialMediaIcon">
                <a
                    href="https://wa.me/+918652654519?text=Hello%20Industrial%20Times!"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="ri-whatsapp-line"></i>
                </a>

                <a
                    href="mailto:industrialtimes24@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i className="ri-mail-line"></i>
                </a>
                <a href="https://youtube.com/@industrialtimes24?si=n67pYl2TJSSpb0bD" target="_blank" rel="noopener noreferrer">
                    <i className="ri-youtube-line"></i>
                </a>
                <a href="https://www.linkedin.com/in/industrial-times-7ab62431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                    <i className="ri-linkedin-box-line"></i>
                </a>
                <a href="https://www.facebook.com/61570010956901/posts/122105459990667031" target="_blank" rel="noopener noreferrer">
                    <i className="ri-facebook-box-line"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="ri-instagram-line"></i>
                </a>
            </div>
        </>
    )
}

export default Logo