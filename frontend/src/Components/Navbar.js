import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SearchBar from './SearchBar'
import NewsContext from '../Context/News/NewsContext'
import { useDispatch, useSelector } from 'react-redux'
import { storeUserLogin } from '../redux/counter/counterSlice'
import UserProfile from './UserProfile'
// import DropDownAddMenu from './DropDownAddMenu'
import logo1 from '../Images/logo1.jpg'


const Navbar = ({ setShowAddMenu, showProfile, setShowProfile, showSearch, setShowSearch, showAlert }) => {

    const navigate = useNavigate();
    const { setSearchNewsResult, setSpecificNews } = useContext(NewsContext);
    const [mobileMenu, setMobileMenu] = useState(false);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const dispatch = useDispatch();
    const location = useLocation();
    const articleId = location.pathname.split("/")[2] || ""; // This will safely handle paths without a third segment

    const handleClick = () => {
        setMobileMenu(false);
        setSearchNewsResult([]);
        setSpecificNews({});
    }

    const handleLogout = () => {
        localStorage.removeItem("inews")
        navigate('/');
        dispatch(storeUserLogin({}));
        setMobileMenu(false);
        showAlert("Logout successfully!", "success");
        setShowAddMenu(false);
        setShowProfile(false);
    }


    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;


    return (
        <>
            <div className="navbar">

                <div className="navbar-left">
                    <Link to="/"><img className='logoNavbar' src={logo1} alt="PharmChem  Times Logo" /></Link>
                </div>
                <div className='navbar-center'>
                    <ul className={`${mobileMenu ? "" : "navbarCenterHide"} `}>
                        {/* <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`}>
                            <img src={userLoginRedux.profileImageURL} alt="profile" />
                        </li> */}
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`}>
                            <span>{userLoginRedux.name}</span>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === '/' ? 'activeNav' : ''}`}>
                            <Link to="/">Products List</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/news/${articleId}` ? 'activeNav' : location.pathname === '/news' ? 'activeNav' : ''}`}>
                            <Link to="/news">News</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/article/${articleId}` ? 'activeNav' : location.pathname === '/article' ? 'activeNav' : ''}`}>
                            <Link to="/article">Article</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/interview/${articleId}` ? 'activeNav' : location.pathname === '/interview' ? 'activeNav' : ''}`}>
                            <Link to="/interview">Interview</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/event/${articleId}` ? 'activeNav' : location.pathname === '/event' ? 'activeNav' : ''}`}>
                            <Link to="/event">Event</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === `/job/${articleId}` ? 'activeNav' : location.pathname === '/job' ? 'activeNav' : ''}`}>
                            <Link to="/job">Jobs</Link>
                        </li>
                        <li onClick={handleClick} className={`${location.pathname === '/magazine' ? 'activeNav' : ''}`}>
                            <Link to="/magazine">Magazine</Link>
                        </li>
                        {
                            userLoginRedux.role === "REPORTER" && (
                                <>
                                    <li onClick={handleClick} className={`${location.pathname === '/advertisement' ? 'activeNav' : ''}`}>
                                        <Link to="/advertisement">Advertisement</Link>
                                    </li>
                                    <li onClick={handleClick} className={`${location.pathname === '/adminpage' ? 'activeNav' : ''}`}>
                                        <Link to="/adminpage">Admin</Link>
                                    </li>
                                </>
                            )
                        }

                        <li onClick={() => setShowSearch(!showSearch)} className='hideSearchBarIcon'>
                            <i className="ri-search-line"></i>
                        </li>
                        {/* <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? (location.pathname === '/addnews' ? 'activeNav' : '') : "hideLogin"):""))}`}/> */}
                        {/* <li onClick={handleClick} className={`${mobileMenu ? "hideAddBtn" : (isUserIsNotLogin ? "hideLogin" : (userLoginRedux.role === "REPORTER" ? (location.pathname === "/addnews" ? "activeNav" : "") : "hideLogin"))}`}> */}


                        {/* <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/addnews' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/addnews">Add News</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/addmagazine' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/addmagazine">Add Magazine</Link>
                        </li>
                        <li onClick={handleClick} className={`hideField ${userLoginRedux.role === "REPORTER" ? (location.pathname === '/add/advertisement' ? 'activeNav' : '') : "hideLogin"}`}>
                            <Link to="/add/advertisement">Add AD</Link>
                        </li> */}
                        <li onClick={handleClick} className={`hideField ${isUserIsNotLogin ? "" : "hideLogin"}`}>
                            <Link to="/login">Login</Link>
                        </li>
                        <li className={`hideField ${location.pathname === "/subscribe" ? "activeNav" : ""}`} onClick={handleClick}>
                            <Link to="/subscribe">Subscribe</Link>
                        </li>
                        <li className={`hideField ${isUserIsNotLogin ? "hideLogin" : ""}`} onClick={handleLogout}>
                            Logout
                        </li>
                        <li>
                            <div className="socialMediaIconx hideField">
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
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <i className="ri-instagram-line"></i>
                                </a>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li><Link to="/subscribe">Subscribe</Link></li>
                        {
                            isUserIsNotLogin ? (
                                <>
                                    <li className={`${location.pathname === "/signup" ? "hideLogin" : ""}`}>
                                        <Link to="/signup">Signup</Link>
                                    </li>
                                    <li className={`${location.pathname === "/login" ? "hideLogin" : ""}`}>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* <img onClick={handleUserProfile} src={userLoginRedux.profileImageURL} alt="" /> */}
                                    <li onClick={handleLogout}>
                                        Logout
                                    </li>
                                </>
                            )
                        }


                    </ul>
                </div>

                <i onClick={() => setShowSearch(!showSearch)} className="ri-search-line showSearchBar"></i>
                {mobileMenu ? <i className="ri-close-circle-line closeIcons" onClick={() => setMobileMenu(false)}></i>
                    : <i className="ri-menu-fill menu-icon" onClick={() => setMobileMenu(true)}></i>}
            </div >
            <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
            <UserProfile showProfile={showProfile} />
            {/* <DropDownAddMenu showAddMenu={showAddMenu} setShowAddMenu={setShowAddMenu} /> */}
        </>
    )
}

export default Navbar
