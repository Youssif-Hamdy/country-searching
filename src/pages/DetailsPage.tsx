import  { useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const DetailsPage = () => {
    const location = useLocation();
    const { country, capital, description, photos } = location.state?.country || {};

    if (!country || !photos) {
        return <p className="text-center text-red-500">Details not available.</p>;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-5xl font-bold text-center mb-8 text-black transition duration-300 transform hover:scale-105">{country}</h1>
            <div className="flex flex-col md:flex-row">

                <div className="md:w-1/2 mb-6 md:mb-0">
                    <img
                        src={photos[currentIndex]}
                        alt={`${country} landmark`}
                        className="w-full h-72 object-cover rounded-lg shadow-md transition-transform transform hover:scale-110 cursor-pointer"
                        onClick={toggleModal}
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrev}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none"
                            disabled={photos.length === 0}
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none"
                            disabled={photos.length === 0}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="md:ml-8 md:w-1/2">
                    <h2 className="text-3xl font-semibold text-black">Description:</h2>
                    <p className="text-black mt-1">{description}</p>
                    <h2 className="text-3xl font-semibold text-black mt-4">Capital:</h2>
                    <p className="text-black mt-1">{capital}</p>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="fixed inset-0 backdrop-blur-sm bg-black opacity-50" />
                    <div className="relative z-50">
                        <img
                            src={photos[currentIndex]}
                            alt={`${country} landmark`}
                            className="w-full h-auto max-w-2xl rounded-lg shadow-lg transition-transform transform scale-110"
                        />
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500 transition duration-300"
                        >
                            &times; 
                        </button>
                    </div>
                </div>
            )}
             <Cards />
             <Footer />
        </div>
    );
};

export default DetailsPage;
