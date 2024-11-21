import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  CiBookmarkCheck,
  CiViewList,
  CiUser,
  CiGrid41,
  CiImageOn,
  CiChat1,
} from "react-icons/ci";
import AdminBooking from "./bookings/adminbooking";
import AdminCategories from "./categories/admincategories";
import AdminRooms from "./adminrooms/adminrooms";
import AdminUsers from "./uses/adminusers";
import AdminFeedbacks from "./adminfeedbacks/adminfeedbacks";
import AdminGallery from "./admin gallery/admingallery";
import AddCategory from "./addcategory/addcategory";

import UserTags from "../components/userdata/userdatasmall";

export default function AdminPage() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login"; // Redirect to login if token is not found
  }

  const location = useLocation();

  // Get the page title based on the current route
  let pageTitle = "Dashboard";
  if (location.pathname.includes("bookings")) pageTitle = "Bookings";
  if (location.pathname.includes("categories")) pageTitle = "Categories";
  if (location.pathname.includes("rooms")) pageTitle = "Rooms";
  if (location.pathname.includes("users")) pageTitle = "Users";
  if (location.pathname.includes("feedbacks")) pageTitle = "Feedbacks";
  if (location.pathname.includes("gallery-items")) pageTitle = "Gallery Items";

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="w-[20%] bg-[#334E68] h-screen flex flex-col p-4 space-y-4 text-[#F9FAFB] rounded-tr-[2rem] rounded-br-[2rem]">
        <Link
          to="/admin/bookings"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiBookmarkCheck />
          <span>Bookings</span>
        </Link>

        <Link
          to="/admin/categories"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiViewList />
          <span>Categories</span>
        </Link>

        <Link
          to="/admin/rooms"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiGrid41 />
          <span>Rooms</span>
        </Link>

        <Link
          to="/admin/users"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiUser />
          <span>Users</span>
        </Link>

        <Link
          to="/admin/feedbacks"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiChat1 />
          <span>Feedbacks</span>
        </Link>

        <Link
          to="/admin/gallery-items"
          className="text-[20px] hover:font-bold flex items-center space-x-2 p-2 rounded hover:bg-[#7E5BEF]"
        >
          <CiImageOn />
          <span>Gallery Items</span>
        </Link>
      </div>

      {/* Content Section */}
      <div className="w-[80%] bg-[#F9FAFB] h-screen overflow-y-scroll">
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-[#F9FAFB] text-[#334E68] shadow-md">
          <div className="text-2xl font-bold">{pageTitle}</div>
          <div className="flex items-center space-x-4">
            <UserTags
              name="Sanjeewa"
              image="https://th.bing.com/th/id/OIP.DQdhyRifE5tywz-uIlBKUAHaHa?rs=1&pid=ImgDetMain"
            />
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/bookings" element={<AdminBooking />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/categories/add-category" element={<AddCategory />} />
          <Route path="/rooms" element={<AdminRooms />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/feedbacks" element={<AdminFeedbacks />} />
          <Route path="/gallery-items" element={<AdminGallery />} />
        </Routes>
      </div>
    </div>
  );
}
