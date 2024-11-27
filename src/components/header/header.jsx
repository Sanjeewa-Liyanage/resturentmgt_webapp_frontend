import Navbar from "../navbar/navbar.jsx";
import UserTag from "../userdata/userdata.jsx";

function Header() {
  return (
    <>
      <Navbar />
      <header className="relative">
        {/* Replace Image with Video */}
        <video
          className="w-full h-[720px] object-cover brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://storage.googleapis.com/weapp_sl/bg.mp4" type="video/mp4" />
          {/* Fallback Image if Video doesn't load */}
          <img src="back2.jpg" alt="Fallback Image" className="w-full h-full object-cover" />
        </video>
        
        {/* Overlay for the text */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Sunway Luxury Hotels</h1>
          <p className="text-lg mt-2">Discover Stunning Views and Sunset Vibes</p>
          <button className="mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200">
            Explore More
          </button>
        </div>

        {/* Reservation Form */}
        <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-auto">
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="w-full md:w-auto">
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="w-full md:w-auto">
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Luxury</option>
                  <option>Deluxe</option>
                  <option>Suite</option>
                </select>
              </div>
            </div>

            <button className="mt-4 md:mt-0 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
