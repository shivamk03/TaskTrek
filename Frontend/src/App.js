import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Index from "./Components/Index";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import LoginAdmin from "./Components/LoginAdmin";
import SignupAdmin from "./Components/SignupAdmin";
import SignInHandler from "./Components/SignInHandler";
import Contact from "./Components/Contact";
import WhyTaskTrek from "./Components/WhyTaskTrek";
import DashboardTeam from "./Components/DashboardTeam";
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path = '/' element={<Index/>}></Route>
        <Route exact path = '/dashteam' element={<DashboardTeam dashValue ="All"/>}></Route>
        <Route exact path = '/dashteam/todo' element={<DashboardTeam dashValue ="Todo"/>}></Route>
        <Route exact path = '/dashteam/done' element={<DashboardTeam dashValue ="Done"/>}></Route>
        <Route exact path = '/dashteam/detail' element={<DashboardTeam details ="true"/>}></Route>
        <Route exact path = '/contact' element={<Contact/>}></Route>
        <Route exact path = '/login/admin' element={<LoginAdmin/>}></Route>
        <Route exact path = '/login/team' element={<Login/>}></Route>
        <Route exact path = '/login/handler' element={<SignInHandler/>}></Route>
        <Route exact path = '/signup/admin' element={<SignupAdmin/>}></Route>
        <Route exact path = '/about' element={<WhyTaskTrek/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
