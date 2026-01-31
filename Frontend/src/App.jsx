import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";


function App() {
 

  return (
    <>
     <Navbar/>
     
     <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/jobs" element={<Jobs/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

     </Routes>
     
    </>
  )
}

export default App
