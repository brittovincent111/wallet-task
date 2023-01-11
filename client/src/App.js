import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegistartionPage from './Pages/userRegistartionPage/UserRegistrationPage';
import Navbar from './components/navbar/Navbar';
import NavbarPage from './Pages/navbarPage/NavbarPage';
import UserLandingPage from './Pages/userlandingPage/UserLandingPage';
import UserLoginPage from './Pages/userloginPage/UserLoginPage';
import ErrorPage from './components/errorPage/ErrorPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<UserRegistartionPage />}></Route>
        <Route path='/login' element={<UserLoginPage />}></Route>


        <Route path='/' element={<NavbarPage />}> 
          <Route index  element={<UserLandingPage />} />
          <Route  path='/errorPage' element={<ErrorPage/>}/>
         </Route>
          {/* <Route path='/'/> */}

      
      </Routes>


    </Router>

  );
}

export default App;
