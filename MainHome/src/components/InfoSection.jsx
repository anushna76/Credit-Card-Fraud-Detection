const InfoSection = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Credit Card Security" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Protecting Financial Transactions Worldwide</h2>
            <p className="text-gray-700 mb-6">
              Credit card fraud is a serious problem in financial services. Billions of dollars are lost due to credit card fraud every year. Our machine learning algorithms utilize AdaBoost and majority voting methods to detect fraudulent activities with unprecedented accuracy.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#3b82f6] mt-1 mr-2"></i>
                <span>99.7% accuracy in fraud detection</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#3b82f6] mt-1 mr-2"></i>
                <span>Processing over 10,000 transactions per second</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#3b82f6] mt-1 mr-2"></i>
                <span>Trusted by over 500 financial institutions globally</span>
              </li>
            </ul>
            <div>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-[#3b82f6] text-white font-medium rounded-lg hover:bg-[#3b82f6]/90 transition">
                Download Whitepaper <i className="fas fa-download ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
