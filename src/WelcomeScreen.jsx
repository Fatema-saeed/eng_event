// src/WelcomeLottie.jsx
import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from './animations/welcome.json';

export default function WelcomeLottie({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2000); // total time to show animation
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
          <Player
            autoplay
            keepLastFrame
            src={animationData}
            style={{ height: 300, width: 300 }}
          />
        </div>
      )}
    </>
  );
}
