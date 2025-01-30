import React, { useContext, useEffect, useState } from 'react'
import "../Pages/AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import "../Pages/AddMagazine.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProduct = ({ showAlert, showEditForm, setShowEditForm, companyAllData }) => {

    const navigate = useNavigate();

    const { editCompanyProducts, deleteAllCompanyProducts } = useContext(NewsContext);
    const [companyId, setCompanyId] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [productNames, setProductNames] = useState("");
    const [companyLink, setCompanyLink] = useState("");
    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    // console.log(companyAllData.companyName[0]._id)


    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent empty submissions
        if (!companyName.trim() || !productNames.trim() || !companyLink.trim()) {
            showAlert("All fields are required!", "warning");
            return;
        }

        // Convert product names to array
        const productArray = productNames.split(",").map((p) => p.trim());

        editCompanyProducts(companyId, companyName, productArray, companyLink);
        showAlert("Updated Product Successfully!", "success");
        setShowEditForm(false);
        navigate("/");
    }


    const handleDelete = () => {
        deleteAllCompanyProducts(companyId);
        setShowEditForm(false);
    }

    // Populate form fields when companyAllData changes
    useEffect(() => {
        if (companyAllData && companyAllData.companyName[0]) {
            const { _id, companyName, productName, companyLink } = companyAllData.companyName[0];
            setCompanyId(_id || "");
            setCompanyName(companyName || "");
            setProductNames(productName ? productName.join(", ") : "");
            setCompanyLink(companyLink || "");
        }
    }, [companyAllData]);

    // Title change
    useEffect(() => {

        document.title = "PharmaChem TIMES - Edit Data";  // Set the document title to the news title
    }, []);


    if (userLoginRedux.role !== "REPORTER") {
        return <h1 style={{ margin: "20px 0px", textAlign: "center" }}>You don't have access to edit products</h1>;
    }

    return (

        <div className={` ${showEditForm ? "addMagazine editCompanyDataForm" : "hideProduct"}`}>
            <div className="addMagazineInner">
                <div className="addMagazineForm">
                    <i onClick={() => setShowEditForm(false)} className="ri-close-circle-line editCompanyCloseIcon"></i>
                    <form action="">
                        <label htmlFor="compName">Company Name</label>
                        <input type="text" id='compName' onChange={(e) => setCompanyName(e.target.value)} value={companyName} placeholder='Enter company name' />
                        <label htmlFor="compProd">Product Names (Comma separated, First Letter Capitalized)</label>
                        <textarea rows={7} type="text" id='compProd' onChange={(e) => setProductNames(e.target.value)} value={productNames} placeholder='Product1, Product2, Product2' />
                        <label htmlFor="compLink">Company Link</label>
                        <input type="text" id='compLink' onChange={(e) => setCompanyLink(e.target.value)} value={companyLink} placeholder='https://www.company.com' />
                        <div className="editCompanyFormBn">
                            <input type="submit" onClick={handleDelete} className='submitBtn' value="Delete" />
                            <input type="submit" onClick={handleSubmit} className='submitBtn' value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default EditProduct
