import React, { useState, useEffect } from 'react';
import './VocabStudy.css';

const VocabStudy = ({ section, onBack }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState(new Set());
  const [remainingWords, setRemainingWords] = useState([]);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch(`/n1/${section}.json`);
        const data = await response.json();
        setWords(data);
        setRemainingWords(data.map((_, index) => index));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    loadWords();
  }, [section]);

  if (words.length === 0) return null;

  const currentWord = words[remainingWords[currentIndex]];
  const totalKnown = knownWords.size;
  const totalWords = words.length;

  const handleKnown = () => {
    setKnownWords(prev => new Set(prev.add(remainingWords[currentIndex])));
    const newRemaining = remainingWords.filter((_, idx) => idx !== currentIndex);
    setRemainingWords(newRemaining);
    
    if (newRemaining.length === 0) {
      if (knownWords.size === totalWords) {
        alert('축하합니다! 모든 단어를 학습하셨습니다! 🎉');
        onBack();
        return;
      }
      // 새로운 사이클 시작
      const unknownWords = words
        .map((_, idx) => idx)
        .filter(idx => !knownWords.has(idx));
      setRemainingWords(unknownWords);
      setCycle(prev => prev + 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev % newRemaining.length);
    }
    setIsFlipped(false);
  };

  const handleUnknown = () => {
    const nextIndex = (currentIndex + 1) % remainingWords.length;
    setCurrentIndex(nextIndex);
    setIsFlipped(false);
  };

  return (
    <div className="study-container">
      <button className="back-button" onClick={onBack}>←</button>
      
      <div className="stats">
        <div className="cycle">
          <span className="stats-label">사이클</span>
          <span className="stats-value">{cycle}</span>
        </div>
        <div className="progress">
          <span className="stats-label">진행도</span>
          <span className="stats-value">{totalKnown} / {totalWords}</span>
        </div>
        <div className="remaining">
          <span className="stats-label">남은 단어</span>
          <span className="stats-value">{remainingWords.length}</span>
        </div>
      </div>
      
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="front">
          <span className="card-number">#{currentWord.id}</span>
          <div className="content">{currentWord.kanji}</div>
        </div>
        <div className="back">
          <span className="card-number">#{currentWord.id}</span>
          <div className="content">
            <div className="reading">{currentWord.hiragana}</div>
            <div className="meaning">{currentWord.meaning}</div>
          </div>
        </div>
      </div>

      <div className="answer-buttons">
        <button className="unknown-btn" onClick={handleUnknown}>모르겠어요</button>
        <button className="known-btn" onClick={handleKnown}>알고있어요</button>
      </div>
    </div>
  );
};

export default VocabStudy; 