import React, { useState, useEffect } from 'react';

const VocabStudy = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    // JSON 파일들을 불러옵니다
    const loadWords = async () => {
      try {
        const responses = await Promise.all([
          fetch('/n1/001-100.json'),
          fetch('/n1/101-200.json'),
          fetch('/n1/201-300.json'),
          fetch('/n1/301-400.json'),
          fetch('/n1/401-500.json')
        ]);
        
        const jsonData = await Promise.all(responses.map(res => res.json()));
        const allWords = jsonData.flat();
        setWords(allWords);
      } catch (error) {
        console.error('단어 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    loadWords();
  }, []);

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
    setShowMeaning(false);
  };

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  if (words.length === 0) return <div>로딩중...</div>;

  const currentWord = words[currentWordIndex];

  return (
    <div className="vocab-study">
      <div className="card">
        <h2>{currentWord.word}</h2>
        <p>{currentWord.reading}</p>
        <button onClick={toggleMeaning}>
          {showMeaning ? '뜻 숨기기' : '뜻 보기'}
        </button>
        {showMeaning && (
          <div className="meaning">
            <p>{currentWord.meaning}</p>
          </div>
        )}
        <button onClick={nextWord}>다음 단어</button>
      </div>
      <div className="progress">
        {currentWordIndex + 1} / {words.length}
      </div>
    </div>
  );
};

export default VocabStudy; 