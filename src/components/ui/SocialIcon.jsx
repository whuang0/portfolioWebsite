import React from 'react';
import { motion } from 'framer-motion';

export const SocialIcon = ({ url, icon, label }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <img src={icon} alt={label} className="social-icon" />
  </motion.a>
); 