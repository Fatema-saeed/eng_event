/* src/App.js */
import React, { useState, useEffect } from 'react';
import FallingPiece from './FallingPiece';
import './App.css';
import { Box, Button } from '@mui/material';


function App() {
  const [pieces, setPieces] = useState([]);
  const MAX_PIECES = 10;
  useEffect(() => {
    const interval = setInterval(() => {
      setPieces(prev => {
        if (prev.length >= MAX_PIECES) return prev;
        const id = Date.now() + Math.random();
        const width = Math.random() * 20 + 10;   // 10–50px
        const height = Math.random() * 30 + 20;   // 5–55px
        const xPos = Math.random() * window.innerWidth;
        const rotateStart = Math.random() * 360;
        const rotateEnd = rotateStart + (Math.random() * 360 - 180);
        const duration = Math.random() * 5 + 8;   // 4–8s
        const color = Math.random() < 0.5 ? '#fff' : '#f33';

        return [...prev, { id, width, height, xPos, rotateStart, rotateEnd, duration, color }];
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const handleRemove = id => {
    setPieces(prev => prev.filter(p => p.id !== id));
  };



  return (
    <div className="App">
    {pieces.map(p => (
      <FallingPiece key={p.id} {...p} onComplete={() => handleRemove(p.id)} />
    ))}
    <Box sx={{    position: "relative",
  width:" 100vw",
  height: "100vh"
}}>
       <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)", 
          }}
        />
    </Box>
  </div>
  );
}

export default App;