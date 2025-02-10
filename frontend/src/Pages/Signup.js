import React, { useContext, useEffect, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';

const Signup = ({ showAlert }) => {

    const host = process.env.REACT_APP_SECRET_KEY;

    const { loginUserInfo } = useContext(NewsContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", number: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (credentials.password === credentials.cpassword) {

                const response = await fetch(`${host}/user/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, number: credentials.number })
                })
                const json = await response.json();

                if (json.success) {
                    showAlert("Successfully Account Created!", "success");
                    localStorage.setItem('iPharma', json.token)   //token save in local storeage.
                    loginUserInfo();
                    navigate("/");
                }
                else {
                    // alert(json.Error);
                    showAlert(json.Error, "error");
                }

            }
            else {
                showAlert("Enter the correct confirm password!", "error")
            }
        }
        catch (error) {
            console.error("Error during the signup:", error);
            // setCommentNews(commentNews);
        }
    }


    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }


    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Signup";  // Set the document title to the news title
    }, []);

    return (
        <div className='signup'>
            <div className="signupBox">
                <h2>Signup</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" id='inputSNameField' name='name' placeholder='Full Name' onChange={onChange} required />
                    <input type="text" id='inputSEmailField' name='email' placeholder='Email Id' onChange={onChange} required />
                    <div className="inputSPasswordField">
                        <input type={`${showPassword ? "text" : "password"}`} name='password' placeholder='Password' onChange={onChange} required />
                        <p id='showBtn' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</p>
                    </div>
                    <div className="inputSCPasswordField">
                        <input type={`${showCPassword ? "text" : "password"}`} name='cpassword' placeholder='Confirm Password' onChange={onChange} required />
                        <p id='showBtn' onClick={() => setShowCPassword(!showCPassword)}>{showCPassword ? "Hide" : "Show"}</p>
                    </div>
                    <input type="tel" id='inputNumberField' name='number' pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" placeholder='Mobile Number' onChange={onChange} required />
                    <button type='submit'>Signup</button>
                </form>
                <p>I'm already a member? <span><Link to="/login">Login</Link></span></p>
            </div>
        </div>
    )
}

export default Signup
