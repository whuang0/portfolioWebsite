import { useState, useEffect } from 'react';

export const useTypingEffect = (text, typingSpeed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsComplete(true);
      }
    };

    typeNextCharacter();

    return () => clearTimeout(timeoutId);
  }, [text, typingSpeed]);

  return { displayText, isComplete };
}; 