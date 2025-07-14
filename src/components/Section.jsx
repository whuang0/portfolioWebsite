import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.2
    }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const Section = ({ id, title, content }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`section ${id}-section`}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="section-content"
        variants={contentVariants}
      >
        <motion.div
          className="title-container"
          variants={titleVariants}
        >
          <motion.h2
            className="section-title"
            data-text={title}
          >
            {title}
          </motion.h2>
          <motion.div
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: inView ? '100%' : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        
        <motion.div 
          className="section-body"
          variants={contentVariants}
        >
          {content}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Section; 