import React, { useCallback, useContext, useEffect } from 'react'
import "./SubscriptionData.css"
import NewsContext from '../Context/News/NewsContext';
import AllNewsLoader from './AllNewsLoader';
import GoToPreviousePage from './GoToPreviousePage';

const SubscriptionData = () => {

    const { subscriptionData, fetchSubscriptionData, deleteSubscription } = useContext(NewsContext);

    const handleDeleteBtn = useCallback((id) => {
        deleteSubscription(id, "sub");
        // eslint-disable-next-line
    }, [subscriptionData])

    useEffect(() => {
        fetchSubscriptionData("YES")
        // eslint-disable-next-line 
    }, [])

    if (!subscriptionData || subscriptionData.length === 0) {
        return <AllNewsLoader />; // Handle case when news is not yet available
    }

    return (
        <>
            <GoToPreviousePage />
            <div className='subscriptionData'>
                <h2>Your Subscription Data ({subscriptionData.length})</h2>
                {subscriptionData.map(subData => {
                    return <div key={subData._id} className='subscriptionDataInner'>
                        <h2><strong>Name: </strong> {subData.name}</h2>
                        <p><strong>Address: </strong> {subData.address}</p>
                        <p><strong>Country: </strong>{subData.country}</p>
                        <p><strong>Number: </strong>{subData.number}</p>
                        <p><strong>Email: </strong>{subData.email}</p>
                        <p><strong>Payment Status: </strong>{subData.paymentStatus}</p>
                        <div className="paymentButtons">
                            <button onClick={() => handleDeleteBtn(subData._id)}>Delete</button>
                        </div>
                    </div>

                })}
            </div>
        </>
    )
}

export default SubscriptionData
