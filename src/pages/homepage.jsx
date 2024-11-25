import Header from "../components/header/header"




export default function HomePage( ) {
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
      
      </>
    )
}