import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../constants';
import { fadeInUp, staggerChildren } from '../../constants/animations';

const ContactContent: React.FC = () => (
  <motion.div
    variants={staggerChildren}
    className="contact-content"
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="contact-intro">
      <motion.p variants={fadeInUp}>
        I'm currently {PERSONAL_INFO.status.toLowerCase()} and would love to hear about potential opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </motion.p>
    </div>

    <div className="contact-methods">
      <motion.a 
        className="contact-item"
        variants={fadeInUp}
        whileHover={{ x: 10, boxShadow: "var(--neon-glow)" }}
        href={`mailto:${PERSONAL_INFO.email}`}
      >
        <span className="contact-icon" role="img" aria-label="Email">📧</span>
        <div className="contact-details">
          <h4>Email</h4>
          <span>{PERSONAL_INFO.email}</span>
        </div>
      </motion.a>

      <motion.div 
        className="contact-item"
        variants={fadeInUp}
        whileHover={{ x: 10, boxShadow: "var(--neon-glow)" }}
      >
        <span className="contact-icon" role="img" aria-label="Location">📍</span>
        <div className="contact-details">
          <h4>Location</h4>
          <span>{PERSONAL_INFO.location}</span>
        </div>
      </motion.div>

      <motion.div 
        className="contact-item"
        variants={fadeInUp}
        whileHover={{ x: 10, boxShadow: "var(--neon-glow)" }}
      >
        <span className="contact-icon" role="img" aria-label="Status">💼</span>
        <div className="contact-details">
          <h4>Status</h4>
          <span>{PERSONAL_INFO.status}</span>
        </div>
      </motion.div>
    </div>

    <div className="social-connections">
      <motion.h3 variants={fadeInUp}>Connect with me</motion.h3>
      <motion.div 
        className="social-grid"
        variants={fadeInUp}
      >
        {SOCIAL_LINKS.map(link => (
          <motion.a
            key={link.id}
            href={link.url}
            className="social-item"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: "var(--neon-glow)" }}
          >
            <img src={link.icon} alt={link.label} className="social-icon" />
            <span>{link.label}</span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

export default ContactContent; 