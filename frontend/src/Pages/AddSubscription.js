import React, { useContext, useEffect, useState } from 'react'
import "./AddSubscription.css"
import { useNavigate } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';

const AddSubscription = ({ showAlert }) => {

    const { addSubscriptionData } = useContext(NewsContext);

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", address: "", country: "", number: "", email: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        addSubscriptionData(credentials.name, credentials.address, credentials.country, credentials.number, credentials.email);
        showAlert("Successfully Form Submitted!", "success");
        navigate("/");
    }


    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }


    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Subscription Form";  // Set the document title to the news title
    }, []);

    return (
        <div className='signup'>
            <div className="signupBox">
                <h2>Subscription Form</h2>
                <form className='subscriptionForm' action="" onSubmit={handleSubmit}>
                    <input type="text" id='inputSNameField' name='name' placeholder='Full Name' onChange={onChange} required />
                    <label htmlFor="inputSAddressField">Address</label>
                    <textarea name="address" id="inputSAddressField" rows="5" onChange={onChange} required></textarea>
                    <input type="text" id='inputSCountryField' name='country' placeholder='Country Name' onChange={onChange} required />
                    <input type="tel" id='inputNumberField' name='number' pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" placeholder='Mobile Number' onChange={onChange} required />
                    <input type="text" id='inputSEmailField' name='email' placeholder='Email Id' onChange={onChange} required />
                    <h6 className='subscriptionFormScheme'>Subscription Scheme</h6>
                    <ul className='subscriptionFormSchemeList'>
                        <li><strong>Free Email Subscription:</strong> Receive a daily electronic newsletter with the top news of the day, delivered straight to your inbox.</li>
                        <li><strong>Free Print Subscription:</strong> Get a monthly hard copy of our print magazine delivered to your address.</li>
                    </ul>
                    <div className="bankDetails">
                        <h3>Payment Details</h3>
                        <p><strong>Account Name:</strong> Raigad Mat</p>
                        <p><strong>Yearly Subscription:</strong> ₹2,400/-</p>
                        <p><strong>Payment Mode:</strong> NEFT / Cheque</p>
                        <p><strong>Account Number:</strong> 005110100000255</p>
                        <p><strong>IFSC Code:</strong> HDFC0CMAHAD</p>
                        <p><strong>Bank Name:</strong> The Annasaheb Savant Co-op. Urban Bank Mahad Ltd.</p>
                        <p><strong>Branch:</strong> Mhasla, Raigad</p>
                    </div>

                    <button type='submit'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default AddSubscription
