"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Box } from "@mui/material"

const text = "الأمسية الختامية"

export default function GoldenRatioIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000) // Hide after 2s
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      sx={{
        height: "100px",
        width: "250px",
        backgroundColor: "black",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: "2.5rem",
              color: "white"
            }}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              style={{ display: "flex" }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Typing cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "6px",
                  height: "2.5rem",
                  backgroundColor: "white",
                  marginLeft: "4px",
                  display: "inline-block"
                }}
              />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
