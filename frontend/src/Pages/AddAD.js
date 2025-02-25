import React, { useContext, useEffect, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import "./AddMagazine.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoToPreviousePage from '../Components/GoToPreviousePage';

const AddAD = ({ showAlert, showProfile, showAddMenu }) => {
    // const Upload_Preset = process.env.REACT_APP_UPLOAD_PRESET_IMAGE;
    // const Cloud_Name = process.env.REACT_APP_CLOUD_NAME;
    // const Upload_Preset_PDF = process.env.REACT_APP_UPLOAD_PRESET_PDF;

    const navigate = useNavigate();

    const { addAdvertisement } = useContext(NewsContext);
    // const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [body, setBody] = useState("");
    // const [links, setLinks] = useState(false);
    // const [pdfs, setPdfs] = useState(false);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    const handleSubmit = (e) => {
        e.preventDefault();

        showAlert("Added Advertisement Successfully!", "success");
        addAdvertisement(body, images);
        // console.log(title, body, images)

        navigate("/advertisement")

    }


    // const handleLinks = useCallback(() => {
    //     setLinks(true);
    //     setPdfs(false);
    // }, [])
    // const handlePdfs = useCallback(() => {
    //     setLinks(false);
    //     setPdfs(true);
    // }, [])

    const postImage = async (event) => {

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

            setImages(file); // Accept the image
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    // const postPdf = async (PDF) => {
    //     // console.log(typeof (PDF))

    //     const formData = new FormData();
    //     formData.append("file", PDF);
    //     formData.append("upload_preset", Upload_Preset_PDF);
    //     formData.append("cloud_name", Cloud_Name);

    //     try {
    //         const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/raw/upload", {
    //             method: "post",
    //             body: formData,
    //         })

    //         if (response.ok) {
    //             const json = await response.json();

    //             if (json.secure_url) {
    //                 setBody(json.secure_url);
    //                 console.log(json.secure_url)
    //                 // console.log(json.secure_url);
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
    // }

    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Add Advertisement";  // Set the document title to the news title
    }, []);


    return (
        <>
            <GoToPreviousePage />
            {
                userLoginRedux.role === "REPORTER" ?

                    <div className={`addMagazine ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
                        <div className="addMagazineInner">
                            <h1>Add Advertisement</h1>

                            <div className="addMagazineForm">
                                <form action="" onSubmit={handleSubmit}>
                                    <label htmlFor="image">Cover Image(JPEG/JPG/PNG)</label>
                                    <input type="file" name='image' id='image' accept="image/jpeg" required onChange={postImage} />
                                    <label htmlFor="body">Add Link</label>
                                    <input type="text" name='body' id='body' onChange={(e) => setBody(e.target.value)} required />
                                    <input className='submitBtn' disabled={images.length === 0 || body.length === 0} type="submit" value={images.length === 0 ? "Upload Image" : "POST"} />
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    (
                        <h1 style={{ margin: "20px 0px", textAlign: "center" }}>You don't have access to add Advertisement</h1>
                    )
            }
        </>
    )
}

export default AddAD
