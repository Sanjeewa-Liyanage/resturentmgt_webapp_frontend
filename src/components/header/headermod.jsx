import Navbar from "../navbar/navbar.jsx";
import UserTag from "../userdata/userdata.jsx";
import Footer from "../footer/footer.jsx";

function Headermod() {
  return (
    <>
      <Navbar />
      <header className="relative">
        <div className="relative">
          {/* Banner Image */}
          <img
            src="/hotel.jpg"
            alt="Sunway Luxury Hotels Banner"
            className="w-full h-[580px] object-cover brightness-50"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">Sunway Luxury Hotels</h1>
            <p className="text-lg mt-2">Discover Stunning Views and Sunset Vibes</p>
            <button className="mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200">
              Explore More
            </button>
          </div>
        </div>
      </header>
     
    </>
  );
}

export default Headermod;
