import Header from "../components/header/header"




export default function HomePage( ) {
    return(
    <>
    <Header />
      <div className="w-full h-screen bg-[#0d0221] flex flex-col items-center">
        <div className="w-[700px] border border-[#a6cfd5] bg-[#c2e7d9] h-[100px] flex items-center p-4 rounded-lg shadow-md">
          <input
            type="date"
            className="w-1/3 px-4 py-2 border border-[#26408b] rounded-md text-[#0f084b] bg-white focus:outline-none focus:ring focus:ring-[#a6cfd5] mr-4"
          />
          <input
            type="date"
            className="w-1/3 px-4 py-2 border border-[#26408b] rounded-md text-[#0f084b] bg-white focus:outline-none focus:ring focus:ring-[#a6cfd5] mr-4"
          />
          <select
            className="w-1/4 px-4 py-2 border border-[#26408b] rounded-md bg-white text-[#0f084b] focus:outline-none focus:ring focus:ring-[#a6cfd5] mr-4"
          >
            <option>Luxury</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
          <button className="px-4 py-2 bg-[#0f084b] text-white rounded-md hover:bg-[#26408b]">
            Book Now
          </button>
        </div>
        <h1 className="text-white text-[100px]" >Welcome to the Hotel</h1>
      </div>
      </>
    )
}