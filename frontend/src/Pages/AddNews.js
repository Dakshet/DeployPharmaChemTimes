import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import GoToPreviousePage from '../Components/GoToPreviousePage';

const AddNews = ({ showAlert, showProfile, showAddMenu }) => {

    // const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    // const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;

    const editor = useRef(null);
    const navigate = useNavigate();
    const { addNews } = useContext(NewsContext);
    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [tag, setTag] = useState("");
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const [uPhoto, setUPhoto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        showAlert("Added News Successfully!", "success");
        // console.log(title, description, tag, images);
        addNews(title, description, tag, uPhoto);
        setTimeout(() => {
            navigate(`/${(tag).toLowerCase()}`);
        }, 1000);
        // navigate(`/snews/${(tag).toLowerCase()}/${id}`);
    }

    const postImage = useCallback((event) => {

        // const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"];

        // if (validImageTypes.includes(image.type)) {
        //     const data = new FormData();
        //     data.append("file", image);
        //     data.append("upload_preset", Upload_Preset);
        //     data.append("cloud_name", Cloud_Name);

        //     try {
        //         const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/image/upload", {
        //             method: "post",
        //             body: data,
        //         })

        //         if (response.ok) {
        //             const json = await response.json();

        //             if (json.url) {
        //                 setImages(json.url);
        //             }

        //             else {
        //                 console.log(json.Error);
        //             }
        //         }

        //         else {
        //             console.log(`Error fetching news: ${response.status} ${response.statusText}`)
        //         }


        //     } catch (error) {
        //         console.error("Error fetching the news:", error);
        //     }
        const validImageTypes = ["image/jpeg", "image/jpg"];
        const maxFileSize = 10 * 1024 * 1024; // 5 MB in bytes

        try {
            const file = event.target.files[0];

            if (!file) return; // No file selected

            if (!validImageTypes.includes(file.type)) {
                alert("Please upload an image in JPG or JPEG format.");
                return;
            }

            if (file.size > maxFileSize) {
                alert("File size should not exceed 10 MB.");
                return;
            }

            setUPhoto(file); // Accept the image
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }, [])


    // Title change
    useEffect(() => {
        document.title = "PharmaChem Times - Add News";  // Set the document title to the news title
    }, []);


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
                                    <input type="file" name='uphoto' id='image' accept="image/jpeg" required onChange={postImage} />
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
                                                'link', '|',
                                                'align', 'undo', 'redo',
                                                'fontsize', 'paragraph', "brush", "preview", '|',
                                            ]
                                        }
                                        }
                                        // Only update state when leaving the editor to prevent re-renders on every keystroke
                                        onBlur={newContent => setDesciption(newContent)}
                                        minLength={10}
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
                                    <input className='submitBtn' disabled={uPhoto.length === 0 || description === ""} type="submit" value={uPhoto.length === 0 ? "Upload Image" : (description === "" ? "Enter Description" : "Post")} />
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
