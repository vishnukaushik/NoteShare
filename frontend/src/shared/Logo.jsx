// src/components/shared/Logo.jsx
import React from 'react';

const Logo = ({ width = '100', height = '100', className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={width} 
      height={height} 
      className={className}
    >
      <circle cx="50" cy="50" r="45" fill="#2563eb"/>
      <path d="M35 25 L65 25 L65 75 L35 75 Z" fill="white" />
      <path 
        d="M40 35 L60 35 M40 45 L60 45 M40 55 L50 55" 
        stroke="#2563eb" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <path d="M55 50 L75 40 L75 60 Z" fill="white"/>
      <path 
        d="M75 50 L85 50" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;