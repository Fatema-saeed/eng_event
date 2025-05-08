import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TypingText from "./TypingText";

export default function Bye() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          style={{
        
                position: "relative",
                background: "rgba(255, 255, 255, 0.19)",
                color: "#fff",
                borderRadius: "16px",
                height:"70px" , 
                alignContent:"center",
                width:"250px",
                padding:"20px 20px 20px 20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                lineHeight:"30px"
              }}
           
        >
        <TypingText text="نشكرك على المشاركة النتائج ستظهر على الشاشة" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
