import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './pages/PrivateRoute';
function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
        <Route path="/offers" element={<Offers/>}> </Route>
        <Route path='/profile' element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}> </Route>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}> </Route>
        <Route path="/sign-up" element={<SignUp/>}> </Route>
      </Routes>
    </Router>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    
      </>
  );
}

export default App;
