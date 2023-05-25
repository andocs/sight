import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Technology from './pages/Technology';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/navbar.component';

function App() {

return (
  <div className='font-jost text-sky-800'>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>} >
          <Route path="/home" element={ <Home/>} />
        </Route>

        <Route path="/services" element={ <Services/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/technology" element={ <Technology/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={<Register/>}/>
        
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </div>
  );
};

export default App;