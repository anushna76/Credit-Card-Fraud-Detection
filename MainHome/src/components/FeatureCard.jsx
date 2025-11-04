import { Link } from "wouter";

const FeatureCard = ({
  title,
  description,
  icon,
  color,
  bgColor,
  iconColor,
  linkText,
  linkColor,
  linkHref = "#"
}) => {
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 ${color}`}>
      <div className="p-6">
        <div className={`w-16 h-16 mx-auto mb-4 ${bgColor} rounded-full flex items-center justify-center`}>
          <i className={`fas fa-${icon} ${iconColor} text-2xl`}></i>
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
        <div className="mt-4 text-center">
          {linkHref.startsWith('/') ? (
            <Link href={linkHref}>
              <a className={`inline-block font-medium ${linkColor} transition`}>
                {linkText} <i className="fas fa-arrow-right ml-1"></i>
              </a>
            </Link>
          ) : (
            <a href={linkHref} className={`inline-block font-medium ${linkColor} transition`}>
              {linkText} <i className="fas fa-arrow-right ml-1"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;