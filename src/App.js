import React, { useState, useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { motion } from "framer-motion";
import TypingText from './TypingText';
import Bye from './Bye';

function App() {
  const [phase, setPhase] = useState("intro");
  const [showButtons, setShowButtons] = useState(false);
  const [showBye, setShowBye] = useState(false);
  const [hasChosenBefore, setHasChosenBefore] = useState(false);

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

  const handleChoice = (type) => {
    localStorage.setItem("userChoice", type);
    setShowBye(true);
  };

  return (
    <div className="App">
      <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
        <motion.img
          src={process.env.PUBLIC_URL + "/logo3.png"}
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
            backgroundColor: "rgba(0, 0, 0, 0.13)",
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

        {/* Add logo here at the bottom center */}
        <img 
          src={process.env.PUBLIC_URL + "/logo4.png"}
          alt="Logo" 
          className="logo" 
        />
      </Box>
    </div>
  );
}

export default App;
