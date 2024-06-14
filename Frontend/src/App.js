import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Index from "./Components/Index";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path = '/' element={<Index/>}></Route>
        <Route exact path = '/login' element={<Login/>}></Route>
        <Route exact path = '/signup' element={<Signup/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
