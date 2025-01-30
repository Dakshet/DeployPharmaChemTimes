import React, { useContext, useEffect, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import "./AddMagazine.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoToPreviousePage from '../Components/GoToPreviousePage';

const AddProduct = ({ showAlert, showProfile }) => {

    const navigate = useNavigate();

    const { addProductData } = useContext(NewsContext);
    const [cName, setCName] = useState("");
    const [pName, setPName] = useState([]);
    const [cLink, setCLink] = useState("");
    const userLoginRedux = useSelector((state) => state.counter.userLogin);

    const handleSubmit = (e) => {
        e.preventDefault();

        // let separateCompanyName = pComp.split(",").map(company => company.trim());

        // let separateCompanyLink = pLink.split(",").map(company => company.trim());

        // if (separateCompanyLink.length === separateCompanyName.length) {
        //     let companies = [];

        //     for (let i = 0; i < separateCompanyName.length; i++) {
        //         let company = separateCompanyName[i];
        //         let link = separateCompanyLink[i];

        //         let companyDetails = {
        //             company: company,
        //             link: link
        //         }

        //         companies.push(companyDetails)
        //     }

        // }
        addProductData(cName, pName, cLink)
        showAlert("Added Product Successfully!", "success");
        navigate("/")
        // else {
        //     showAlert("Enter the correct Data!", "danger")
        // }

    }
    // Title change
    useEffect(() => {
        document.title = "PharmaChem TIMES - Add Product";  // Set the document title to the news title
    }, []);


    return (
        <>
            <GoToPreviousePage />
            {
                userLoginRedux.role === "REPORTER" ?

                    <div className={`addMagazine ${showProfile ? "userMenu" : ""}`}>
                        <div className="addMagazineInner">
                            <div className="addMagazineForm">
                                <form action="" onSubmit={handleSubmit}>
                                    <label htmlFor="compName">Company Name</label>
                                    <input type="text" id='compName' onChange={(e) => setCName(e.target.value)} placeholder='Enter company name' />
                                    <label htmlFor="compProd">Product Names (First Letter Must Be Capitalized.)</label>
                                    <textarea rows={10} type="text" id='compProd' onChange={(e) => setPName(e.target.value)} placeholder='Product1, Product2, Product2' />
                                    <label htmlFor="compLink">Company Link</label>
                                    <input type="text" id='compLink' onChange={(e) => setCLink(e.target.value)} placeholder='https://www.company.com' />
                                    <input type="submit" className='submitBtn' value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div >
                    :
                    (
                        <h1 style={{ margin: "20px 0px", textAlign: "center" }}>You don't have access to add Product</h1>
                    )
            }
        </>
    )
}

export default AddProduct
