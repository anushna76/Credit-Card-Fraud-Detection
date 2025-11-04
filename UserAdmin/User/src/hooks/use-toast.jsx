import React from "react";

// Simplified toast hook for JSX version
export function useToast() {
  const toast = ({ title, description, variant }) => {
    console.log(`Toast: ${title} - ${description} (${variant || 'default'})`);
    // In a real app, this would show a toast notification
    alert(`${title}\n${description}`);
  };

  return { toast };
}