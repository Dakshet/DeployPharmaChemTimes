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

    // const chemArray = useMemo(() => [
    //     {
    //         name: "Acetone",
    //         companyName: [
    //             {
    //                 company: "xys",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Ammonia",
    //         companyName: [
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Boric Acid",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             }]
    //     },
    //     {
    //         name: "Acetic Acid",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Calcium Carbonate",
    //         companyName: [
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             },
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             }]
    //     },
    //     {
    //         name: "ascorbic Acid",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Benzene",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Barium Sulfate",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Aluminum Hydroxide Hydroxide Hydroxide",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Butane Butane Butane Butane Butane Butane Butane ButaneButane Butane Butane Butane",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Carbon Dioxide",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Chloroform",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Bromine",
    //         companyName: [
    //             {
    //                 company: "Amazon",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "Citric sulfate Acid",
    //         companyName: [
    //             {
    //                 company: "hell amazons",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     {
    //         name: "copper Sulfate acid",
    //         companyName: [
    //             {
    //                 company: "zenth",
    //                 link: "https://www.amazon.com"
    //             },
    //             {
    //                 company: "Filpkard",
    //                 link: "https://www.flipkart.com"
    //             },
    //             {
    //                 company: "Ebay",
    //                 link: "https://www.ebay.com"
    //             }]
    //     },
    //     // D
    //     {
    //         name: "Dichloromethane",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },
    //     {
    //         name: "Diatomic Oxygen",
    //         companyName: [
    //             { company: "ChemSupply", link: "https://www.chemsupply.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Dextrin",
    //         companyName: [
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Dodecane",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //         ]
    //     },

    //     // E
    //     {
    //         name: "Ethanol",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylene Glycol",
    //         companyName: [
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Erythritol",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethyl Acetate",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylene Dichloride",
    //         companyName: [
    //             { company: "ChemSupply", link: "https://www.chemsupply.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Epichlorohydrin",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylbenzene",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },

    //     // F
    //     {
    //         name: "Formaldehyde",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Fluorine",
    //         companyName: [
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Ferrous Sulfate",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Fumaric Acid",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Dichloromethane",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },
    //     {
    //         name: "Diatomic Oxygen",
    //         companyName: [
    //             { company: "ChemSupply", link: "https://www.chemsupply.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Dextrin",
    //         companyName: [
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Dodecane",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethanol",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylene Glycol",
    //         companyName: [
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Erythritol",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethyl Acetate",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylene Dichloride",
    //         companyName: [
    //             { company: "ChemSupply", link: "https://www.chemsupply.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Epichlorohydrin",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Ethylbenzene",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },

    //     // F
    //     {
    //         name: "Formaldehyde",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Fluorine",
    //         companyName: [
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Ferrous Sulfate",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },
    //     {
    //         name: "Fumaric Acid",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     }, // G
    //     {
    //         name: "Glycerol",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },
    //     {
    //         name: "Glutaric Acid",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Gold Chloride",
    //         companyName: [
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },

    //     // H
    //     {
    //         name: "Hydrochloric Acid",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },
    //     {
    //         name: "Hydrogen Peroxide",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Hexane",
    //         companyName: [
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },

    //     // I
    //     {
    //         name: "Iodine",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Isopropyl Alcohol",
    //         companyName: [
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },

    //     // J
    //     {
    //         name: "Juniper Tar",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },

    //     // K
    //     {
    //         name: "Ketones",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //         ]
    //     },

    //     // L
    //     {
    //         name: "Lactic Acid",
    //         companyName: [
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //         ]
    //     },
    //     {
    //         name: "Lithium Chloride",
    //         companyName: [
    //             { company: "ChemSupply", link: "https://www.chemsupply.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },

    //     // M
    //     {
    //         name: "Methanol",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     },
    //     {
    //         name: "Magnesium Sulfate",
    //         companyName: [
    //             { company: "ChemBay", link: "https://www.chembay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },

    //     // N
    //     {
    //         name: "Nitric Acid",
    //         companyName: [
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //             { company: "Amazon", link: "https://www.amazon.com" },
    //             { company: "Flipkart", link: "https://www.flipkart.com" },
    //         ]
    //     },
    //     {
    //         name: "Naphthalene",
    //         companyName: [
    //             { company: "Alibaba", link: "https://www.alibaba.com" },
    //             { company: "ChemWorld", link: "https://www.chemworld.com" },
    //             { company: "Ebay", link: "https://www.ebay.com" },
    //         ]
    //     }

    // ].sort((a, b) => a.name.localeCompare(b.name)), [])

    // Extra

    // console.log(showAllProducts);



    const chemArray = useMemo(() => {
        return [...showAllProducts].sort((a, b) => a.name.localeCompare(b.name))
    }, [showAllProducts])

    const letters = useMemo(() => Array.from(new Set(chemArray.map(chem => chem.name.charAt(0).toUpperCase()))), [chemArray])

    // Extract unique company names
    const allCompany = useMemo(() => Array.from(
        new Set(chemArray.flatMap(chem => chem.companyName.map(company => company.company)))
    ).sort((a, b) => a.localeCompare(b)), [chemArray]);



    //Handle Letter Selection
    const handleLetterSelection = useCallback((letter) => {

        const sortedLetterArray = chemArray.filter((chem) =>
            chem.name.toUpperCase().startsWith(letter.toUpperCase())
        );

        setFilteredChemicals(sortedLetterArray);
        setSelectedLetter(letter);
        setSelectedField(letter)
        // console.log(letter)
    }, [chemArray])


    // Handle Chemical Selection 
    const handleChemicalSelection = useCallback((chemicalName) => {

        setSelectedChemName(chemArray.filter(chem => chem.name === chemicalName));
        setSelectedChemicalCompany([])
        setSelectedCompanyProduct([])
        setSelectedField(chemicalName)
        setShowProductList(false);
    }, [chemArray])


    // Handle Company Selection 
    const handleCompanySelection = useCallback((companyName) => {
        const filteredProducts = chemArray.filter(chem =>
            chem.companyName.some(comp => comp.company.toLowerCase() === companyName.toLowerCase())
        );
        setSelectedCompanyProduct(filteredProducts);
        setSelectedLetter('');
        setSelectedField(`@${companyName}`);
        setShowCompanyList(false);
    }, [chemArray]);


    // Handle Popup Box
    const handlePopupBox = useCallback((chemName) => {
        setOpenPopup(true);
        setOpenBoxInfo(chemName);
    }, [])


    // Handle Popup Close Box
    const closePopup = useCallback(() => {
        setOpenPopup(false);
        setOpenBoxInfo({});
    }, []);


    const handleSearchBox = () => {
        const query = searchBox.toLowerCase();

        // Filter by chemical name or company name
        const results = chemArray.filter((chem) =>
            chem.name.toLowerCase().includes(query) ||
            chem.companyName.some((comp) =>
                comp.company.toLowerCase().includes(query)
            )
        );

        if (results.length === 0) {
            setSelectedChemicalCompany("-1");
        }
        else {
            setSelectedChemicalCompany(results);
        }
        setSelectedField("")
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
                    {/* <RadioLabel
                        id="radio-all"
                        label="ALL LIST"
                        checked={selectedField === "@#number"}
                        onChange={() => {
                            setSelectedField("@#number");
                            setSelectedChemName({});
                            setSelectedLetter("");
                            setSelectedChemicalCompany([]);
                            setSelectedCompanyProduct([]);
                        }}
                    /> */}
                    {letters.map(letter => (
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

                            {/* <RadioLabel
                                id={`radio-${letter}`}
                                label={letter}
                                checked={selectedField === letter || selectedField.charAt(0).toLowerCase() === letter.toLowerCase()}
                                onChange={() => handleLetterSelection(letter)}
                            /> */}
                            {selectedLetter === letter && (
                                <div className="dropDownContainerBox">
                                    {filteredChemicals.map((chem, index) => (
                                        <label key={index} className='dropDownContainerBoxInner' htmlFor={`radio-${letter}`}>
                                            <span>{chem.name}</span>
                                            <input
                                                type="radio"
                                                name="prodName"
                                                checked={selectedField === chem.name}
                                                onChange={() => handleChemicalSelection(chem.name)}
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
                {showAllProducts.length === 0 ? (<h3>Product is not available.</h3>) : selectedCompanyProduct.length > 0 ? (
                    <div className="centerContainerInner">
                        <h5>Selected Products of "{selectedField.replace("@", "")}"</h5>
                        {selectedCompanyProduct.map((chemComp, index) => {
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
                        })}
                    </div>
                ) :
                    (selectedChemicalCompany === "-1" ? (<h2>Your search for '{searchBox}' was not found.</h2>)
                        :
                        (selectedChemicalCompany.length > 0 ? (
                            <div className="centerContainerInner">
                                <h5>Your Search Result For "{searchBox}"</h5>
                                {selectedChemicalCompany.map((chemComp, index) => {
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
                                })}
                            </div>
                        )
                            :
                            selectedChemName.length === 1 ? (<>
                                <div className="centerContainerInner">
                                    <h5>Selected Products</h5>
                                    <div className="selectedProduct">
                                        <p>{selectedChemName[0].name}</p>
                                        <div className="selectedCompanyContainer">
                                            {selectedChemName[0].companyName.map((companys, index) => {
                                                return (
                                                    <div key={index} className="companyContainerInner">
                                                        <a href={companys.link} target='_blank'>{companys.company}</a>
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
                                            letters.map(letter => (
                                                <div key={letter} className='centerContainerInner'>
                                                    <h6>{letter}</h6>
                                                    <div className='centerContainerBox'>
                                                        {
                                                            chemArray.filter((chemName) => letter === chemName.name.toUpperCase().charAt(0)
                                                            ).map((chemName, index) => {
                                                                return (<div key={index} onClick={() => handlePopupBox(chemName)} className='centerContainerBoxInner'>
                                                                    <p>{chemName.name}</p>
                                                                    {openPopup && openBoxInfo.name === chemName.name && (<div className={`centerContainerPopUp`}>
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
                    {/* )}
                        </div>
                    ))} */}
                </div>
            </div>
        </div >
    )
}

export default Home
