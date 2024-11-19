import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Category = () => {

    const [categories, setCategories] = useState([]);
    const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  
    useEffect(() => {
        if(!categoriesIsLoaded){
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category").then((res) => {
        console.log(res.data);
        setCategories(res.data.categories);
        setCategoriesIsLoaded(true);
        });
    }

    }, [
        categoriesIsLoaded
    ])

    function DeleteItem(name){
       const token = localStorage.getItem("token");
       console.log("Token:", token);
       if(!token){

              alert("You mustbe logged in to delete a category");
       }
       if(window.confirm("Are you sure you want to delete this category?")){
           axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
               headers:{
                   Authorization: "Bearer " + token,
                   "Content-Type": "application/json"
               },
           })
           .then((res) => {
               console.log(res.data);
               setCategoriesIsLoaded(false);
           })
           .catch((err) => {
               console.error("Delete category error:", err);
           });
       }
    }

  return (
    <div className="container mx-auto mt-10 p-5">
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
              <td className="border border-gray-300 px-4 py-2">
                
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={()=>{
                    DeleteItem(category.name);
                }}>
                  Delete
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
