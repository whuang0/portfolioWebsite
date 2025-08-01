import React from 'react';

const FloatingActionButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    // Add theme toggle logic here
    console.log('Theme toggled');
  };

  return (
    <div className="fab-container">
      <button className="fab scroll-top" onClick={scrollToTop} title="Scroll to top">
        ↑
      </button>
      <button className="fab theme-switcher" onClick={toggleTheme} title="Toggle theme">
        🌙
      </button>
    </div>
  );
};

export default FloatingActionButtons;