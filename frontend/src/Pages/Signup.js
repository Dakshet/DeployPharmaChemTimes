import React, { useContext, useEffect, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
import NewsContext from '../Context/News/NewsContext';

const Signup = ({ showAlert }) => {

    const host = process.env.REACT_APP_SECRET_KEY;
    const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;

    const { loginUserInfo } = useContext(NewsContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [images, setImages] = useState("")
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (credentials.password === credentials.cpassword) {

                const response = await fetch(`${host}/user/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, profileImageURL: images })
                })

                if (response.ok) {
                    const json = await response.json();

                    if (json.success) {
                        showAlert("Successfully Account Created!", "success");
                        localStorage.setItem('inews', json.token)   //token save in local storeage.
                        loginUserInfo();
                        navigate("/");
                    }
                    else {
                        alert(json.Error);
                        showAlert(json.Error, "error");
                    }
                }

                else {
                    console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                    // setCommentNews(commentNews);
                }

            }
            else {
                showAlert("Enter the correct confirm password!", "error")
            }
        }
        catch (error) {
            console.error("Error fetching the news:", error);
            // setCommentNews(commentNews);
        }
    }

    const postImage = async (image) => {

        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"];

        if (validImageTypes.includes(image.type)) {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", Upload_Preset);
            data.append("cloud_name", Cloud_Name);

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/image/upload", {
                    method: "post",
                    body: data,
                })

                const json = await response.json();
                // console.log(json.url);

                if (json.url) {
                    setImages(json.url);
                    // console.log(json.url);
                }
            } catch (error) {
                console.log("Image upload failed:", error);
            }
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
        document.title = "INDUSTRIAL TIMES - Signup";  // Set the document title to the news title
    }, []);

    return (
        <div className='signup'>
            <div className="signupBox">
                <h2>Signup</h2>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="image">Upload Your Image</label>
                    <input type="file" name='image' id='image' onChange={(e) => postImage(e.target.files[0])} required />
                    <input type="text" id='inputSNameField' name='name' placeholder='Full Name' onChange={onChange} required />
                    <input type="text" id='inputSEmailField' name='email' placeholder='Email' onChange={onChange} required />
                    <div className="inputSPasswordField">
                        <input type={`${showPassword ? "text" : "password"}`} name='password' placeholder='Password' onChange={onChange} required />
                        <p id='showBtn' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</p>
                    </div>
                    <div className="inputSCPasswordField">
                        <input type={`${showCPassword ? "text" : "password"}`} name='cpassword' placeholder='Confirm Password' onChange={onChange} required />
                        <p id='showBtn' onClick={() => setShowCPassword(!showCPassword)}>{showCPassword ? "Hide" : "Show"}</p>
                    </div>
                    {/* <button type='submit' disabled={images.length === 0}>{images.length === 0 ? "Upload Image" : "Signup"}</button> */}
                    <button type='submit' disabled={images.length === 0}>Signup</button>
                </form>
                <p>I'm already a member? <span><Link to="/login">Login</Link></span></p>
            </div>
        </div>
    )
}

export default Signup
