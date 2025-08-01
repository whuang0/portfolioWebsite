import React from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { PERSONAL_INFO } from '../constants';

const Hero = () => {
  const fullText = `Hello, I'm ${PERSONAL_INFO.name}`;
  const { displayText } = useTypingEffect(fullText, { delay: 0 });

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div 
        className="hero-content"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="hero-title hero-title-typing"
          initial={{ 
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          }}
          transition={{ 
            duration: 1.5,
            delay: 0.2,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          <span className="typing-visible">{displayText}</span>
          <span className="typing-invisible">{fullText}</span>
        </motion.h1>
        <motion.div
          className="scroll-indicator"
          initial={{ 
            opacity: 0,
            y: 20
          }}
          animate={{ 
            opacity: 1,
            y: 0
          }}
          transition={{ 
            duration: 0.8,
            delay: 3,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="scroll-text"
          >
            Scroll to explore my world
          </motion.span>
          <motion.div 
            className="scroll-arrow"
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: 1,
              y: [0, 10, 0]
            }}
            transition={{ 
              delay: 3.4,
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;