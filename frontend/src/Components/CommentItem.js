import React, { useEffect, useState } from 'react'
import "./Comments.css"

const CommentItem = ({ msg }) => {

    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        if (msg.createdAt) {
            const createdAt = new Date(msg.createdAt);
            const now = new Date();

            // Calculate the difference in milliseconds
            const timeDifference = now - createdAt;

            // Convert difference to seconds, minutes, hours, days
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            let result = "";

            if (days >= 1) {
                result = `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours >= 1) {
                result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes >= 1) {
                result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                result = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            }

            setTimeAgo(result);
        }
    }, [msg]);

    return (
        <div className='commentItem'>
            <div className="commentInnerx">
                <img src={msg.createdUser.profileImageURL} alt="" />
                <div className="commentInnerBox">
                    <div className="commentInnerNameAndTime">
                        <h3>{msg.createdUser.name}</h3>
                        <p>{timeAgo}</p>
                    </div>
                    <p className="commentContent">{msg.content}</p>
                </div>

            </div>
        </div>
    )
}

export default CommentItem
