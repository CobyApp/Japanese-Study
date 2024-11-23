import React, { useState, useEffect } from 'react';
import './VocabStudy.css';

const VocabStudy = ({ section, onBack }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch(`/n1/${section}.json`);
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    loadWords();
  }, [section]);

  if (words.length === 0) return null;

  const currentWord = words[currentIndex];

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setIsFlipped(false);
  };

  const prevWord = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    setIsFlipped(false);
  };

  return (
    <div className="study-container">
      <button className="back-button" onClick={onBack}>←</button>
      
      <div className="counter">{currentIndex + 1} / {words.length}</div>
      
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="front">
          <div className="content">{currentWord.kanji}</div>
        </div>
        <div className="back">
          <div className="content">
            <div className="reading">{currentWord.hiragana}</div>
            <div className="meaning">{currentWord.meaning}</div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={prevWord}>←</button>
        <button onClick={nextWord}>→</button>
      </div>
    </div>
  );
};

export default VocabStudy; 