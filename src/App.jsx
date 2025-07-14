import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Section from './components/Section';
import ErrorBoundary from './components/ErrorBoundary';
import { SKILLS, PERSONAL_INFO } from './constants';
import { fadeInUp, staggerChildren } from './constants/animations';
import './App.css';

// Lazy load section contents for better performance
const AboutContent = React.lazy(() => import('./components/sections/AboutContent'));
const SkillsContent = React.lazy(() => import('./components/sections/SkillsContent'));
const ContactContent = React.lazy(() => import('./components/sections/ContactContent'));

const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="loading-fallback"
  >
    Loading...
  </motion.div>
);

const ErrorFallback = ({ error }) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()}>Retry</button>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Section 
            id="about"
            title="About Me"
            content={<AboutContent />}
          />

          <Section
            id="skills"
            title="Tech Stack"
            content={<SkillsContent />}
          />

          <Section
            id="contact"
            title="Connect"
            content={<ContactContent />}
          />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

export default App; 