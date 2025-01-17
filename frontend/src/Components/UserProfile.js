import React from 'react'
import "./UserProfile.css"
import { useSelector } from 'react-redux';

const UserProfile = ({ showProfile }) => {

    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    return (
        <div className={`${showProfile ? "userProfile" : "hideLogin"}`} >
            {/* <div className="userProfile" > */}
            <div className="userProfileInner">
                <img src={userLoginRedux.profileImageURL} alt="" />
                <hr />
                <h1>{userLoginRedux.name}</h1>
                <p>{userLoginRedux.email}</p>
            </div>
        </div>
    )
}

export default UserProfile
