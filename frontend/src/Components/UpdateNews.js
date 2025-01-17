import React, { useContext, useEffect, useRef, useState } from 'react'
import "./UpdateNews.css"
import NewsContext from '../Context/News/NewsContext';
import JoditEditor from 'jodit-react';

const UpdateNews = ({ showAlert, currentNews, updateModal, setUpdateModal }) => {
    const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;

    const editor = useRef(null);

    const { editNews } = useContext(NewsContext);

    const [eid, setEId] = useState("");
    const [etitle, setETitle] = useState("");
    const [edescription, setEDesciption] = useState("");
    const [etag, setETag] = useState("");
    const [prevDescription, setPrevDescription] = useState("");
    // const [eimages, setEImages] = useState("");

    useEffect(() => {
        if (currentNews) {
            setEId(currentNews._id)
            setETitle(currentNews.title);
            setEDesciption(currentNews.body);
            setETag(currentNews.tag);
            setPrevDescription(currentNews.body);
            // setEImages(currentNews.eimages);
            // console.log(currentNews)
        }
    }, [currentNews])


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("update", eid);
        showAlert("Updated News Successfully!", "success");
        editNews(eid, etitle, edescription, etag, prevDescription);
        setUpdateModal(false);
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

                const json = await response.json();

                if (json.url) {
                    // editor.current.insertImage(json.url); // Insert the uploaded image URL into the editor
                    // setDesc(prevDesc => prevDesc + `<img src="${json.url}" alt="Uploaded Image" style="width: 200px;"/>`);
                    setEDesciption(prevDesc => prevDesc + `<img src="${json.url}" alt="Uploaded Image"/>`);
                }
            } catch (error) {
                console.log("Image upload failed:", error);
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




    return (
        <div className={`${updateModal ? "updateNews" : "hideUpdateModal"}`}>
            <div className="updateNewsInner">
                <h1>Update News</h1>
                <i onClick={() => setUpdateModal(false)} className="ri-close-circle-line"></i>
                <div className="updateNewsForm">
                    <form action="" onSubmit={handleSubmit}>
                        {/* <label htmlFor="image">Cover Image(JPEG/JPG/PNG)</label>
                        <input type="file" name='image' id='image' value={eimages} required onChange={(e) => postImage(e.target.files[0])} /> */}
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' value={etitle} required onChange={(e) => setETitle(e.target.value)} />
                        <label htmlFor="desc">Description</label>
                        {/* <textarea className='description' name="desc" id="desc" rows="10" value={edescription} required onChange={(e) => setEDesciption(e.target.value)}></textarea> */}
                        <JoditEditor
                            ref={editor}
                            value={edescription}
                            config={{
                                readonly: false,
                                className: "joditEditor",
                                style: {
                                    width: '100%',
                                    height: '300px',
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
                            onBlur={newContent => setEDesciption(newContent)}
                        />


                        <input
                            type="file"
                            id="image-upload-input"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="tag">Type: </label>
                        <select name="tag" id="tag" value={etag} required onChange={(e) => setETag(e.target.value)} >
                            <option value="">Select Type</option>
                            <option value="NEWS">News</option>
                            <option value="ARTICLE">Article</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="EVENT">Event</option>
                            <option value="MAGAZINE">Magazine</option>
                        </select>
                        {/* <input className='submitBtn' disabled={eimages.length === 0} type="submit" value={eimages.length === 0 ? "Upload Image" : "Post"} /> */}
                        <input className='submitBtn' type="submit" value="Post" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateNews
