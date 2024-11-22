import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const naivgate = useNavigate();

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
        alert("You mustbe logged in to delete a category")
            window.location.href = "/login"
        
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

  function HandlePlus(){
    console.log("Plus button clicked");
    naivgate("add-category");
  }

  return (
    <div className="container mx-auto mt-10 p-5">
        <button className="bg-green-600 w-[60px] h-[60px] rounded-full text-2xl flex items-center justify-center fixed right-8 bottom-8"
        onClick={()=>{
            HandlePlus();
        }}><FaPlus color="white"/></button>
      <h1 className="text-2xl font-bold text-center mb-5">Category Table</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Features</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {category.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${category.price.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc list-inside">
                  {category.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    DeleteItem(category.name);
                  }}
                  title="Delete"
                >
                  <FaTrash />
                </button>
                <button
                  className="bg-[#7E5BEF] hover:bg-[#6840ef] text-white font-bold py-2 px-4 rounded-full"
                  title="Edit"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
