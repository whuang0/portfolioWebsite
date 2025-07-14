import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, slideIn, scaleIn, transition } from '../constants/animations';

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
      variants={fadeInUp}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      transition={transition}
    >
      <motion.div
        className="section-content"
        variants={scaleIn}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        transition={transition}
      >
        <motion.div
          className="title-container"
          variants={slideIn}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={transition}
        >
          <motion.h2
            className="section-title glitch"
            data-text={title}
          >
            {title}
          </motion.h2>
          <motion.div
            className="cyber-line"
            initial={{ width: 0 }}
            animate={{ width: inView ? '100%' : 0 }}
            transition={{ ...transition, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="section-body"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={transition}
        >
          {content}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Section; 