import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../constants/animations';

const AboutContent = () => (
  <motion.div
    variants={fadeInUp}
    className="about-content"
  >
    <p>I'm a passionate Software Engineer with a strong foundation in full-stack development and a keen interest in cybersecurity. My journey in computer science began during my high school years, where I discovered my love for solving complex problems through elegant code solutions.</p>
    
    <p>With hands-on experience in modern web technologies and a deep understanding of software architecture, I specialize in building secure, scalable, and user-centric applications. My approach combines technical expertise with creative problem-solving to deliver impactful solutions.</p>
    
    <p>Currently, I'm focused on leveraging cutting-edge technologies like React, TypeScript, and cloud services to create robust applications that make a difference. I'm particularly passionate about clean code, performance optimization, and implementing best practices in security.</p>
    
    <p>I'm actively seeking opportunities where I can contribute to innovative projects while continuing to grow as a developer. Let's connect and discuss how I can bring value to your team!</p>
  </motion.div>
);

export default AboutContent; 