import ImageSlider from "@/components/ImageSlider";
import FeatureCard from "@/components/FeatureCard";
import BenefitCard from "@/components/BenefitCard";
import InfoSection from "@/components/InfoSection";
import { featureCards, benefitCards } from "@/lib/utils";
import { Link } from "wouter";

const Home = () => {
  return (
    <>
      {/* Image Slider */}
      <ImageSlider />

      {/* Featured Categories */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
              linkText={card.linkText}
              linkColor={card.linkColor}
              linkHref={card.linkHref || "#"}
            />
          ))}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-[#3b82f6]/5 to-[#f97316]/5">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefits of Our Solution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitCards.map((card, index) => (
            <BenefitCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
            />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <InfoSection />

      {/* Contact Us Preview */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-[#3b82f6]/5 to-[#f97316]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Support or Have Questions?</h2>
          <p className="text-gray-600 mb-8">Our team is ready to help you implement the right fraud detection solution for your business.</p>
          <Link href="/contact">
            <a className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#f97316] text-white font-medium rounded-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]">
              Contact Us Now <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
