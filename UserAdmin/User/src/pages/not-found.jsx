import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "wouter";

export default function NotFound() {
  const navigate=useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-medium text-neutral-800 mb-6">Page Not Found</h2>
      <p className="text-neutral-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-primary hover:bg-opacity-90 text-white py-2 px-6 rounded-md transition-colors"
      >
        Return to Home
      </button>
    </div>
  );
}