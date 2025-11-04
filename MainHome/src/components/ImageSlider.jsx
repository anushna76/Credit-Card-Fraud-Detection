import { useState, useEffect, useRef } from "react";
import { sliderData } from "@/lib/utils";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const slideCount = sliderData.length;

  const startSlideInterval = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
  };

  const stopSlideInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };

  useEffect(() => {
    startSlideInterval();
    return () => stopSlideInterval();
  }, []);

  const nextSlide = () => {
    stopSlideInterval();
    setCurrentSlide((prev) => (prev + 1) % slideCount);
    startSlideInterval();
  };

  const prevSlide = () => {
    stopSlideInterval();
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    startSlideInterval();
  };

  const goToSlide = (index) => {
    stopSlideInterval();
    setCurrentSlide(index);
    startSlideInterval();
  };

  return (
    <div className="relative w-full bg-[#1e293b] overflow-hidden" id="image-slider">
      <div 
        className="flex transition-transform duration-300" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={stopSlideInterval}
        onMouseLeave={startSlideInterval}
      >
        {sliderData.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-64 md:h-96 object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/70 to-transparent flex items-center">
              <div className="text-white p-6 md:p-12 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.description}</p>
                <button className={`mt-4 ${slide.buttonColor} text-white py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105`}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 focus:outline-none transition"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 focus:outline-none transition"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full bg-white ${
              index === currentSlide ? "opacity-100" : "opacity-50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;