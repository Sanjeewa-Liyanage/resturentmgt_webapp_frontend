import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/homepage";
import AdminPage from "./pages-admin/admin";
import NotFound from "./components/NotFound";
import TestComponent from "./components/test/test";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  return (
    <BrowserRouter>
        <Routes path ="/">
         <Route path="/" element={<HomePage/>} />
         <Route path="/admin/*" element={<AdminPage/>} />
         <Route path = "*" element={<NotFound />} />
         {/* <Route path = "/test" element ={<TestComponent />} /> */}
         <Route path = "/login" element={<Login />} />
         <Route path ="/register" element={<Register />}/>

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
