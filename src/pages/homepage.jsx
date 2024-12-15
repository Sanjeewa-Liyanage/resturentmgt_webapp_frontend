import Header from "../components/header/header"
import React,{useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Update this line
import "swiper/swiper-bundle.css";
import axios from "axios";
import { MdSpa ,MdPool } from 'react-icons/md';
import { FaDumbbell } from 'react-icons/fa'; 
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaAward, FaHotel, FaTrophy, FaMedal } from 'react-icons/fa';
import Footer from "../components/footer/footer";
import Skeleton from "react-loading-skeleton";

export default function HomePage( ) {
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);
  

  useEffect(() => {
    if(!categoriesIsLoaded){
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories);
        setCategoriesIsLoaded(true);
      });
    }
  },[categoriesIsLoaded]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
      .then((res) => {
        console.log("Gallery items:", res.data.list);
        setGallery(res.data.list);
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        alert("Failed to fetch gallery items.");
      });
  },[galleryIsLoaded]);


    return(
    <>
    <Header />
      
    <section id="about" className="py-16 px-6 bg-gray-100 mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center">A Luxury Boutique Hotel</h2>
        <p className="text-center text-gray-600 mt-4">For Eternal Romance and unforgettable experiences.</p>
        
        <div className="mt-10 flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4 p-4 w-full md:w-1/2">
            <div className="flex justify-center items-center">
              <img src="image1.jpg" alt="Image 1" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex justify-center items-center">
              <img src="image11.jpg" alt="Image 2" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex justify-center items-center">
              <img src="image3.jpg" alt="Image 3" className="w-full h-auto rounded-lg" />
            </div>
            <div className="flex justify-center items-center">
              <img src="image5.jpg" alt="Image 4" className="w-full h-auto rounded-lg" />
            </div>
          </div>

          {/* About Text */}
          <div className="w-[700px]">
            <p className="text-gray-700 leading-relaxed">
            Experience the perfect blend of comfort, luxury, and elegance at our boutique hotel. From the moment you step through our doors, you'll be enveloped in a world of sophistication. Our meticulously designed rooms offer a serene escape with every modern amenity, while our exquisite dining experiences will tantalize your taste buds with gourmet delights. Whether you're enjoying a quiet retreat, celebrating a special occasion, or planning a romantic getaway, we ensure every moment is unforgettable. Our dedicated staff provides impeccable service, tailoring every detail of your stay to make it truly exceptional. Come and let us exceed your expectations with an experience that stays with you long after you leave.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Santorini Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="image12.jpg"
            alt="Santorini"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold">Serene Coastal Escapes</h3>
            <p className="text-gray-600 mt-4">
            Experience the soothing rhythm of waves, golden sands stretching for miles, and sunsets painting the sky with vibrant hues. A perfect haven to relax, unwind, and embrace the enchanting allure of the beach.
            </p>
          </div>
        </div>
        {/* Dining Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold">Dining</h3>
            <p className="text-gray-600 mt-4">
              Enjoy exquisite dining experiences with world-class cuisines,
              curated to provide you with unforgettable moments.
            </p>
          </div>
          <img
            src="image13.jpg"
            alt="Dining"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
    <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-8xl mx-auto text-center">
          {/* Add the missing closing div tag */}
        
          <h2 className="text-3xl font-bold mb-8">Rooms & Suites</h2>{

          categories.length > 0?(
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="w-full"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <Link to={"/category/" + category.name}
                title= "${category.name}"
                state={category}>
                  
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">

                  <div className="w-full h-64 mb-4">
                    <img
                      src={category.image[0]} // Use the first image for simplicity
                      alt={category.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                  <p className="text-lg font-bold text-green-500 mt-2">
                    ${category.price.toFixed(2)}
                  </p>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Book Now
                  </button>
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          ):(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeleton Loader */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 shadow">
                <Skeleton height={160} width="100%" />
                <Skeleton height={20} width="80%" className="mt-2" />
                <Skeleton height={20} width="60%" className="mt-2" />
                <Skeleton height={20} width="50%" className="mt-2" />
              </div>
            ))}
        </div>
        
          )}
        </div>
</section>

<section className="py-16 px-6 bg-gray-100">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Amenities</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <MdSpa size={50} color="black" className="w-16 h-16 mx-auto" />
        <h3 className="text-xl font-semibold mt-4">Spa & Wellness</h3>
        <p className="text-gray-600 mt-2">
          Indulge in a world of tranquility and relaxation with our spa treatments.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <MdPool size={50} color="black" className="w-16 h-16 mx-auto" />
        <h3 className="text-xl font-semibold mt-4">Swimming Pool</h3>
        <p className="text-gray-600 mt-2">
          Dive into our crystal-clear swimming pool and enjoy refreshing moments.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <FaDumbbell size={50} color="black" className="w-16 h-16 mx-auto" />
        <h3 className="text-xl font-semibold mt-4">Fitness Center</h3>
        <p className="text-gray-600 mt-2">
          Stay fit and active with our state-of-the-art fitness center.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
      <IoIosCheckmarkCircle size={50} color="black" className="w-16 h-16 mx-auto" />
        <h3 className="text-xl font-semibold mt-4">Concierge Services</h3>
        <p className="text-gray-600 mt-2">
          Our dedicated concierge team is available 24/7 to assist you with your needs.
        </p>

  </div>
</div>
</div>
</section>
{/* Events Gallery */}

<section className="py-16 px-6 bg-white">
  <div className="max-w-8xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">Events & Gallery</h2>
    {gallery.length > 0 ?(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {gallery.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <div className="w-full h-64 mb-4">
            <img
              src={item.image} // Assuming `item.image` contains the image URL
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-600 mt-2">{item.description}</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </div>
      ))}
    </div>):(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Skeleton Loader */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-lg p-4 shadow">
          <Skeleton height={160} width="100%" />
          <Skeleton height={20} width="80%" className="mt-2" />
          <Skeleton height={20} width="60%" className="mt-2" />
          <Skeleton height={20} width="50%" className="mt-2" />
        </div>
      ))}
    </div>
    )}
  </div>
</section>


<div>
  {/* Awards Section */}
  <div className="w-full flex flex-col items-center text-center pt-16 pb-10">
    <h2 className="text-2xl font-bold text-black ">Awards</h2>
    <div className="w-1/6 border-b-2 border-[#000000] m-4"></div>
    <p className="text-xl text-[#737373] mb-4">Honors and Achievements of Sunway Luxury</p>
  </div>

  {/* Background Image and Awards Cards */}
  <div
    className="w-full h-auto lg:h-[60vh] flex justify-center mt-8 bg-center bg-cover gradient-radial bg-fixed relative"
    style={{ backgroundImage: "url('img14.jpg')" }} // Replace with your image path
  >
    <div className="absolute w-full h-full bg-black/75"></div>
    <div className="w-full xl:w-[1140px] 2xl:w-[1440px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 text-white text-xl py-8 z-10">
      
      {/* Award 1 */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-6xl p-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="white" d="M12 7a8 8 0 1 1 0 16a8 8 0 0 1 0-16m0 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 1.5l1.322 2.68l2.958.43l-2.14 2.085l.505 2.946L12 17.25l-2.645 1.39l.505-2.945l-2.14-2.086l2.958-.43zM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2z"></path>
          </svg>
        </div>
        <div className="p-2 text-4xl font-bold">2023-2024</div>
        <div className="uppercase text-center">Best Luxury Hotel</div>
        <div className="uppercase text-center text-sm">Awarded by the National Hospitality Board</div>
      </div>

      {/* Award 2 */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-6xl p-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="white" d="M12 7a8 8 0 1 1 0 16a8 8 0 0 1 0-16m0 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 1.5l1.322 2.68l2.958.43l-2.14 2.085l.505 2.946L12 17.25l-2.645 1.39l.505-2.945l-2.14-2.086l2.958-.43zM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2z"></path>
          </svg>
        </div>
        <div className="p-2 text-4xl font-bold">2022-2023</div>
        <div className="uppercase text-center">Top Service Excellence</div>
        <div className="uppercase text-center text-sm">Awarded by Hotel Reviewers Association</div>
      </div>

      {/* Award 3 */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-6xl p-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="white" d="M12 7a8 8 0 1 1 0 16a8 8 0 0 1 0-16m0 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 1.5l1.322 2.68l2.958.43l-2.14 2.085l.505 2.946L12 17.25l-2.645 1.39l.505-2.945l-2.14-2.086l2.958-.43zM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2z"></path>
          </svg>
        </div>
        <div className="p-2 text-4xl font-bold">2023</div>
        <div className="uppercase text-center">Best Hospitality Experience</div>
        <div className="uppercase text-center text-sm">Awarded by the Luxury Travel Guide</div>
      </div>

      {/* Award 4 */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-6xl p-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="white" d="M12 7a8 8 0 1 1 0 16a8 8 0 0 1 0-16m0 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 1.5l1.322 2.68l2.958.43l-2.14 2.085l.505 2.946L12 17.25l-2.645 1.39l.505-2.945l-2.14-2.086l2.958-.43zM18 2v3l-1.363 1.138A9.935 9.935 0 0 0 13 5.049V2zm-7-.001v3.05a9.935 9.935 0 0 0-3.636 1.088L6 5V2z"></path>
          </svg>
        </div>
        <div className="p-2 text-4xl font-bold">50+</div>
        <div className="uppercase text-center">Awards</div>
        <div className="uppercase text-center text-sm">2013 - Present</div>
      </div>

    </div>
  </div>
</div>
<div className="w-full h-[450px] pt-16 mb-10 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4055698.453999082!2d80.04160000000002!3d6.933199999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2slk!4v1732740949280!5m2!1sen!2slk"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
<Footer />
      </>
    )
}