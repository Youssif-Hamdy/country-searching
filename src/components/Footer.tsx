
export default function Footer() {
  return (
    <div className="bg-white text-black py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">Country Search</h2>
            <p className="text-sm mt-2">Copyright &copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <a href="/" className="text-black hover:text-gray-600 transition duration-300">Home</a>
            <a href="/" className="text-black hover:text-gray-600 transition duration-300">About Us</a>
            <a href="/" className="text-black hover:text-gray-600 transition duration-300">Services</a>
            <a href="/" className="text-black hover:text-gray-600 transition duration-300">Contact Us</a>
            <a href="/" className="text-black hover:text-gray-600 transition duration-300">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold">Follow Us on Social Media</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-black hover:text-gray-600 transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-black hover:text-gray-580 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
