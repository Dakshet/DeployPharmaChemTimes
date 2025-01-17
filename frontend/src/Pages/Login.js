import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import NewsContext from '../Context/News/NewsContext';

const Login = ({ showAlert }) => {
    const host = process.env.REACT_APP_SECRET_KEY;

    const navigate = useNavigate();

    const { loginUserInfo } = useContext(NewsContext);

    const [showPassword, setShowPassword] = useState(false);

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.success) {
                    showAlert("Successfully Login!", "success");
                    localStorage.setItem('inews', json.token)   //token save in local storeage.
                    loginUserInfo();
                    navigate("/");
                }
                else {
                    showAlert(json.Error, "error");
                    // alert(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                // setCommentNews(commentNews);
            }
        }
        catch (error) {
            console.error("Error fetching the news:", error);
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
        document.title = "INDUSTRIAL TIMES - Login";  // Set the document title to the news title
    }, []);

    return (
        <div className='login'>
            <div className="loginBox">
                <h2>Login</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" id='inputEmailField' name='email' placeholder='Email' onChange={onChange} />
                    <div className="inputPasswordField">
                        <input type={`${showPassword ? "text" : "password"}`} name='password' placeholder='Password' onChange={onChange} />
                        <p id='showBtn' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</p>
                    </div>
                    <button type='submit'>Login</button>
                </form>
                <p>Not a Member? <span><Link to="/signup">Signup</Link></span></p>
            </div>
        </div>
    )
}

export default Login
