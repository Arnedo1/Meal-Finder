import React from 'react';

export default function LoadingDots() {
  return (
    // ===== LOADING ANIMATION CONTAINER =====
    // Centered container for the loading dots with spacing between elements
    <div className="flex mt-20 items-center justify-center space-x-2">
      {/* ===== FIRST LOADING DOT ===== */}
      {/* Blue circle with bounce animation (no delay) */}
      <div 
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
        style={{ animationDelay: '0s' }}
      ></div>
      
      {/* ===== SECOND LOADING DOT ===== */}
      {/* Blue circle with bounce animation (0.2s delay) */}
      <div 
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
        style={{ animationDelay: '0.2s' }}
      ></div>
      
      {/* ===== THIRD LOADING DOT ===== */}
      {/* Blue circle with bounce animation (0.4s delay) */}
      <div 
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  );
}
