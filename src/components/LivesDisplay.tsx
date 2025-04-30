
import React, { useEffect, useState } from 'react';

interface LivesState {
  count: number;
  lastReset: string;
}

const LivesDisplay: React.FC = () => {
  const [lives, setLives] = useState<LivesState>({ count: 3, lastReset: '' });
  
  useEffect(() => {
    // Check if lives data exists in localStorage
    const storedLives = localStorage.getItem('lives');
    
    if (storedLives) {
      const parsedLives = JSON.parse(storedLives) as LivesState;
      const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
      
      // Check if we need to reset lives (new day)
      if (parsedLives.lastReset !== today) {
        const resetLives: LivesState = {
          count: 3, // Reset to full lives
          lastReset: today
        };
        localStorage.setItem('lives', JSON.stringify(resetLives));
        setLives(resetLives);
      } else {
        setLives(parsedLives);
      }
    } else {
      // Initialize lives data if it doesn't exist
      const initialLives: LivesState = {
        count: 3,
        lastReset: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem('lives', JSON.stringify(initialLives));
      setLives(initialLives);
    }
  }, []);
  
  const renderHearts = () => {
    const hearts = [];
    
    // Full hearts
    for (let i = 0; i < lives.count; i++) {
      hearts.push(
        <svg key={`full-${i}`} className="w-6 h-6 text-brand-red" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    // Empty hearts
    for (let i = 0; i < (3 - lives.count); i++) {
      hearts.push(
        <svg key={`empty-${i}`} className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      );
    }
    
    return hearts;
  };

  return (
    <div className="flex items-center space-x-1">
      {renderHearts()}
    </div>
  );
};

export default LivesDisplay;
