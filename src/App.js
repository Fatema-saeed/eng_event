import React, { useState, useEffect } from 'react';
import './App.css';
import FallingPiece from './FallingPiece';
import { Box } from '@mui/material';
import { motion } from "framer-motion";
import TypingText from './TypingText';
import Bye from './Bye';

function App() {
  const [pieces, setPieces] = useState([]);
  const [phase, setPhase] = useState("intro");
  const [showButtons, setShowButtons] = useState(false);
  const [showBye, setShowBye] = useState(false);
  const [hasChosenBefore, setHasChosenBefore] = useState(false);
  const MAX_PIECES = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setPieces(prev => {
        if (prev.length >= MAX_PIECES) return prev;
        const id = Date.now() + Math.random();
        const width = Math.random() * 20 + 10;
        const height = Math.random() * 30 + 20;
        const xPos = Math.random() * window.innerWidth;
        const rotateStart = Math.random() * 360;
        const rotateEnd = rotateStart + (Math.random() * 360 - 180);
        const duration = Math.random() * 5 + 8;
        const color = Math.random() < 0.5 ? '#fff' : '#f33';
        return [...prev, { id, width, height, xPos, rotateStart, rotateEnd, duration, color }];
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("background");
      setTimeout(() => setShowButtons(true), 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const choice = localStorage.getItem("userChoice");
    if (choice) {
      setHasChosenBefore(true);
      setShowBye(true);
    }
  }, []);

  const handleRemove = id => setPieces(prev => prev.filter(p => p.id !== id));

  const handleChoice = (type) => {
    localStorage.setItem("userChoice", type);
    setShowBye(true);
  };

  return (
    <div className="App">
      {pieces.map(p => (
        <FallingPiece key={p.id} {...p} onComplete={() => handleRemove(p.id)} />
      ))}

      <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
        <motion.img
          src="/logo3.png"
          alt="Intro"
          variants={{
            intro: {
              scale: 2,
              x: "-50%",
              y: "-50%",
              top: "50%",
              left: "50%",
              opacity: 1,
            },
            background: {
              scale: 1.5,
              top: "10px",
              left: "50%",
              x: "-50%",
              y: "0%",
              opacity: 1
            }
          }}
          animate={phase}
          initial="intro"
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            zIndex: 3,
            width: "180px",
            height: "auto",
          }}
        />

        <motion.div
          initial={{ height: 0 }}
          animate={phase === "background" ? { height: "100%" } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.19)",
            zIndex: 2,
          }}
        />

        {showButtons && !showBye && !hasChosenBefore && (
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              zIndex: 4
            }}
          >
            <TypingText text="ارمِ العملة وشاهد النتيجة!" />
            <Box sx={{ display: "flex", gap: "30px", my: "20px" }}>
              <button onClick={() => handleChoice("image")} className="button">
                <div className="dots-border"></div>
                <span className="text-button">صـــــــورة</span>
              </button>
              <button onClick={() => handleChoice("text")} className="button">
                <div className="dots-border"></div>
                <span className="text-button">كــــــتابة</span>
              </button>
            </Box>
          </Box>
        )}

        {showBye && (
          <Box
            sx={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000
            }}
          >
            <Bye />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
