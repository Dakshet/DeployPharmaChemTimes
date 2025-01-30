import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import NewsContext from '../Context/News/NewsContext'
import "./Home.css"

const Home = () => {

    const { visitCounter, showAllProducts, fetchProductChemicalData, } = useContext(NewsContext);

    const [filteredChemicals, setFilteredChemicals] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [openBoxInfo, setOpenBoxInfo] = useState({});
    const [selectedChemName, setSelectedChemName] = useState({});
    const [searchBox, setSearchBox] = useState("");
    const [selectedChemicalCompany, setSelectedChemicalCompany] = useState([])
    const [selectedCompanyProduct, setSelectedCompanyProduct] = useState([])
    const [selectedField, setSelectedField] = useState("")
    const [showProductList, setShowProductList] = useState(false)
    const [showCompanyList, setShowCompanyList] = useState(false)
    const [allCompanyOnPopupBox, setAllCompanyOnPopupBox] = useState([]);




    const chemArray = useMemo(() => [
        {
            "companyName": "Amazon",
            "productName": ["Acetone", "Isopropyl Alcohol", "Ethanol"],
            "companyLink": "https://www.amazon.com"
        },
        {
            "companyName": "Walmart",
            "productName": ["Hydrogen Peroxide", "Methanol", "Chloroform"],
            "companyLink": "https://www.walmart.com"
        },
        {
            "companyName": "eBay",
            "productName": ["Sodium Hydroxide", "Sulfuric Acid", "Glycerin"],
            "companyLink": "https://www.ebay.com"
        },
        {
            "companyName": "Alibaba",
            "productName": ["Toluene", "Xylene", "Formaldehyde"],
            "companyLink": "https://www.alibaba.com"
        },
        {
            "companyName": "Home Depot",
            "productName": ["Ammonia Solution", "Denatured Alcohol", "Lactic Acid"],
            "companyLink": "https://www.homedepot.com"
        },
        {
            "companyName": "Lowe's",
            "productName": ["Propylene Glycol", "Boric Acid", "Acetic Acid"],
            "companyLink": "https://www.lowes.com"
        },
        {
            "companyName": "CVS Pharmacy",
            "productName": ["Rubbing Alcohol", "Ethanol", "Hydrogen Peroxide"],
            "companyLink": "https://www.cvs.com"
        },
        {
            "companyName": "Walgreens",
            "productName": ["Isopropanol", "Glycerin", "Methanol"],
            "companyLink": "https://www.walgreens.com"
        },
        {
            "companyName": "Target",
            "productName": ["Chloroform", "Sodium Hydroxide", "Acetone"],
            "companyLink": "https://www.target.com"
        },
        {
            "companyName": "Best Buy",
            "productName": ["Ethanol", "Toluene", "Xylene"],
            "companyLink": "https://www.bestbuy.com"
        },
        {
            "companyName": "Costco",
            "productName": ["Lactic Acid", "Acetic Acid", "Denatured Alcohol"],
            "companyLink": "https://www.costco.com"
        },
        {
            "companyName": "Sam's Club",
            "productName": ["Sulfuric Acid", "Boric Acid", "Hydrogen Peroxide"],
            "companyLink": "https://www.samsclub.com"
        },
        {
            "companyName": "Ace Hardware",
            "productName": ["Formaldehyde", "Ammonia Solution", "Methanol"],
            "companyLink": "https://www.acehardware.com"
        },
        {
            "companyName": "Grainger",
            "productName": ["Propylene Glycol", "Rubbing Alcohol", "Isopropanol"],
            "companyLink": "https://www.grainger.com"
        },
        {
            "companyName": "Uline",
            "productName": ["Xylene", "Chloroform", "Sulfuric Acid"],
            "companyLink": "https://www.uline.com"
        },
        {
            "companyName": "McMaster-Carr",
            "productName": ["Denatured Alcohol", "Glycerin", "Toluene"],
            "companyLink": "https://www.mcmaster.com"
        },
        {
            "companyName": "Staples",
            "productName": ["Boric Acid", "Ammonia Solution", "Lactic Acid"],
            "companyLink": "https://www.staples.com"
        },
        {
            "companyName": "Office Depot",
            "productName": ["Acetone", "Hydrogen Peroxide", "Propylene Glycol"],
            "companyLink": "https://www.officedepot.com"
        },
        {
            "companyName": "AliExpress",
            "productName": ["Formaldehyde", "Sodium Hydroxide", "Methanol"],
            "companyLink": "https://www.aliexpress.com"
        },
        {
            "companyName": "Menards",
            "productName": ["Acetic Acid", "Isopropyl Alcohol", "Ethanol"],
            "companyLink": "https://www.menards.com"
        }
    ])



    // const chemArray = useMemo(() => {
    //     return [...showAllProducts].sort((a, b) => a.name.localeCompare(b.name))
    // }, [showAllProducts])

    // const letters = useMemo(() => Array.from(new Set(chemArray.map(chem => chem.name.charAt(0).toUpperCase()))), [chemArray])



    const letters = useMemo(() => Array.from(new Set(chemArray.map(chem => chem.productName.map(prod => prod.charAt(0).toUpperCase())))), [chemArray])

    // Flatten the array and remove duplicates
    const uniqueLetters = Array.from(new Set(letters.flat())).sort((a, b) => a.localeCompare(b));


    // Extract unique company names
    const allCompany = useMemo(() => Array.from(
        new Set(chemArray.map(chem => chem.companyName))
    ).sort((a, b) => a.localeCompare(b)), [chemArray]);


    const sortedAllProducts = Array.from(
        new Set(
            chemArray
                .flatMap(chem => chem.productName) // Flatten all productName arrays into a single array
                .sort((a, b) => a.localeCompare(b)) // Sort the filtered names alphabetically
        )
    )


    //Handle Letter Selection
    const handleLetterSelection = useCallback((letter) => {

        // const sortedLetterArray = chemArray.filter((chem) =>
        //     chem.name.toUpperCase().startsWith(letter.toUpperCase())
        // );

        const sortedLetterArray = sortedAllProducts.filter(name => name.charAt(0).toUpperCase() === letter) // Filter names starting with the specified letter
        setFilteredChemicals(sortedLetterArray);
        setSelectedLetter(letter);
        setSelectedField(letter)
        // console.log(letter)
    }, [chemArray])


    // Handle Chemical Selection 
    const handleChemicalSelection = useCallback((chemicalName) => {


        let selectedChemicalNameWithArray = chemArray.filter(chem =>
            chem.productName.some(prod => prod === chemicalName)
        );

        // Sort by the first property of the object (in this case, `name`)
        selectedChemicalNameWithArray.sort((a, b) => {
            const firstKeyA = Object.keys(a)[0]; // Get the first key of object `a`
            const firstKeyB = Object.keys(b)[0]; // Get the first key of object `b`
            return a[firstKeyA].localeCompare(b[firstKeyB]);
        });

        // console.log(arrayC);


        setSelectedChemName(selectedChemicalNameWithArray);
        setSelectedChemicalCompany([])
        setSelectedCompanyProduct([])
        setSelectedField(chemicalName)
        setShowProductList(false);
    }, [chemArray])


    // Handle Company Selection 
    // const handleCompanySelection = useCallback((companyName) => {
    //     const filteredProducts = chemArray.filter(chem =>
    //         chem.companyName.some(comp => comp.company.toLowerCase() === companyName.toLowerCase())
    //     );
    //     setSelectedCompanyProduct(filteredProducts);
    //     setSelectedLetter('');
    //     setSelectedField(`@${companyName}`);
    //     setShowCompanyList(false);
    // }, [chemArray]);


    // Handle Popup Box
    const handlePopupBox = useCallback((chemName) => {
        setOpenPopup(true);
        setOpenBoxInfo(chemName);
        let selectedChemicalNameWithArray = chemArray.filter(chem =>
            chem.productName.some(prod => prod === chemName)
        );

        // Sort by the first property of the object (in this case, `name`)
        selectedChemicalNameWithArray.sort((a, b) => {
            const firstKeyA = Object.keys(a)[0]; // Get the first key of object `a`
            const firstKeyB = Object.keys(b)[0]; // Get the first key of object `b`
            return a[firstKeyA].localeCompare(b[firstKeyB]);
        });

        setAllCompanyOnPopupBox(selectedChemicalNameWithArray)
    }, [])


    // Handle Popup Close Box
    const closePopup = useCallback(() => {
        setOpenPopup(false);
        setOpenBoxInfo({});
    }, []);


    const handleSearchBox = () => {
        const query = searchBox.toLowerCase();

        //Filtered by company name
        let arrayC = [];

        for (let i = 0; i < chemArray.length; i++) {

            let filterProducts = chemArray[i].productName.filter(product =>
                product.toLowerCase().includes(query)
            )

            if (filterProducts.length > 0) {
                arrayC.push({
                    ...chemArray[i],
                    productName: filterProducts
                })
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
            let uniqueProducts = Array.from(productMap.values());
            console.log(uniqueProducts);
            return uniqueProducts;


        }
        else {
            for (let i = 0; i < chemArray.length; i++) {

                if (chemArray[i].companyName.toLowerCase() === query) {
                    arrayC.push(chemArray[i])
                }
            }
            console.log(arrayC)
            return arrayC;
        }



        // Sort by the first property of the object (in this case, `name`)
        // selectedChemicalNameWithArray.sort((a, b) => {
        //     const firstKeyA = Object.keys(a)[0]; // Get the first key of object `a`
        //     const firstKeyB = Object.keys(b)[0]; // Get the first key of object `b`
        //     return a[firstKeyA].localeCompare(b[firstKeyB]);
        // });


        // const names = selectedChemicalNameWithArray.filter((prod) => prod.productName.toLowerCase() === query)

        // let arrayC = [];

        // for (let i = 0; i < selectedChemicalNameWithArray.length; i++) {
        //     for (let j = 0; j < selectedChemicalNameWithArray[i].productName.length; j++) {
        //         if (selectedChemicalNameWithArray[i].productName[j].toLowerCase().includes(query)) {
        //             arrayC.push(selectedChemicalNameWithArray[i].productName[j])
        //         }
        //     }
        // }

        // const filteredProducts = Array.from(new Set(selectedChemicalNameWithArray
        //     .flatMap((item) => item.productName) // Flatten the array of product names
        //     .filter((productName) => productName.toLowerCase().includes(query))));

        // console.log(filteredProducts.sort((a, b) => a.localeCompare(b)));

        // console.log(selectedChemicalNameWithArray);


        // Comment out in the last
        // if (selectedChemicalNameWithArray.length === 0) {
        //     setSelectedChemicalCompany("-1");
        // }
        // else {
        //     setSelectedChemicalCompany(selectedChemicalNameWithArray);
        // }
        // setSelectedField("")
    };

    const handleByProductBtn = useCallback(() => {
        setShowProductList(true);
    }, [])

    const handleByCompanyBtn = useCallback(() => {
        setShowCompanyList(true);
    }, [])


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


    // console.log(showAllProducts)

    // useEffect(() => {
    //     visitCounter();
    //     fetchProductChemicalData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])


    // // Title change
    // useEffect(() => {
    //     document.title = "PharmaChem Times";  // Set the document title to the news title
    // }, []);


    return (
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
                            onChange={() => { setSelectedField("@#number"); setSelectedChemName({}); setSelectedLetter(""); setSelectedChemicalCompany([]); setSelectedCompanyProduct([]) }}
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
                <div className="centerContainerBtn">
                    <button onClick={handleByProductBtn}>By Product</button>
                    <button onClick={handleByCompanyBtn}>By Company</button>
                </div>
                <button onClick={() => { setSelectedChemName({}); setSelectedLetter(""); setSelectedChemicalCompany([]); setSelectedCompanyProduct([]) }} className='centerContainerAllListBtn'>All List</button>
                {/* here we need change when are getting data from the backend */}
                {/* {showAllProducts.length === 0 ? (<h3>Product is not available.</h3>) : selectedCompanyProduct.length > 0 ? ( */}
                {chemArray.length === 0 ? (<h3>Product is not available.</h3>) : selectedCompanyProduct.length > 0 ? (
                    <div className="centerContainerInner">
                        <h5>Selected Products of "{selectedField.replace("@", "")}"</h5>
                        {selectedCompanyProduct.map((chemComp, index) => {
                            return (
                                <div key={index} onClick={() => handlePopupBox(chemComp)} className='centerChemCompContainer'>
                                    <p>{chemComp.companyName}</p>
                                    {/* {openPopup && openBoxInfo.name === chemComp.name && (<div className={`centerContainerPopUp`}>
                                        <p>{openBoxInfo.name}</p>
                                        <div className="companyContainer">
                                            {openBoxInfo.companyName.map((companys, index) => {
                                                return (
                                                    <div key={index} className="companyContainerInner">
                                                        <a href={companys.link} target='_blank' rel="noopener noreferrer">{companys.company}</a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>)} */}
                                </div>
                            )
                        })}
                    </div>
                ) :
                    (selectedChemicalCompany === "-1" ? (<h2>Your search for '{searchBox}' was not found.</h2>)
                        :
                        (selectedChemicalCompany.length > 0 ? (
                            <div className="centerContainerInner">
                                <h5>Your Search Result For "{searchBox}"</h5>
                                {/* {selectedChemicalCompany.map((chemComp, index) => {
                                    return (
                                        <div key={index} onClick={() => handlePopupBox(chemComp)} className='centerChemCompContainer'>
                                            <p>{chemComp.name}</p>
                                            {openPopup && openBoxInfo.name === chemComp.name && (<div className={`centerContainerPopUp`}>
                                                <p>{openBoxInfo.name}</p>
                                                <div className="companyContainer">
                                                    {openBoxInfo.companyName.map((companys, index) => {
                                                        return (
                                                            <div key={index} className="companyContainerInner">
                                                                <a href={companys.link} target='_blank' rel="noopener noreferrer">{companys.company}</a>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>)}
                                        </div>
                                    )
                                })} */}
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
                                                return (
                                                    <div key={index} className="companyContainerInner">
                                                        <a href={companys.companyLink} target='_blank' rel="noopener noreferrer">{companys.companyName}</a>
                                                    </div>
                                                )
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
                                                                        <p>{openBoxInfo.name}</p>
                                                                        <div className="companyContainer">
                                                                            {allCompanyOnPopupBox.map((companys, index) => {
                                                                                return (
                                                                                    <div key={index} className="companyContainerInner">
                                                                                        <a href={companys.companyLink} target='_blank' rel="noopener noreferrer">{companys.companyName}</a>
                                                                                    </div>
                                                                                )
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
            {/* <div className={`rightContainer ${showCompanyList ? "" : "hideContainer"}`}>
                <h5>By Company</h5>

                <div className="rightContainerRadioBox">
                    <div className="dropDownContainerBox">
                        {allCompany.map((chem, index) => (
                            <label key={index} className='dropDownContainerBoxInner'>
                                <span>{chem}</span>
                                <input
                                    type="radio"
                                    name="companyName"
                                    checked={selectedField === `@${chem}`}
                                    onChange={() => handleCompanySelection(chem)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            </div> */}
        </div >
    )
}

export default Home
