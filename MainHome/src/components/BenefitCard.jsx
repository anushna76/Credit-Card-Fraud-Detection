
const BenefitCard = ({
  title,
  description,
  icon,
  bgColor,
  iconColor
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mr-3`}>
          <i className={`fas fa-${icon} ${iconColor}`}></i>
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BenefitCard;
// ...existing code...
