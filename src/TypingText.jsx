import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TypingText({ text }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => {
        if (prev < text.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      dir="rtl"
      style={{
        color: "white",
        fontWeight: "bold",
        display: "inline-block",
        whiteSpace: "pre-wrap", 
        fontSize: "1.0rem",
      }}
    >
      {text.slice(0, index)}
      {index < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            backgroundColor: "white",
            marginRight: "2px", 
          }}
        />
      )}
    </div>
  );
}

export default TypingText;
