import Navbar from "../navbar/navbar.jsx";
import UserTag from "../userdata/userdata.jsx";


function Header() {
  return (

    <><Navbar /><header class="relative">
      <img src="back2.jpg" alt="Header Image" class="w-full h-[500px] object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white">
        <h1 class="text-4xl md:text-6xl font-bold">Sunway Luxury Hotels</h1>
        <p class="text-lg mt-2">Discover Stunning Views and Sunset Vibes</p>
        <button class="mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200">
          Explore More
        </button>
      </div>

      <div class="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
        <div class="bg-green-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">

          <div class="flex flex-col md:flex-row items-center gap-4 w-full">
            <div class="w-full md:w-auto">
              <input type="date" class="border border-gray-300 p-2 rounded w-full" placeholder="mm/dd/yyyy" />
            </div>
            <div class="w-full md:w-auto">
              <input type="date" class="border border-gray-300 p-2 rounded w-full" placeholder="mm/dd/yyyy" />
            </div>
            <div class="w-full md:w-auto">
              <select class="border border-gray-300 p-2 rounded w-full">
                <option>Luxury</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
          </div>

          <button class="mt-4 md:mt-0 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </header></>




    
  );
}

export default Header;