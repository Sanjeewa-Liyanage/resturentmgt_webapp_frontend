import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Update this line
import "swiper/swiper-bundle.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          console.log(res.data);
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        });
    }
  }, [categoriesIsLoaded]);

  function DeleteItem(name) {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      alert("You must be logged in to delete a category");
      window.location.href = "/login";
    }
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Category deleted successfully");
          setCategoriesIsLoaded(false);
        })
        .catch((err) => {
          console.error("Delete category error:", err);
          toast.error("Failed to delete category");
        });
    }
  }

  function HandlePlus() {
    console.log("Plus button clicked");
    navigate("add-category");
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <button
        className="bg-green-600 w-[60px] h-[60px] rounded-full text-2xl flex items-center justify-center fixed right-8 bottom-8"
        onClick={() => {
          HandlePlus();
        }}
      >
        <FaPlus color="white" />
      </button>

      <h1 className="text-2xl font-bold text-center mb-5">Category Cards</h1>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all"
          >
            {/* Swiper to handle images */}
            <div className="w-full h-64">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                className="h-full"
              >
                {/* Ensure category.image is an array and exists before mapping */}
                {Array.isArray(category.image) && category.image.length > 0 ? (
                  category.image.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`${category.name} - ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <div>No images available</div> // Fallback message if no images exist
                )}
              </Swiper>
            </div>

            <h3 className="text-xl font-semibold mt-4">{category.name}</h3>
            <p className="text-gray-600 mt-2">{category.description}</p>
            <p className="text-lg font-bold text-green-500 mt-2">
              ${category.price.toFixed(2)}
            </p>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Features:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {category.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-start items-center space-x-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  DeleteItem(category.name);
                }}
                title="Delete"
              >
                <FaTrash />
              </button>
              <Link
                className="bg-[#7E5BEF] hover:bg-[#6840ef] text-white font-bold py-2 px-4 rounded-full"
                title="Edit"
                to={"/admin/update-category/"}
                state={category}
              >
                <FaEdit />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
