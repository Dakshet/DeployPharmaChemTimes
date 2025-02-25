import React, { useCallback, useContext, useEffect } from 'react'
import "./SubscriptionData.css"
import NewsContext from '../Context/News/NewsContext';
import AllNewsLoader from './AllNewsLoader';
import GoToPreviousePage from './GoToPreviousePage';

const PendingSubscriptionData = () => {

    const { pendingSubscriptionData, fetchSubscriptionData, editSubscriptionData, deleteSubscription } = useContext(NewsContext);

    const handlePayBtn = useCallback((id) => {
        editSubscriptionData(id);
        // eslint-disable-next-line
    }, [])

    const handleDeleteBtn = useCallback((id) => {
        deleteSubscription(id);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchSubscriptionData("NO")
        // eslint-disable-next-line
    }, [])


    if (!pendingSubscriptionData || pendingSubscriptionData.length === 0) {
        return <AllNewsLoader />; // Handle case when news is not yet available
    }

    // console.log(pendingSubscriptionData);

    return (
        <>
            <GoToPreviousePage />
            <div className='subscriptionData'>
                <h2>Your Subscription Pending Data ({pendingSubscriptionData.length})</h2>
                {pendingSubscriptionData.map(subPData => {
                    return <div key={subPData._id} className='subscriptionDataInner'>
                        <h2><strong>Name: </strong> {subPData.name}</h2>
                        <p><strong>Address: </strong> {subPData.address}</p>
                        <p><strong>Country: </strong>{subPData.country}</p>
                        <p><strong>Number: </strong>{subPData.number}</p>
                        <p><strong>Email: </strong>{subPData.email}</p>
                        <p><strong>Payment Status: </strong>{subPData.paymentStatus}</p>
                        <div className="paymentButtons">
                            <button onClick={() => handlePayBtn(subPData._id)}>Pay</button>
                            <button onClick={() => handleDeleteBtn(subPData._id)}>Delete</button>
                        </div>
                    </div>

                })}
            </div>
        </>
    )
}

export default PendingSubscriptionData
