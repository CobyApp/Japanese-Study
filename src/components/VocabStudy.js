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
  const [wordStats, setWordStats] = useState({});
  const [mostMissedWords, setMostMissedWords] = useState([]);

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
    setWordStats(prev => ({
      ...prev,
      [currentWord.id]: (prev[currentWord.id] || 0) + 1
    }));
    moveToNextWord(false);
  };

  const getMostMissedWords = () => {
    const sortedWords = Object.entries(wordStats)
      .map(([id, count]) => ({
        word: words.find(w => w.id === id),
        missCount: count
      }))
      .sort((a, b) => b.missCount - a.missCount)
      .slice(0, 6);

    setMostMissedWords(sortedWords);
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
      getMostMissedWords();
      setCompleted(true);
      return;
    }

    setRemainingWords(newRemainingWords);
    setCurrentWord(newRemainingWords[0]);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!words.length || !currentWord) {
    return <div className="loading">단어를 불러오는 중...</div>;
  }

  if (completed) {
    return (
      <div className="vocab-study" data-level={level}>
        <div className="study-content">
          <div className="completed">
            <div className="completed-header">
              <div className="completed-icon">🎉</div>
              <h2>Stage Clear!</h2>
              <p className="completed-message">100개의 단어를 모두 마스터했습니다</p>
            </div>
            
            {mostMissedWords.length > 0 && (
              <div className="missed-words-section">
                <h3>자주 틀린 단어</h3>
                <div className="missed-words-grid">
                  {mostMissedWords.map(({ word, missCount }) => (
                    <div key={word.id} className="missed-word-card">
                      <div className="missed-count-badge">{missCount}회</div>
                      <div className="missed-word-content">
                        <div className="missed-word-kanji">{word.kanji}</div>
                        <div className="missed-word-reading">{word.hiragana}</div>
                        <div className="missed-word-meaning">{word.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="completed-buttons">
              <button onClick={() => navigate('/')}>메인으로 돌아가기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vocab-study" data-level={level}>
      <header className="study-header">
        <button className="back-link" onClick={() => navigate('/')}>
          ← 메인으로
        </button>
        <div className="progress-info">
          <div className="progress-bar">
            <div 
              className="progress"
              style={{ width: `${(masteredCount / words.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">{masteredCount} / {words.length}</span>
        </div>
      </header>

      <main className="study-content">
        <div className="card-container">
          <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            <div className="card-face card-front">
              <span className="card-number">#{currentWord.id}</span>
              <span className="card-word">{currentWord.kanji}</span>
              <span className="card-hint">터치하여 확인하기</span>
            </div>
            <div className="card-face card-back">
              <span className="card-reading">{currentWord.hiragana}</span>
              <span className="card-meaning">{currentWord.meaning}</span>
            </div>
          </div>
        </div>

        <div className="answer-buttons">
          <button className="unknown-button" onClick={handleUnknown}>
            아직 모르겠어요
          </button>
          <button className="known-button" onClick={handleKnown}>
            외웠어요!
          </button>
        </div>
      </main>
    </div>
  );
}

export default VocabStudy; 