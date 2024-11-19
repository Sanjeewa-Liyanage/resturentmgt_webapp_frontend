import { Link, Route, Routes } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiViewList, CiUser, CiGrid41, CiImageOn, CiChat1 } from "react-icons/ci";
import AdminBooking from "./bookings/adminbooking";
import AdminCategories from "./categories/admincategories";
import AdminRooms from "./adminrooms/adminrooms";
import AdminUsers from "./uses/adminusers";
import AdminFeedbacks from "./adminfeedbacks/adminfeedbacks";
import AdminGallery from "./admin gallery/admingallery";
import Category from "../pages/categories/category";

export default function AdminPage() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  return (
   
    <>
      <div className="w-full max-h-[100vh] overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-[20%] bg-blue-400 h-[100vh] flex flex-col space-y-4 p-4">
          <Link
            to="/admin/bookings"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiBookmarkCheck />
            <span>Bookings</span>
          </Link>

          <Link
            to="/admin/categories"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiViewList />
            <span>Categories</span>
          </Link>

          <Link
            to="/admin/rooms"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiGrid41 />
            <span>Rooms</span>
          </Link>

          <Link
            to="/admin/users"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiUser />
            <span>Users</span>
          </Link>

          <Link
            to="/admin/feedbacks"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiChat1 />
            <span>Feedbacks</span>
          </Link>

          <Link
            to="/admin/gallery-items"
            className="text-white text-[24px] hover:font-bold flex items-center space-x-2"
          >
            <CiImageOn />
            <span>Gallery Items</span>
          </Link>
        </div>

        {/* Content Section */}
        <div className="w-[80%] max-h-[100vh] overflow-y-scroll bg-blue-800 ">
          {/* Add your dynamic content or routing logic here */}
          <Routes path="/">
            
            <Route path="/bookings" element={<AdminBooking />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/feedbacks" element={<AdminFeedbacks />} />
            <Route path="/gallery-items" element={<AdminGallery />} />

          </Routes>

        </div>
      </div>
    </>
  );
}
