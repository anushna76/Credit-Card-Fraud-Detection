const Contact = () => {
  return (
    <section id="contact" className="py-12 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-[#3b82f6]/5 to-[#f97316]/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">Have questions about our fraud detection solution? Get in touch with our team.</p>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <p>123 Financial District</p>
                    <p>New York, NY 10004</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <p>support@frauddetection.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <i className="fab fa-linkedin-in text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <i className="fab fa-twitter text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                    <i className="fab fa-facebook-f text-white"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 p-6 md:p-8">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition" 
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition" 
                    placeholder="john.doe@example.com" 
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition" 
                    placeholder="Your Company Inc." 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="subscribe" 
                    className="w-4 h-4 text-[#3b82f6] focus:ring-[#3b82f6] rounded" 
                  />
                  <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700">Subscribe to our newsletter</label>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#3b82f6] to-[#f97316] text-white font-medium py-2 px-6 rounded-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
