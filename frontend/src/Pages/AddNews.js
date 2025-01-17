import React, { useContext, useEffect, useRef, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import GoToPreviousePage from '../Components/GoToPreviousePage';

const AddNews = ({ showAlert, showProfile, showAddMenu }) => {

    const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;

    const editor = useRef(null);
    const navigate = useNavigate();
    const { addNews } = useContext(NewsContext);
    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [tag, setTag] = useState("");
    const [images, setImages] = useState("");
    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    const handleSubmit = (e) => {
        e.preventDefault();
        showAlert("Added News Successfully!", "success");
        // console.log(title, description, tag, images);
        addNews(title, description, tag, images);
        setTimeout(() => {
            navigate(`/${(tag).toLowerCase()}`);
        }, 1000);
        // navigate(`/snews/${(tag).toLowerCase()}/${id}`);
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

                if (response.ok) {
                    const json = await response.json();

                    if (json.url) {
                        setImages(json.url);
                    }

                    else {
                        console.log(json.Error);
                    }
                }

                else {
                    console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                }


            } catch (error) {
                console.error("Error fetching the news:", error);
            }
        }
    }

    const descImage = async (image) => {
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

                if (response.ok) {
                    const json = await response.json();

                    if (json.url) {
                        setDesciption(prevDesc => prevDesc + `<img src="${json.url}" alt="Uploaded Image"/>`);
                    }

                    else {
                        console.log(json.Error);
                    }
                }

                else {
                    console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                }


            } catch (error) {
                console.error("Error fetching the news:", error);
            }
        }
    }
    // Function to handle file input change (image selection)
    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            descImage(image); // Upload the selected image to Cloudinary
        }
    };


    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Add News";  // Set the document title to the news title
    }, []);

    // useEffect(() => {
    //     if (images.length > 0) {
    //         if (description.length > 0) {
    //             setDisabledBtn(true);
    //         }
    //     }
    //     else {
    //         setDisabledBtn(false);
    //     }

    // }, [images, description])


    return (
        <>
            <GoToPreviousePage />
            {
                userLoginRedux.role === "REPORTER" ?

                    (<div className={`addNews ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
                        <div className="addNewsInner">
                            <h1>Add News</h1>

                            <div className="addNewsForm">
                                <form action="" onSubmit={handleSubmit}>
                                    <label htmlFor="image">Cover Image(JPEG/JPG/PNG)</label>
                                    <input type="file" name='image' id='image' required onChange={(e) => postImage(e.target.files[0])} />
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name='title' id='title' required onChange={(e) => setTitle(e.target.value)} minLength={3} />
                                    <label htmlFor="desc">Description</label>
                                    {/* <textarea name="desc" id="desc" rows="10" required onChange={(e) => setDesciption(e.target.value)}></textarea> */}

                                    <JoditEditor
                                        ref={editor}
                                        value={description}
                                        config={{
                                            readonly: false,
                                            className: "joditEditor",
                                            style: {
                                                width: '100%',
                                                height: '200px',
                                                backgroundColor: "transparent",
                                                border: '3px solid #011E29',
                                            },
                                            toolbarButtonSize: "middle",
                                            placeholder: "Start writing here...",
                                            buttons: [
                                                'bold', 'italic', 'underline', '|',
                                                'ul', 'ol', '|',
                                                'link', {
                                                    name: "customImageUpload", // Custom button for image upload
                                                    iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVLGzO55RQXipmjnUPh09YUtP-BW3ZTUeAA&s", // Optional custom icon
                                                    // iconURL: "https://img.icons8.com/ios/50/000000/upload.png", // Optional custom icon
                                                    exec: () => {
                                                        document.getElementById("image-upload-input").click(); // Trigger file input
                                                    },
                                                },
                                                '|',
                                                'align', 'undo', 'redo',
                                                'fontsize', 'paragraph', "brush", "preview", '|',
                                            ]
                                        }
                                        }
                                        // Only update state when leaving the editor to prevent re-renders on every keystroke
                                        onBlur={newContent => setDesciption(newContent)}
                                    />


                                    <input
                                        type="file"
                                        id="image-upload-input"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />

                                    <label htmlFor="tag">Type: </label>
                                    <select name="tag" id="tag" required onChange={(e) => setTag(e.target.value)} >
                                        <option value="">Select Type</option>
                                        <option value="NEWS">News</option>
                                        <option value="ARTICLE">Article</option>
                                        <option value="INTERVIEW">Interview</option>
                                        <option value="EVENT">Event</option>
                                        <option value="JOB">Job</option>
                                    </select>
                                    <input className='submitBtn' disabled={images.length === 0 || description === ""} type="submit" value={images.length === 0 ? "Upload Image" : (description === "" ? "Enter Description" : "Post")} />
                                </form>
                            </div>
                        </div>
                    </div>) :
                    (
                        <h1 style={{ margin: "20px 0px", textAlign: "center" }}>You don't have access to add news</h1>
                    )}
        </>
    )
}

export default AddNews
