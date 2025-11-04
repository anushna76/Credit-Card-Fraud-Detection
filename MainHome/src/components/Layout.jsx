import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Link } from "wouter";

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8fafc] font-sans text-[#1e293b]">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Mobile navbar */}
      <div className="lg:hidden bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={toggleMobileMenu} 
            className="text-[#1e293b] focus:outline-none"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="text-center">
            <Link href="/">
              <a className="inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 mx-auto text-[#3b82f6]">
                  <path d="M4 4c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v6h2V4c0-1.7-1.3-3-3-3H5C3.3 1 2 2.3 2 4v16c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-6h-2v6c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V4Z" />
                  <path d="M6 12h12v-2H6v2Zm0 4h8v-2H6v2Zm11.4 4.6 6-6c.4-.4.4-1 0-1.4l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3H8c-.6 0-1 .4-1 1s.4 1 1 1h13.3l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3Z" />
                </svg>
              </a>
            </Link>
          </div>
          <button className="text-[#1e293b] focus:outline-none">
            <i className="fas fa-search text-xl"></i>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-white px-4 pb-4">
            <div className="mb-3 relative">
              <input 
                type="text" 
                placeholder="Search our site..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50" 
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition">
                      <i className="fas fa-home mr-2"></i> Home
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition font-medium">
                    <i className="fas fa-landmark mr-2"></i> Bank Admin
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition">
                    <i className="fas fa-shopping-cart mr-2"></i> Ecommerce
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition font-medium">
                    <i className="fas fa-user mr-2"></i> User
                  </a>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition font-medium">
                      <i className="fas fa-envelope mr-2"></i> Contact Us
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl lg:text-3xl font-bold text-center text-[#f97316]">
            Real-Time Credit Card Fraud Detection Using AdaBoost
          </h1>
        </header>

        {children}

        <Footer />
      </main>
    </div>
  );
};

export default Layout;

