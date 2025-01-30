import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import NewsContext from '../Context/News/NewsContext'
import "./Home.css"
import EditProduct from '../Components/EditProduct';

const Home = ({ showAlert }) => {

    const { visitCounter, showAllProducts, fetchProductChemicalData } = useContext(NewsContext);

    const [filteredChemicals, setFilteredChemicals] = useState([]);     // It is use when we click on letter in By products list that time they show corresponding prouducts using this useState
    const [selectedLetter, setSelectedLetter] = useState('');           // It is use for select letter wise
    const [openPopup, setOpenPopup] = useState(false);                  // It is use for open the popup box
    const [openBoxInfo, setOpenBoxInfo] = useState({});                 // It is use for verfication the word those are clicked
    const [selectedChemName, setSelectedChemName] = useState({});       // It is use when we select the chemical name in by Products list
    const [searchBox, setSearchBox] = useState("");                     // Use for set the searchBox word
    // const [selectedChemicalCompany, setSelectedChemicalCompany] = useState([])
    const [selectedCompanyProduct, setSelectedCompanyProduct] = useState([])
    const [selectedField, setSelectedField] = useState("")              // It is use In All list for checked symbol by applying special name i.e. @#number
    const [showProductList, setShowProductList] = useState(false)      // It is use for mobile button i.e. by Products
    const [showCompanyList, setShowCompanyList] = useState(false)      // It is use for mobile button i.e. by Company
    const [allCompanyOnPopupBox, setAllCompanyOnPopupBox] = useState([]);    // Set all company on popup box
    const [searchByProduct, setSearchByProduct] = useState([]);         // It is use for the add data after searching product name
    const [searchByCompany, setSearchByCompany] = useState([]);          // It is use for the add data after searching company name        
    const [showEditForm, setShowEditForm] = useState(false);            // It is use for show edit form
    const [companyAllData, setCompanyAllData] = useState([]);            // It is use for send all data into the edit form


    // Company wise sort
    const chemArray = useMemo(() => {
        return [...showAllProducts].sort((a, b) => a.companyName.localeCompare(b.companyName))
    }, [showAllProducts])

    // console.log("chemArray", chemArray)


    // Extract the unique letters
    const letters = useMemo(() => {
        return chemArray
            .flatMap(chem => chem.productName) // Flatten product names
            .map(product => product.trim().charAt(0).toUpperCase()) // Get first letter of each product
        // .flatMap(product => product.split(", ")) // Split string into individual products

    }, [chemArray]);


    // Flatten the array and remove duplicates
    const uniqueLetters = Array.from(new Set(letters.flat())).sort((a, b) => a.localeCompare(b));



    // Extract unique company names
    const allCompany = useMemo(() => Array.from(
        new Set(chemArray.map(chem => chem.companyName))
    ), [chemArray]);


    // All sorted product names only not the complete information but it is ok
    const sortedAllProducts = Array.from(
        new Set(
            chemArray
                .flatMap(chem => chem.productName) // Flatten all productName arrays into a single array
                .sort((a, b) => a.localeCompare(b)) // Sort the filtered names alphabetically
            // .flatMap(product => product.split(", "))
        )
    )

    // console.log("sortedAllProducts", sortedAllProducts)


    // Now we centerized the search code
    const searchAllData = useCallback((word) => {
        const query = word.toLowerCase();

        //Filtered by company name and product name
        let arrayC = [];

        for (let i = 0; i < chemArray.length; i++) {

            let filterProducts;
            filterProducts = chemArray[i].productName.filter(product =>
                product.toLowerCase() === query
                // product.toLowerCase().includes(query)
            )
            if (filterProducts.length > 0) {
                arrayC.push({
                    ...chemArray[i],
                    productName: filterProducts
                })
            }
        }

        if (arrayC.length === 0) {
            for (let i = 0; i < chemArray.length; i++) {

                let filterProducts;
                filterProducts = chemArray[i].productName.filter(product =>
                    product.toLowerCase().includes(query)
                )
                if (filterProducts.length > 0) {
                    arrayC.push({
                        ...chemArray[i],
                        productName: filterProducts
                    })
                }
            }
        }

        if (arrayC.length > 0) {
            let productMap = new Map();         // Map for storing unique product names

            arrayC.forEach(item => {
                item.productName.forEach(product => {
                    let productLower = product.toLowerCase();
                    if (!productMap.has(productLower)) {
                        productMap.set(productLower, {
                            productName: product,
                            companyName: [item.companyName],
                            companyLink: [item.companyLink]
                        })
                    }
                    else {
                        let existingEntry = productMap.get(productLower);
                        existingEntry.companyName.push(item.companyName);
                        existingEntry.companyLink.push(item.companyLink);
                    }
                });
            });


            // Convert the map back to an array of unique products
            let uniqueProducts = Array.from(productMap.values()).sort((a, b) => a.productName.localeCompare(b.productName));
            // setSearchByProduct(uniqueProducts);
            return {
                category: "product",
                companyName: uniqueProducts
            }

        }

        // If still no matches, search by company name
        for (let i = 0; i < chemArray.length; i++) {
            if (chemArray[i].companyName.toLowerCase().includes(query)) {
                arrayC.push(chemArray[i]);
            }
        }

        // If company matches are found, return them
        if (arrayC.length > 0) {
            // console.log("arrayC", arrayC)
            return {
                category: "company",
                companyName: arrayC
            };
        }

        // Final fallback if no match is found
        return {
            category: "null"
        };
    }, [chemArray])


    // //Handle Letter Selection
    const handleLetterSelection = useCallback((letter) => {

        const sortedLetterArray = sortedAllProducts.filter(name => name.charAt(0).toUpperCase() === letter) // Filter names starting with the specified letter
        setSelectedChemName([])
        setFilteredChemicals(sortedLetterArray);
        setSelectedLetter(letter);
        setSelectedField(letter)
        setSearchByProduct([])
        setSearchByCompany([])
    }, [sortedAllProducts])


    // // Handle Chemical Selection 
    const handleChemicalSelection = useCallback((chemicalName) => {

        const searchChemical = searchAllData(chemicalName)

        setSelectedChemName(searchChemical.companyName);
        // setSelectedChemicalCompany([])
        setSelectedCompanyProduct([])
        setSelectedField(chemicalName)
        setShowProductList(false);
    }, [searchAllData])

    // // Handle Company Selection 
    const handleCompanySelection = useCallback((companyName) => {
        const searchChemical = searchAllData(companyName)

        setSelectedCompanyProduct(searchChemical.companyName);
        setSelectedLetter('');
        setSelectedField(`@${companyName}`);
        setShowCompanyList(false);
    }, [searchAllData]);


    // // Handle Popup Box
    const handlePopupBox = useCallback((chemName) => {
        setOpenPopup(true);
        setOpenBoxInfo(chemName);
        const searchChemical = searchAllData(chemName)
        setAllCompanyOnPopupBox(searchChemical.companyName)
    }, [searchAllData])

    // // Handle Popup Close Box
    const closePopup = useCallback(() => {
        setOpenPopup(false);
        setOpenBoxInfo({});
    }, []);


    const handleSearchBox = () => {
        const searchChemical = searchAllData(searchBox)

        if (searchChemical.category === "product") {
            setSearchByProduct(searchChemical.companyName)
        }
        else if (searchChemical.category === "company") {
            setSearchByCompany(searchChemical.companyName)
        }
        else {
            setSearchByProduct("-1");
            setSearchByCompany("-1");
        }
        setSelectedField("")
    };

    const handleByProductBtn = useCallback(() => {
        setShowProductList(true);
    }, [])

    const handleByCompanyBtn = useCallback(() => {
        setShowCompanyList(true);
    }, [])


    const handleEditForm = useCallback((companyData) => {
        const editData = searchAllData(companyData)

        // editCompanyProducts(editData.companyName[0]._id, editData.companyName[0].companyName, editData.companyName[0].productName, editData.companyName[0].companyLink)

        setCompanyAllData(editData);
        setShowEditForm(true);
    }, [searchAllData])


    // Use for close and open Popup box
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.closest('.centerContainerPopUp') === null) {
                closePopup();
            }
        };

        if (openPopup) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openPopup, closePopup]);




    // // console.log(showAllProducts)

    useEffect(() => {
        visitCounter();
        fetchProductChemicalData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Title change
    useEffect(() => {
        document.title = "PharmaChem Times";  // Set the document title to the news title
    }, []);


    return (
        <>
            <div className={`home`}>
                <div className={`leftContainer ${showProductList ? "" : "hideContainer"}`}>
                    <h5>By Products</h5>

                    <div className="leftContainerRadioBox">
                        <label className='leftContainerLabel `hideAllList`' htmlFor={`radio-all`}>
                            <span>ALL LIST</span>
                            <input
                                type="radio"
                                name="chemName"
                                id={`radio-all`}
                                checked={selectedField === "@#number"}
                                onChange={() => { setSelectedField("@#number"); setSelectedChemName({}); setSearchByCompany([]); setSearchByProduct([]); setSelectedLetter(""); setSelectedCompanyProduct([]) }}
                            />
                        </label>
                        {uniqueLetters.map(letter => (
                            <div key={letter}>
                                <label className='leftContainerLabel' htmlFor={`radio-${letter}`}>
                                    <span>{letter}</span>
                                    <input
                                        type="radio"
                                        name="chemName"
                                        id={`radio-${letter}`}
                                        checked={selectedField === letter || selectedField.charAt(0).toLowerCase() === letter.toLowerCase()}
                                        onChange={() => handleLetterSelection(letter)}
                                    />
                                </label>

                                {selectedLetter === letter && (
                                    <div className="dropDownContainerBox">
                                        {filteredChemicals.map((chem, index) => (
                                            <label key={index} className='dropDownContainerBoxInner' htmlFor={`radio-${letter}`}>
                                                <span>{chem}</span>
                                                <input
                                                    type="radio"
                                                    name="prodName"
                                                    checked={selectedField === chem}
                                                    onChange={() => handleChemicalSelection(chem)}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="centerContainer">
                    <button onClick={() => { setSelectedChemName({}); setSelectedLetter(""); setSelectedCompanyProduct([]) }} className='centerContainerAllListBtn'>All List</button>
                    <div className="centerContainerBtn">
                        <button onClick={handleByProductBtn}>By Product</button>
                        <button onClick={handleByCompanyBtn}>By Company</button>
                    </div>
                    {/* here we need change when are getting data from the backend */}
                    {/* {showAllProducts.length === 0 ? (<h3>Product is not available.</h3>) : selectedCompanyProduct.length > 0 ? ( */}
                    {chemArray.length === 0 ? (<h3>Product is not available.</h3>) : selectedCompanyProduct.length > 0 ? (
                        <div className="centerContainerInner">
                            <h5>Products of "{selectedField.replace("@", "")}"</h5>
                            {selectedCompanyProduct.map((company, index) => {
                                return company.productName.map((prod, i) => {
                                    return (
                                        <div key={index + "-" + i} onClick={() => handlePopupBox(prod)} className='centerChemCompContainer'>
                                            <p>{prod}</p>
                                            <div className="companyContainer">
                                                {openPopup && openBoxInfo === prod && (<div className={`centerContainerPopUp`}>
                                                    <p>{openBoxInfo}</p>
                                                    <div className="companyContainer">
                                                        {allCompanyOnPopupBox.map((companys, index) => {
                                                            return companys.companyName.map((prod, i) => {
                                                                return (
                                                                    <div key={index + "-" + i} className="companyContainerInner">
                                                                        <a href={companys.companyLink[i]} target='_blank' rel="noopener noreferrer">{prod}</a>
                                                                    </div>
                                                                )
                                                            })
                                                        })}
                                                    </div>
                                                </div>)}
                                            </div>
                                        </div>
                                    )
                                })
                            })}
                        </div>
                    ) :
                        (searchByCompany === "-1" && searchByProduct === "-1" ? (<h2>Your search for '{searchBox}' was not found.</h2>)
                            :
                            ((searchByCompany.length > 0 || searchByProduct.length > 0) ? (
                                <div className="centerContainerInner">
                                    <h5>Your Search Result For "{searchBox}"</h5>
                                    {searchByProduct.length > 0 ? (
                                        searchByProduct.map((product, index) => {
                                            return (
                                                <div key={index} onClick={() => handlePopupBox(product.productName)} className='centerChemCompContainer'>
                                                    <p>{product.productName}</p>
                                                    <div className="companyContainer">
                                                        {openPopup && openBoxInfo === product.productName && (<div className={`centerContainerPopUp`}>
                                                            <p>{openBoxInfo}</p>
                                                            <div className="companyContainer">
                                                                {allCompanyOnPopupBox.map((companys, index) => {
                                                                    return companys.companyName.map((prod, i) => {
                                                                        return (
                                                                            <div key={index + "-" + i} className="companyContainerInner">
                                                                                <a href={companys.companyLink[i]} target='_blank' rel="noopener noreferrer">{prod}</a>
                                                                            </div>
                                                                        )
                                                                    })
                                                                })}
                                                            </div>
                                                        </div>)}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        searchByCompany.map((company, index) => {
                                            return company.productName.map((prod, i) => {
                                                return (
                                                    <div key={index + "-" + i} onClick={() => handlePopupBox(prod)} className='centerChemCompContainer'>
                                                        <p>{prod}</p>
                                                        <div className="companyContainer">
                                                            {openPopup && openBoxInfo === prod && (<div className={`centerContainerPopUp`}>
                                                                <p>{openBoxInfo}</p>
                                                                <div className="companyContainer">
                                                                    {allCompanyOnPopupBox.map((companys, index) => {
                                                                        return companys.companyName.map((prod, i) => {
                                                                            return (
                                                                                <div key={index + "-" + i} className="companyContainerInner">
                                                                                    <a href={companys.companyLink[i]} target='_blank' rel="noopener noreferrer">{prod}</a>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    })}
                                                                </div>
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        })

                                    )}
                                </div>
                            )
                                :
                                selectedChemName.length > 0 ? (<>
                                    <div className="centerContainerInner">
                                        <h5>Selected Products</h5>
                                        <div className="selectedProduct">
                                            <p>{selectedField}</p>
                                            <div className="selectedCompanyContainer">
                                                {selectedChemName.map((companys, index) => {
                                                    return companys.companyName.map((prod, i) => {
                                                        return (
                                                            <div key={index + "-" + i} className="companyContainerInner">
                                                                <a href={companys.companyLink[i]} target='_blank' rel="noopener noreferrer">{prod}</a>
                                                            </div>
                                                        )
                                                    })
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>) :
                                    (
                                        <>
                                            <h5>All Products</h5>
                                            <div className="searchProductBar">
                                                <input className='searchProductInput' placeholder='search product or company' type="text" onChange={(e) => setSearchBox(e.target.value)} />
                                                <i onClick={handleSearchBox} className="ri-search-line"></i>
                                            </div>
                                            {
                                                uniqueLetters.map(letter => (
                                                    <div key={letter} className='centerContainerInner'>
                                                        <h6>{letter}</h6>
                                                        <div className='centerContainerBox'>
                                                            {
                                                                sortedAllProducts.filter((chemName) => chemName.toUpperCase().charAt(0) === letter
                                                                ).map((chemName, index) => {
                                                                    return (<div key={index} onClick={() => handlePopupBox(chemName)} className='centerContainerBoxInner'>
                                                                        <p>{chemName}</p>
                                                                        {openPopup && openBoxInfo === chemName && (<div className={`centerContainerPopUp`}>
                                                                            <p>{openBoxInfo}</p>
                                                                            <div className="companyContainer">
                                                                                {allCompanyOnPopupBox.map((companys, index) => {
                                                                                    return companys.companyName.map((prod, i) => {
                                                                                        return (
                                                                                            <div key={index + "-" + i} className="companyContainerInner">
                                                                                                <a href={companys.companyLink[i]} target='_blank' rel="noopener noreferrer">{prod}</a>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                })}
                                                                            </div>
                                                                        </div>)}
                                                                    </div>)
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        </>)
                            ))}
                </div>
                <div className={`rightContainer ${showCompanyList ? "" : "hideContainer"}`}>
                    <h5>By Company</h5>

                    <div className="rightContainerRadioBox">
                        <div className="dropDownContainerBox">
                            {allCompany.map((chem, index) => (
                                <div key={index} className="dropDownContainerBoxOuter">
                                    <label className='dropDownContainerBoxInner'>
                                        <span>{chem}</span>
                                        <input
                                            type="radio"
                                            name="companyName"
                                            checked={selectedField === `@${chem}`}
                                            onChange={() => handleCompanySelection(chem)}
                                        />
                                    </label>
                                    {/* Here we need to pass the id instead of  handleEditForm(chem) for identification*/}
                                    <i onClick={() => handleEditForm(chem)} className="ri-edit-box-fill editBox"></i>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >

            {showEditForm &&
                <EditProduct showAlert={showAlert} showEditForm={showEditForm} setShowEditForm={setShowEditForm} companyAllData={companyAllData} />
            }
        </>
    )
}

export default Home
