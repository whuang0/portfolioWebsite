import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../constants';
import { fadeInUp, staggerChildren } from '../../constants/animations';

const SkillsContent = () => (
  <motion.div 
    variants={staggerChildren}
    className="skills-container"
  >
    {SKILLS.map(category => (
      <motion.div
        key={category.id}
        className="skills-category"
        variants={fadeInUp}
      >
        <h3 className="category-title">{category.title}</h3>
        <div className="skills-grid">
          {category.items.map(skill => (
            <motion.div
              key={skill}
              className="skill-item"
              variants={fadeInUp}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default SkillsContent; 