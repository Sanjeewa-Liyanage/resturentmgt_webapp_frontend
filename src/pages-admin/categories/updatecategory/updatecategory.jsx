import React, { useState } from "react";
import uploadimg from "../../../utils/imgupload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function UpdateCategory() {
    const location = useLocation();
  const [name, setname] = useState(location.state.name);
  const [price, setprice] = useState(location.state.price);
  const [features, setfeatures] = useState(location.state.features.join(", "));
  const [description, setdescription] = useState(location.state.description);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);
 
  const token = localStorage.getItem("token");
  console.log("state"+location.state);

  if (!token) {
    window.location.href = "/login";
  }

  const handleImageChange = (e) => {
    setimage(e.target.files[0]); // Capture the selected file
  };

  const HandleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    try {
      // Upload image to Firebase
      const snapshot = await uploadimg(image);
      const url = await getDownloadURL(snapshot.ref);
      console.log("Image URL:", url);

      const featureArray = features.split(",").map((f) => f.trim());
      const newCategory = {
        name: name,
        price: parseFloat(price),
        features: featureArray,
        description,
        image: url, 
      };
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/category", newCategory, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        setloading(false);
        toast.success("Category Created successfully");
      })
    
    } catch (error) {
      console.error("Error handling form submission:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Update Category</h1>
      <form onSubmit={HandleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block font-medium text-gray-700 mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            id="features"
            value={features}
            onChange={(e) => setfeatures(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter features, separated by commas"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 flex justify-center "
        >{
            loading ? (
                <div className="border-t-2 border-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
            ) : (
                <span>Update Category</span>
            )
        }
          
        </button>
      </form>
    </div>
  );
}
