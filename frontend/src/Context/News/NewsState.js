import React, { useState } from 'react'
import NewsContext from './NewsContext'
import { useDispatch } from 'react-redux';
import { storeUserLogin } from '../../redux/counter/counterSlice';

const NewsState = (props) => {

    const host = process.env.REACT_APP_SECRET_KEY;

    const pageInitial = [];

    const [pageNews, setPageNews] = useState(pageInitial);

    const [specificNews, setSpecificNews] = useState({})

    const dispatch = useDispatch();

    const commentInitial = [];

    const [commentNews, setCommentNews] = useState(commentInitial);

    // const commentIdx = useSelector((state) => state.counter.commentIds)   //Newsid and client id are same so that it is not used

    const searchInitial = [];

    const [searchNewsResult, setSearchNewsResult] = useState(searchInitial);

    // const [userLogin, setUserLogin] = useState({});

    const [seeAds, setSeeAds] = useState([]);

    const [showAllProducts, setShowAllProducts] = useState([])


    //Fetch user using token
    const loginUserInfo = async () => {

        try {
            const response = await fetch(`${host}/user/loginuserdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.user) {
                    dispatch(storeUserLogin(json.user));
                }

                else {
                    console.log(json.Error);
                    // dispatch(storeUserLogin());
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                // dispatch(storeUserLogin(json.user));
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            // dispatch(storeUserLogin(json.user));
        }
    }


    //Fetch news for particular page
    const fetchPageSpecificNews = async (pageName) => {

        try {
            setPageNews([]);
            const response = await fetch(`${host}/news/fetchspecificpagenews?tag=${pageName}`, {
                // const response = await fetch(`https://deploy-news-web-backend.vercel.app/news/fetchspecificpagenews?tag=${pageName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.allNews) {
                    if (json.allNews === "No news found!") {
                        setPageNews([])
                    }
                    setPageNews(json.allNews);
                }

                else {
                    console.log(json.Error);
                    setPageNews([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setPageNews([]);
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setPageNews([]);
        }
    }



    //Fetch All ads
    const fetchPageSpecificAds = async (pageName) => {

        try {
            const response = await fetch(`${host}/news/fetchspecificpagenews?tag=${pageName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.allNews) {
                    setSeeAds(json.allNews)
                }

                else {
                    console.log(json.Error);
                    setSeeAds([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSeeAds([]);
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setSeeAds([]);
        }
    }



    //Fetch news using newsID
    const getNewsUsingId = async (id) => {
        // let newsIdx;
        // if (id !== undefined) {
        //     newsIdx = id;

        try {
            const response = await fetch(`${host}/news/fetchspecificnews/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    setSpecificNews(json.news)
                }

                else {
                    console.log(json.Error);
                    setSpecificNews({});
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSpecificNews({});
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
            setSpecificNews({});
        }
    }


    //Add news
    const addNews = async (title, body, tag, uPhoto) => {

        const formData = new FormData();
        formData.append("uPhoto", uPhoto)
        formData.append("title", title)
        formData.append("body", body)
        formData.append("tag", tag)

        try {

            const response = await fetch(`${host}/news/addnews`, {
                method: "POST",
                headers: {
                    "auth_token": localStorage.getItem("inews")
                },
                body: (formData)
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    // console.log(json.news);
                    setPageNews([...pageNews, json.news])
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }



    //Add Magazine
    const addMagazine = async (title, body, coverImageURL) => {

        const formData = new FormData();
        formData.append("coverImageURL", coverImageURL)
        formData.append("title", title)
        formData.append("body", body)

        try {

            const response = await fetch(`${host}/news/addmagazine`, {
                method: "POST",
                headers: {
                    "auth_token": localStorage.getItem("inews")
                },
                body: (formData)
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    window.open(`${json.news.body}`, "_blank", "noreferrer");
                    fetchPageSpecificNews("MAGAZINE");
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }


    //Delete News
    const deleteNews = async (id, tag) => {

        // const newNote = pageNews.filter((news) => news._id !== id)

        // console.log(newNote);

        // setPageNews(newNote);

        if (tag === "AD") {
            const newAdArray = seeAds.filter((ads) => ads._id !== id);
            setSeeAds(newAdArray);
        }

        const newsArray = pageNews.filter((newss) => newss._id !== id);

        setPageNews(newsArray)

        try {

            const response = await fetch(`${host}/news/deletenews?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    await response.json();
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



    //Delete Magazine
    const deleteMagazine = async (id, coverImageURL, pdfName) => {
        console.log(pdfName)

        try {

            const response = await fetch(`${host}/news/deletemagazine?id=${id}&pd=${pdfName}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    // console.log(json.news);
                    const newNote = pageNews.filter((news) => news._id !== id)
                    setPageNews(newNote);
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


    //Update News
    const editNews = async (id, title, desc, tag, prevDescription) => {


        try {

            const response = await fetch(`${host}/news/updatenews/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ title, desc, tag, prevDescription })
            })


            if (response.ok) {
                const json = await response.json();

                if (json.news) {

                    const newNote = JSON.parse(JSON.stringify(specificNews));

                    newNote.title = title;
                    newNote.body = desc;
                    newNote.tag = tag;

                    setSpecificNews(newNote);
                }

                else {
                    console.log(json.Error);
                    setSpecificNews({});
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSpecificNews({});
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setSpecificNews({});
        }
    }


    //Fetch Comment
    const fetchComment = async (id) => {

        try {

            const response = await fetch(`${host}/comment/fetchallcomments/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.comments) {
                    setCommentNews(json.comments);
                    // console.log(json.comments);
                }

                else {
                    console.log(json.Error);
                    setCommentNews([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setCommentNews([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setCommentNews([]);
        }
    }


    //Add new comment
    const addComment = async (newsIdAddComment, content) => {

        try {

            const response = await fetch(`${host}/comment/addcomment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ content, newsId: newsIdAddComment })
            })

            if (response.ok) {
                const json = await response.json();

                if (json.comment) {
                    setCommentNews(commentNews.concat(json.comment));
                }

                else {
                    console.log(json.Error);
                    setCommentNews(commentNews);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setCommentNews(commentNews);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setCommentNews(commentNews);
        }
    }


    //Fetch Serch News
    const fetchSearchNews = async (word) => {

        // console.log(json.news);

        // setSearchNewsResult(json.news);


        try {

            const response = await fetch(`${host}/news/fetchsearchuser?search=${word}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    setSearchNewsResult(json.news);
                }

                else {
                    console.log(json.Error);
                    setSearchNewsResult([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setSearchNewsResult([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setSearchNewsResult([]);
        }
    }



    //Count Visit
    const visitCounter = async () => {

        const date = new Date();
        let monthInNum = date.getMonth();

        try {

            const response = await fetch(`${host}/news/updatecount?month=${monthInNum}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();

                if (json.count) {
                    // console.log(json.count);

                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error counting news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            console.error("Error counting the news:", error);
        }


    }



    //Add addAdvertisement
    const addAdvertisement = async (body, coverImageURLs) => {


        const formData = new FormData();
        formData.append("coverImageURLs", coverImageURLs)
        formData.append("body", body)

        try {

            const response = await fetch(`${host}/news/addadvertisement`, {
                method: "POST",
                headers: {
                    "auth_token": localStorage.getItem("inews")
                },
                body: (formData)
            })

            if (response.ok) {
                const json = await response.json();

                if (json.news) {
                    console.log(json.news)
                    setSeeAds([...seeAds, json.news]);
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }



    //Add Product in DataBase
    const addProductData = async (companyName, productName, companyLink) => {


        try {

            const response = await fetch(`${host}/news/addproductdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ companyName, productName, companyLink })
            })

            if (response.ok) {
                const json = await response.json();
                if (json.chemical) {
                    // console.log(json.chemical);
                    //console.log(json.news)
                    // setSeeAds.concat(json.news);
                }

                else {
                    console.log(json.Error);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
            }

        } catch (error) {
            // Catch any network or unexpected errors
            console.error("Error fetching the news:", error);
        }
    }


    //Fetch All Data
    const fetchProductChemicalData = async () => {

        try {

            const response = await fetch(`${host}/news/fetchallproductdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const json = await response.json();
                // console.log(json)

                if (json.chemicals) {
                    setShowAllProducts(json.chemicals)
                }

                else {
                    console.log(json.Error);
                    setShowAllProducts([]);
                }
            }

            else {
                console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                setShowAllProducts([]);
            }

        } catch (error) {
            console.error("Error fetching the news:", error);
            setShowAllProducts([]);
        }

    }




    //Update News
    const editCompanyProducts = async (id, companyName, productName, companyLink) => {

        //First we see directly update or not then according to that take action



        try {

            const response = await fetch(`${host}/news/updatecompanydata/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
                body: JSON.stringify({ companyName, productName, companyLink })
            })


            if (response.ok) {
                const json = await response.json();

                if (json.companyData) {

                    // Update local state
                    const updatedProducts = showAllProducts.map((prod) =>
                        prod._id === id ? json.companyData : prod
                    );

                    // console.log(updatedProducts)
                    setShowAllProducts(updatedProducts)
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



    //Delete All product of company
    const deleteAllCompanyProducts = async (id) => {


        try {

            const response = await fetch(`${host}/news/deleteproductdata?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("inews")
                },
            })

            if (response.ok) {
                const json = await response.json();

                if (json.chemical) {

                    const deleteProducts = showAllProducts.filter((prod) => prod._id !== id);

                    // console.log(updatedProducts)
                    setShowAllProducts(deleteProducts)
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




    return (<NewsContext.Provider value={{ pageNews, fetchPageSpecificNews, fetchPageSpecificAds, getNewsUsingId, specificNews, setSpecificNews, addNews, deleteNews, editNews, commentNews, fetchComment, addComment, searchNewsResult, setSearchNewsResult, fetchSearchNews, loginUserInfo, addMagazine, deleteMagazine, visitCounter, addAdvertisement, seeAds, showAllProducts, addProductData, fetchProductChemicalData, editCompanyProducts, deleteAllCompanyProducts }}>
        {props.children}
    </NewsContext.Provider>
    )
}

export default NewsState
