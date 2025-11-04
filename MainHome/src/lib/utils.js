import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { link } from "../../../backend/routes/route";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const navigationLinks = [
  { name: "Home", href: "/", icon: "home", external: false },
  { name: "Bank Admin", href: "https://bankadmin.netlify.app", icon: "landmark", external: true },
  { name: "User", href: "https://userssites.netlify.app", icon: "user", external: true },
  { name: "Contact Us", href: "/contact", icon: "envelope", external: false }
];

export const sliderData = [
  {
    title: "CARD SERVICES",
    description: "Start accepting credit cards on your website and enjoy secure transactions",
    buttonText: "Learn More",
    buttonColor: "bg-[#f97316] hover:bg-[#f97316]/90",
    image: "https://pixabay.com/get/ged68a09c776db18c402d5e7e9495cc3c5ccc4b7b7527e2976bf6fe93804edc9ee8613e9f70018e7fd30b2e58823a6804d33bd2216994b3758cf426a4b17df8af_1280.jpg"
  },
  {
    title: "FRAUD DETECTION",
    description: "Our advanced AI algorithms detect suspicious transactions in real-time",
    buttonText: "Explore Technology",
    buttonColor: "bg-[#3b82f6] hover:bg-[#3b82f6]/90",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600"
  },
  {
    title: "SECURE BANKING",
    description: "Enterprise-grade security for financial institutions of all sizes",
    buttonText: "Request Demo",
    buttonColor: "bg-gradient-to-r from-[#1e40af] to-[#10b981] hover:opacity-90",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=600"
  }
];

export const featureCards = [
  {
    title: "User Portal",
    description: "Access your secure dashboard, monitor transactions, and manage payment settings.",
    icon: "user",
    color: "border-[#3b82f6]",
    bgColor: "bg-[#3b82f6]/10",
    iconColor: "text-[#3b82f6]",
    linkText: "Access Portal",
    linkColor: "text-[#3b82f6] hover:text-[#3b82f6]/80",
    linkHref: "https://userssites.netlify.app",
    external: true
  },
  {
    title: "Admin Console",
    description: "Monitor system performance, review flagged transactions, and manage security policies.",
    icon: "lock",
    color: "border-[#f97316]",
    bgColor: "bg-[#f97316]/10",
    iconColor: "text-[#f97316]",
    linkText: "Admin Login",
    linkColor: "text-[#f97316] hover:text-[#f97316]/80",
    linkHref: "https://bankadmin.netlify.app",
    external: true
  },
  {
    title: "Contact Support",
    description: "Get in touch with our 24/7 support team for technical assistance or inquiries.",
    icon: "headset",
    color: "border-gradient-to-r from-[#1e40af] to-[#10b981]",
    bgColor: "bg-gradient-to-r from-[#1e40af]/10 to-[#10b981]/10",
    iconColor: "text-[#1e40af]",
    linkText: "Contact Us",
    linkColor: "text-[#1e40af] hover:text-[#1e40af]/80",
    linkHref: "/contact"
  }
];

export const benefitCards = [
  {
    title: "Real-Time Detection",
    description: "Identify fraudulent transactions as they happen with millisecond response times.",
    icon: "bolt",
    bgColor: "bg-[#3b82f6]/10",
    iconColor: "text-[#3b82f6]"
  },
  {
    title: "Advanced AI",
    description: "Utilize AdaBoost machine learning algorithms to continuously improve detection accuracy.",
    icon: "brain",
    bgColor: "bg-[#f97316]/10",
    iconColor: "text-[#f97316]"
  },
  {
    title: "Reduced Losses",
    description: "Cut financial losses by up to 97% by preventing fraudulent transactions before they complete.",
    icon: "chart-line",
    bgColor: "bg-[#1e40af]/10",
    iconColor: "text-[#1e40af]"
  },
  {
    title: "Compliance Ready",
    description: "Meet PCI DSS, GDPR, and other regulatory requirements with our certified solution.",
    icon: "shield-alt",
    bgColor: "bg-[#10b981]/10",
    iconColor: "text-[#10b981]"
  }
];