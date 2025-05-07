import React from 'react';
import { motion } from 'framer-motion';

export default function FallingPiece({ width, height, xPos, rotateStart, rotateEnd, duration, color, onComplete }) {
  return (
    <motion.div
      initial={{ y: -height, x: xPos, rotate: rotateStart }}
      animate={{ y: window.innerHeight + height, rotate: rotateEnd }}
      transition={{ duration: duration, ease: 'linear' }}
      style={{
        position: 'fixed',
        width,
        height,
        backgroundColor: color,
        borderRadius: '4px',
        pointerEvents: 'none',
        opacity: 0.8,
      }}
      onAnimationComplete={onComplete}
    />
  );
}
