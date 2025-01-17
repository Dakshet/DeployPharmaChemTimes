import React, { useContext, useEffect, useState } from 'react'
import "./Comments.css"
import NewsContext from '../Context/News/NewsContext'
import CommentItem from './CommentItem';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Comments = ({ showAlert }) => {

    const location = useLocation();
    const { commentNews, addComment, fetchComment } = useContext(NewsContext);
    const [comt, setComt] = useState("");
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const isUserIsNotLogin = Object.keys(userLoginRedux).length === 0;


    useEffect(() => {
        fetchComment(location.pathname.split("/")[2]);
        // eslint-disable-next-line 
    }, [])  // Empty dependency array ensures the effect runs only on mount


    const handleSubmit = (e) => {
        e.preventDefault();
        if (comt.trim() === "") {
            showAlert("Comment cannot be empty!", "danger");
            return;
        }
        addComment(location.pathname.split("/")[2], comt);
        showAlert("Comment added successfully!", "success");
        setComt("");
    }

    return (
        <div className='comments'>
            <div className="commentInner">
                <h2>Comments</h2>

                {/* Show the comment form only if the user is logged in */}
                {!isUserIsNotLogin &&
                    <form action="" onSubmit={handleSubmit} >
                        <input type="text" placeholder='Enter comment' value={comt} onChange={(e) => setComt(e.target.value)} />
                        <button type='submit' className='commentBtn'>Publish</button>
                    </form>}

                {/* Render all comments */}
                {commentNews && commentNews.map((msg) => {
                    return <CommentItem key={msg._id} msg={msg} />
                })}

                {/* Show login prompt if the user is not logged in */}
                {isUserIsNotLogin &&
                    <div className="commentSignInBox" >
                        <p>To leave a comment, click the button below to login with Industrial Times.</p>
                        <button><Link to="/login">Login</Link></button>
                    </div>}
            </div>
        </div >
    )
}

export default Comments
