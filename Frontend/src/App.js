import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Index from "./Components/Index";
import Footer from "./Components/Footer";
import LoginAdmin from "./Components/Login";
import SignupAdmin from "./Components/SignupAdmin";
import Contact from "./Components/Contact";
import WhyTaskTrek from "./Components/WhyTaskTrek";
import DashboardTeam from "./Components/DashboardTeam";
import DashboardAdmin from "./Components/DashboardAdmin";
import DashboardAdminTeam from "./Components/DashboardAdminTeam";
import DashboardAdminTask from "./Components/DashboardAdminTask";
import AdminState from "./Context/AdminState";
import DashboardAdminAllTask from "./Components/DashboardAdminAllTask";
import TeamMemberState from "./Context/TeamMemebrState";
import DashboardTeamToDo from './Components/DashboardTeamToDo';
import DashboardTeamDone from "./Components/DashboardTeamDone";
import DashboardAdminDetail from "./Components/DashBoardAdminDetail";
import DashboardTeamDetail from "./Components/DashBoardTeamDetail";
import DashboardTeamSearch from "./Components/DashBoardTeamSearch";
import DashboardAdminSearch from "./Components/DashBoardAdminSearch";
import ForgotPassword from "./Components/ForgotPassword";
import SetNewPassword from "./Components/SetNewPassword";
function App() {
  return (
    <BrowserRouter>
    <AdminState>
    <TeamMemberState>
      <Navbar/>
      <Routes>
        <Route exact path = '/' element={<Index/>}></Route>
        <Route exact path = '/dashadmin' element={<DashboardAdmin/>}></Route>
        <Route exact path = '/dashadmin/search' element={<DashboardAdminSearch/>}></Route>
        <Route exact path = '/dashadmin/d' element={<DashboardAdminDetail />}></Route>
        <Route exact path = '/dashadmin/addteam' element={<DashboardAdminTeam/>}></Route>
        <Route exact path = '/dashadmin/add' element={<DashboardAdminTask/>}></Route>
        <Route exact path = '/dashadmin/all' element={<DashboardAdminAllTask/>}></Route>
        <Route exact path = '/dashteam' element={<DashboardTeam dashValue ="All"/>}></Route>
        <Route exact path = '/dashteam/todo' element={<DashboardTeamToDo dashValue ="Todo"/>}></Route>
        <Route exact path = '/dashteam/done' element={<DashboardTeamDone dashValue ="Done"/>}></Route>
        <Route exact path = '/dashteam/detail' element={<DashboardTeamDetail />}></Route>
        <Route exact path = '/dashteam/search' element={<DashboardTeamSearch />}></Route>
        <Route exact path = '/contact' element={<Contact/>}></Route>
        <Route exact path = '/login' element={<LoginAdmin/>}></Route>
        <Route exact path = '/signup/admin' element={<SignupAdmin/>}></Route>
        <Route exact path = '/about' element={<WhyTaskTrek/>}></Route>
        <Route exact path = '/forgot' element={<ForgotPassword/>}></Route>
        <Route exact path = '/newPassword' element={<SetNewPassword/>}></Route>
      </Routes>
      <Footer/>
    </TeamMemberState>
      </AdminState>
    </BrowserRouter>
  );
}

export default App;
