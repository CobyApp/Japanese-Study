import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VocabStudy.css';

function VocabStudy() {
  const { level, section } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch(`/${level}/${section}.json`);
        const data = await response.json();
        setWords(data);
        setRemainingWords(data);
        if (data.length > 0) {
          setCurrentWord(data[0]);
        }
      } catch (error) {
        console.error('Error loading words:', error);
      }
    }
    loadWords();
  }, [level, section]);

  const handleKnown = () => {
    setMasteredCount(prev => prev + 1);
    moveToNextWord(true);
  };

  const handleUnknown = () => {
    moveToNextWord(false);
  };

  const moveToNextWord = (wasKnown) => {
    setIsFlipped(false);
    
    const currentIndex = remainingWords.findIndex(w => w.id === currentWord.id);
    const newRemainingWords = [...remainingWords];
    newRemainingWords.splice(currentIndex, 1);

    if (!wasKnown) {
      newRemainingWords.push(currentWord);
    }

    if (newRemainingWords.length === 0 || masteredCount + 1 === words.length) {
      setCompleted(true);
      return;
    }

    setRemainingWords(newRemainingWords);
    setCurrentWord(newRemainingWords[0]);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRestart = () => {
    setRemainingWords(words);
    setCurrentWord(words[0]);
    setIsFlipped(false);
    setCompleted(false);
    setMasteredCount(0);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!words.length || !currentWord) {
    return <div className="loading">Loading...</div>;
  }

  if (completed) {
    return (
      <div className="vocab-study">
        <div className="completed">
          <h2>축하합니다!</h2>
          <p className="completed-message">100개의 단어를 모두 학습했습니다</p>
          <div className="completed-buttons">
            <button onClick={handleRestart}>다시 학습하기</button>
            <button onClick={handleBack}>메인으로</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-study">
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress"
            style={{ width: `${(masteredCount / words.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {masteredCount} / {words.length}
        </div>
      </div>

      <div className="card-container">
        <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
          <div className="card-face card-front">
            <span className="card-number">#{currentWord.id}</span>
            <span className="card-word">{currentWord.kanji}</span>
            <span className="card-hint">클릭하여 뒤집기</span>
          </div>
          <div className="card-face card-back">
            <span className="card-reading">{currentWord.hiragana}</span>
            <span className="card-meaning">{currentWord.meaning}</span>
            <span className="card-hint">클릭하여 뒤집기</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="unknown-button" onClick={handleUnknown}>
          모르겠어요
        </button>
        <button className="known-button" onClick={handleKnown}>
          알고있어요
        </button>
      </div>

      <button className="back-button" onClick={handleBack}>
        메인으로
      </button>
    </div>
  );
}

export default VocabStudy; 