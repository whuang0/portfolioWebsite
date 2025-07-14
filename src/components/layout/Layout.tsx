import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header';
import { PERSONAL_INFO } from '../../constants';
import { fadeInUp } from '../../constants/animations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <div className="app">
        <Header />
        
        <motion.main
          className="main-content"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>

        <motion.footer
          className="footer"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <p>Copyright © {new Date().getFullYear()} {PERSONAL_INFO.name}</p>
        </motion.footer>
      </div>
    </AnimatePresence>
  );
};

export default Layout; 