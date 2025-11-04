import { Link } from "wouter";
import { navigationLinks } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen bg-white shadow-lg fixed w-64">
      <div className="p-4 flex justify-center">
        <Link href="/">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 text-[#3b82f6]">
              <path d="M4 4c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v6h2V4c0-1.7-1.3-3-3-3H5C3.3 1 2 2.3 2 4v16c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-6h-2v6c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V4Z" />
              <path d="M6 12h12v-2H6v2Zm0 4h8v-2H6v2Zm11.4 4.6 6-6c.4-.4.4-1 0-1.4l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3H8c-.6 0-1 .4-1 1s.4 1 1 1h13.3l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3Z" />
            </svg>
          </a>
        </Link>
      </div>
      
      <div className="relative mx-4 my-3">
        <input 
          type="text" 
          placeholder="Search our site..." 
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50" 
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i className="fas fa-search"></i>
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#f97316]"></div>
        </div>
      </div>
      
      <div className="mt-6 px-4">
        <h2 className="text-lg font-medium mb-4">Sidebar Menu</h2>
        <nav>
          <ul className="space-y-2">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.href}>
                  <a className={`block px-4 py-2 text-[#1e293b] hover:bg-[#3b82f6]/10 rounded-lg transition ${
                    (link.name === "Bank Admin" || link.name === "User" || link.name === "Contact Us") ? "font-medium" : ""
                  }`}>
                    <i className={`fas fa-${link.icon} mr-2`}></i> {link.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <div className="bg-gradient-to-r from-[#1e40af] to-[#10b981] p-4 rounded-lg text-white">
          <h3 className="font-medium mb-2">Fraud Protection</h3>
          <p className="text-sm">Our system detects 99.7% of fraudulent transactions in real-time.</p>
          <a href="#" className="inline-block mt-2 text-sm font-medium hover:underline">Learn more</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
