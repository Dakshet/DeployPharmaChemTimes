import './App.css';
import Home from './Pages/Home';
import Logo from './Components/Logo';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import NewsState from './Context/News/NewsState';
import { useState } from 'react';
import Footer from './Components/Footer';
import News from './Pages/News';
import Article from './Pages/Article';
import Interview from './Pages/Interview';
import Event from './Pages/Event';
import Job from './Pages/Job';
import Magazine from './Pages/Magazine';
import SpecificNews from './Pages/SpecificNews';
import ScrollToTop from './Components/ScrollToTop';
import AddNews from './Pages/AddNews';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SearchNews from './Pages/SearchNews';
import Alert from './Components/Alert';
import AddMagazine from './Pages/AddMagazine';
import AdSection from './Components/AdSection';
import AddAD from './Pages/AddAD';
import ADPage from './Pages/ADPage';
import AdminPage from './Pages/AdminPage';
import AddProduct from './Pages/AddProduct';

function App() {

  const [showSearch, setShowSearch] = useState(false);

  const [alert, setAlert] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2100);
  }

  return (
    <NewsState>
      <div>
        <Router>
          <Logo />
          <Navbar showAddMenu={showAddMenu} setShowAddMenu={setShowAddMenu} showAlert={showAlert} showProfile={showProfile} setShowProfile={setShowProfile} showSearch={showSearch} setShowSearch={setShowSearch} />
          {/* <ShowAds showProfile={showProfile} /> */}
          <AdSection showProfile={showProfile} />
          <ScrollToTop />
          <Routes>

            <Route index exact path='/' element={<Home showAddMenu={showAddMenu} />} />
            <Route exact path='/news' element={<News showAddMenu={showAddMenu} />} />
            <Route exact path='/article' element={<Article showAddMenu={showAddMenu} />} />
            <Route exact path='/interview' element={<Interview showAddMenu={showAddMenu} />} />
            <Route exact path='/event' element={<Event showAddMenu={showAddMenu} />} />
            <Route exact path='/job' element={<Job showAddMenu={showAddMenu} />} />
            <Route exact path='/magazine' element={<Magazine showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/:tag/:id' element={<SpecificNews showAddMenu={showAddMenu} showAlert={showAlert} />} />
            {/* <Route exact path='/snews/:tag/:id' element={<SpecificNews showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} /> */}
            <Route exact path='/addnews' element={<AddNews showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/addmagazine' element={<AddMagazine showProfile={showProfile} showAddMenu={showAddMenu} showAlert={showAlert} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route exact path='/search/news' element={<SearchNews showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/add/advertisement' element={<AddAD showAlert={showAlert} showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/advertisement' element={<ADPage showAlert={showAlert} showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/adminpage' element={<AdminPage showAlert={showAlert} showProfile={showProfile} showAddMenu={showAddMenu} />} />
            <Route exact path='/add/product' element={<AddProduct showAlert={showAlert} showProfile={showProfile} />} />

            <Route path="*" element={<Home showProfile={showProfile} showAddMenu={showAddMenu} />} />
          </Routes>
          <Footer />
          <Alert alert={alert} />
        </Router>
      </div>
    </NewsState>
  );
}

// function ShowAds() {
//   const location = useLocation();
//   const hideOnRoutes = ['/', '/news', '/article', '/interview', '/event', '/job', '/magazine', '/search/news',]; // Routes where AD should be display

//   return hideOnRoutes.includes(location.pathname) && <AdSection />;
// }

export default App;
