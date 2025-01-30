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
    const [pName, setPName] = useState("");
    const [pComp, setPComp] = useState([]);
    const [pLink, setPLink] = useState([]);
    const userLoginRedux = useSelector((state) => state.counter.userLogin);
    const [byProductName, setByProductName] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (byProductName) {
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

            //     addProductData(pName, companies)
            //     showAlert("Added Data Successfully!", "success");
            //     navigate("/")
            // }
            // else {
            //     showAlert("Enter the correct Data!", "danger")
            // }
        }
        else {

        }

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
                            <div className="addProductBtns">
                                <button onClick={() => setByProductName(true)}>By Product</button>
                                <button onClick={() => setByProductName(false)}>By Company</button>
                            </div>

                            <div className={`${byProductName ? "addMagazineForm" : "hideProduct"}`}>
                                <form action="" onSubmit={handleSubmit}>
                                    <label htmlFor="prodName">Product Name</label>
                                    <input type="text" id='prodName' onChange={(e) => setPName(e.target.value)} placeholder='Enter product name' />
                                    <label htmlFor="prodComp">Product Company (First Letter Must Be Capitalized.)</label>
                                    <input type="text" id='prodComp' onChange={(e) => setPComp(e.target.value)} placeholder='Filpkart, Amazon, Ebay' />
                                    <label htmlFor="prodLink">Company Link</label>
                                    <input type="text" id='prodLink' onChange={(e) => setPLink(e.target.value)} placeholder='https://www.flipkart.com, https://www.amazon.com, https://www.ebay.com' />
                                    <input type="submit" className='submitBtn' value="Submit" />
                                </form>
                            </div>
                            <div className={`${byProductName ? "hideProduct" : "addMagazineForm"}`}>
                                <form action="" onSubmit={handleSubmit}>
                                    <label htmlFor="prodName">Company Name</label>
                                    <input type="text" id='prodName' onChange={(e) => setPName(e.target.value)} placeholder='Enter company name' />
                                    <label htmlFor="prodComp">Product Names (First Letter Must Be Capitalized.)</label>
                                    <input type="text" id='prodComp' onChange={(e) => setPComp(e.target.value)} placeholder='Product1, Product2, Product2' />
                                    <label htmlFor="prodLink">Company Link</label>
                                    <input type="text" id='prodLink' onChange={(e) => setPLink(e.target.value)} placeholder='https://www.company.com' />
                                    <input type="submit" className='submitBtn' value="Submit" />
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

export default AddProduct
