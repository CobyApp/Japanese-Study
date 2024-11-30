import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import './VocabStudy.css';

function VocabStudy() {
  const { level, section } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');
  
  const [words, setWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [wordStats, setWordStats] = useState({});
  const [mostMissedWords, setMostMissedWords] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const moveToNextWord = useCallback((wasKnown) => {
    if (!currentWord) return;

    setIsFlipped(false);
    
    const currentIndex = remainingWords.findIndex(w => w.id === currentWord.id);
    const newRemainingWords = [...remainingWords];
    newRemainingWords.splice(currentIndex, 1);

    if (!wasKnown) {
      setWordStats(prev => ({
        ...prev,
        [currentWord.id]: (prev[currentWord.id] || 0) + 1
      }));
      newRemainingWords.push(currentWord);
    }

    if (newRemainingWords.length === 0 || masteredCount + 1 === words.length) {
      getMostMissedWords();
      setCompleted(true);
      return;
    }

    setRemainingWords(newRemainingWords);
    setCurrentWord(newRemainingWords[0]);
  }, [currentWord, remainingWords, masteredCount, words.length]);

  const handleKnown = useCallback(() => {
    setMasteredCount(prev => prev + 1);
    moveToNextWord(true);
  }, [moveToNextWord]);

  const handleUnknown = useCallback(() => {
    if (!currentWord) return;
    
    setWordStats(prev => ({
      ...prev,
      [currentWord.id]: (prev[currentWord.id] || 0) + 1
    }));
    moveToNextWord(false);
  }, [currentWord, moveToNextWord]);

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch(`/${level}/${section}.json`);
        const data = await response.json();
        
        if (mode === 'split') {
          const startIndex = currentSet * 10;
          const endIndex = startIndex + 10;
          const currentSetWords = data.slice(startIndex, endIndex);
          setWords(currentSetWords);
          setRemainingWords(currentSetWords);
          if (currentSetWords.length > 0) {
            setCurrentWord(currentSetWords[0]);
          }
        } else {
          setWords(data);
          setRemainingWords(data);
          if (data.length > 0) {
            setCurrentWord(data[0]);
          }
        }
      } catch (error) {
        console.error('Error loading words:', error);
      }
    }
    loadWords();
  }, [level, section, mode, currentSet]);

  useEffect(() => {
    function handleKeyPress(event) {
      if (completed || !currentWord) return;

      switch(event.key.toLowerCase()) {
        case 'z':
          handleUnknown();
          break;
        case 'x':
          handleKnown();
          break;
        case 'c':
          handleFlip();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [completed, currentWord, handleKnown, handleUnknown, handleFlip]);

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

  const moveToNextSet = useCallback(() => {
    const nextSet = currentSet + 1;
    if (nextSet * 10 < 100) {
      setCurrentSet(nextSet);
      setCompleted(false);
      setMasteredCount(0);
      setWordStats({});
      setMostMissedWords([]);
    } else {
      navigate('/');
    }
  }, [currentSet, navigate]);

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
              <p className="completed-message">
                {mode === 'split' 
                  ? `${currentSet + 1}번째 세트 (${currentSet * 10 + 1}-${(currentSet + 1) * 10}) 완료!`
                  : '100개의 단어를 모두 마스터했습니다'}
              </p>
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
              {mode === 'split' && currentSet * 10 + 10 < 100 ? (
                <>
                  <button onClick={moveToNextSet}>다음 10개 학습하기</button>
                  <button onClick={() => navigate('/')}>메인으로</button>
                </>
              ) : (
                <button onClick={() => navigate('/')}>메인으로</button>
              )}
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
          ←
        </button>
        <div className="keyboard-shortcuts">
          <span>Z: 모르겠어요</span>
          <span>X: 외웠어요</span>
          <span>C: 뒤집기</span>
        </div>
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