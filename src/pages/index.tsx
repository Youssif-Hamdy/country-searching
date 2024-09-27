import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [landmarks, setLandmarks] = useState<{ country: string; capital: string; description: string; photos: string[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const PEXELS_API_KEY = "MSR9kLqIVERvp6Zudb7L0E2S1wodZyE6JBuqXQP5VA13ngEYddewN3hI";

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const fetchPhotos = async (countryName: string) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        headers: { Authorization: PEXELS_API_KEY },
        params: { query: countryName, per_page: 20 },
      });
      return response.data.photos.map((photo: any) => photo.src.medium);
    } catch (err) {
      console.error("Error fetching photos:", err);
      return [];
    }
  };

  const fetchCountryDescription = async (countryName: any) => {
    try {
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`);
      return response.data.extract; 
    } catch (err) {
      console.error("Error fetching country description:", err);
      return "Description not available.";
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const matchedCountries = countries
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
            country.name.common.toLowerCase() !== "israel"
        )
        .map((country) => country.name.common);

      setSuggestions(matchedCountries);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, countries]);

  const handleSearch = async (searchValue?: string) => {
    const searchQuery = searchValue || searchTerm;
    if (searchQuery.toLowerCase() === "israel") {
      setError("There is no country called that");
      return;
    }

    const matchedCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
      country.name.common.toLowerCase() !== "israel"
    );

    if (matchedCountries.length > 0) {
      try {
        const countryName = matchedCountries[0].name.common;
        const photos = await fetchPhotos(countryName);
        const description = await fetchCountryDescription(countryName);

        const countryDetails = {
          country: countryName,
          capital: matchedCountries[0].capital ? matchedCountries[0].capital[0] : "N/A",
          description, 
          photos,
        };

        setLandmarks([countryDetails]);
        navigate("/details", { state: { country: countryDetails, landmarks: [countryDetails], photos } });
      } catch (error) {
        console.error("Error fetching photos or description:", error);
        setError("Failed to load photos or description.");
      }
    } else {
      setError("No countries found for the given search term.");
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % landmarks[0].photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + landmarks[0].photos.length) % landmarks[0].photos.length);
  };

  return (
    <div className="relative">
      <video
        className="absolute top-0 left-0 w-full h-96 object-cover -z-30 pointer-events-none"
        src="https://cdn.pixabay.com/video/2016/05/12/3171-166338953_large.mp4"
        autoPlay
        loop
        muted
      ></video>

      <section className="max-w-4xl mx-auto py-12 px-6 bg-gray-50 bg-opacity-0 rounded-lg relative z-10 mt-0">
        <div className="text-center">
          <h1 className="mt-10 text-3xl font-semibold text-white mb-4 tracking-tight">
            Explore Countries
          </h1>
          <div className="flex justify-center items-center space-x-4 mb-9 relative">
            <Input
              type="text"
              placeholder="Type country name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-6 py-3 w-72 text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
            />
            <Button
              onClick={() => handleSearch()}
              className="bg-black text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 hover:bg-gray-500 focus:outline-none transition duration-300 ease-in-out"
            >
              Search
            </Button>

            {suggestions.length > 0 && (
              <ul className="absolute top-14 left-0 w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                    onClick={() => {
                      setSuggestions([]);
                      handleSearch(suggestion);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading && <p className="text-gray-700">Loading countries...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {landmarks.length > 0 && (
            <div className="bg-white bg-opacity-90 shadow-2xl rounded-lg p-8 mt-8 transition duration-500 ease-in-out transform hover:shadow-3xl">
              {landmarks.map(({ country, capital, description, photos }) => (
                <div key={country} className="flex md:flex-row flex-col mb-8 border-b pb-6">
                  <div className="md:w-1/3 pr-0">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{country}</h2>
                    <p className="text-gray-600">Capital: {capital}</p>
                    <p className="text-gray-600">Description: {description}</p>
                    <div className="relative mb-6">
                      <img
                        src={photos[currentIndex]}
                        alt={`${country} landmark`}
                        className="w-full h-52 object-cover rounded-lg shadow-lg transition duration-300 hover:shadow-2xl"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={prevSlide}
                        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Cards />
      <Footer />
    </div>
  );
};

export default HomePage;
