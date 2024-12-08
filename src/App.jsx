import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import HomePage from "./pages/homepage";
import AdminPage from "./pages-admin/admin";
import NotFound from "./components/NotFound";
import TestComponent from "./components/test/test";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Category from "./pages/categories/category";
import AdminRooms from "./pages-admin/adminrooms/adminrooms";
import AddRoom from "./pages-admin/adminrooms/addroom/addroom";
import CategoryDetails from "./pages/pages-client/categorydetails"
import { Toaster } from "react-hot-toast";
import { UpdateRoom } from "./pages-admin/adminrooms/updateroom/updateroom";
import RoomDetails from "./pages/pages-client/roomdetails";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false}/>
        <Routes path ="/">
         <Route path="/" element={<HomePage/>} />
         <Route path="/admin/*" element={<AdminPage/>} />
         <Route path = "*" element={<NotFound />} />
         <Route path = "/test" element ={<TestComponent />} />
         <Route path = "/login" element={<Login />} />
         <Route path ="/register" element={<Register />}/>
         
         <Route path="/category/:id" element={<CategoryDetails />} />
         <Route path="/rooms/:roomId" element = {<RoomDetails/>}/>

         {/* <Route path="/categories" element={<Category/>}/> */}
         

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
