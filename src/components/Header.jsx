import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { SocialIcon } from './ui/SocialIcon';
import { NAVIGATION_ITEMS, SOCIAL_LINKS, PERSONAL_INFO } from '../constants';
import { fadeIn, fadeInUp } from '../constants/animations';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { displayText } = useTypingEffect(`Hello, I'm ${PERSONAL_INFO.name}_`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className="header-content">
        <motion.h1 className="typing-text" variants={fadeIn}>
          {displayText}
        </motion.h1>

        <nav>
          <motion.ul className="nav-links">
            {NAVIGATION_ITEMS.map(({ id, label }, index) => (
              <motion.li
                key={id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a href={`#${id}`}>{label}</a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="social-links">
          {SOCIAL_LINKS.map(link => (
            <SocialIcon key={link.id} {...link} />
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 