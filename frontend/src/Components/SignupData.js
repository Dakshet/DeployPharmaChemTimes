import React, { useContext, useEffect } from 'react'
import GoToPreviousePage from './GoToPreviousePage'
import NewsContext from '../Context/News/NewsContext';
import AllNewsLoader from './AllNewsLoader';
import { useNavigate } from 'react-router-dom';

const SignupData = () => {

    let navigate = useNavigate();

    const { signupData, fetchSignUpData } = useContext(NewsContext);

    useEffect(() => {
        if (localStorage.getItem("iPharma")) {
            fetchSignUpData();
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])

    if (!signupData || signupData.length === 0) {
        return <AllNewsLoader />; // Handle case when news is not yet available
    }

    return (
        <>
            <GoToPreviousePage />
            <div className='subscriptionData'>
                <h2>Your Signup Data ({signupData.length})</h2>
                {signupData.map(subData => {
                    return <div key={subData._id} className='subscriptionDataInner'>
                        <h2><strong>Name: </strong> {subData.name}</h2>
                        <p><strong>Email: </strong>{subData.email}</p>
                        <p><strong>Number: </strong>{subData.number}</p>
                        <p><strong>Role: </strong>{subData.role}</p>
                    </div>

                })}
            </div>
        </>
    )
}

export default SignupData
