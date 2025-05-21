'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticleBackgroundProps {
  mousePosition: { x: number; y: number };
  particleCount?: number;
}

export function ParticleBackground({ 
  mousePosition, 
  particleCount = 20 
}: ParticleBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  return (
    <>
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary-200"
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x / 20 - i * 5,
            y: mousePosition.y / 20 - i * 5,
          }}
        />
      ))}
    </>
  );
}
