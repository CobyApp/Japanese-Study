import React, { useState, useEffect } from 'react';
import './VocabStudy.css';

const VocabStudy = ({ section, onBack }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState(new Set());
  const [remainingWords, setRemainingWords] = useState([]);
  const [cycle, setCycle] = useState(1);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/n1/${section}.json`);
        const data = await response.json();
        setWords(data);
        setRemainingWords(data.map((_, index) => index));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWords();
  }, [section]);

  if (isLoading || words.length === 0) {
    return (
      <div className="study-container n1">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (showCompletionPopup) {
    return (
      <div className="study-container n1">
        <div className="popup-overlay" onClick={() => onBack()} />
        <div className="completion-popup">
          <div className="popup-content">
            <h2 className="popup-title">축하합니다! 🎉</h2>
            <p className="popup-message">모든 단어를 학습하셨습니다!</p>
            <button className="popup-button" onClick={onBack}>
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentWord = words[remainingWords[currentIndex]];
  const totalKnown = knownWords.size;
  const totalWords = words.length;

  const handleKnown = () => {
    setKnownWords(prev => new Set(prev.add(remainingWords[currentIndex])));
    const newRemaining = remainingWords.filter((_, idx) => idx !== currentIndex);
    setRemainingWords(newRemaining);
    
    if (newRemaining.length === 0) {
      if (knownWords.size === totalWords) {
        setShowCompletionPopup(true);
        return;
      }
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
    <div className={`study-container n1`}>
      <button className="back-button" onClick={onBack}>←</button>
      
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="front">
          <span className="card-number">#{currentWord.id}</span>
          <span className="remaining-count">{remainingWords.length}</span>
          <div 
            className="content" 
            data-length={currentWord.kanji.length}
          >
            {currentWord.kanji}
          </div>
        </div>
        <div className="back">
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