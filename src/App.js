import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sections = [
    { id: '001-100', name: 'Stage 1', range: '001-100' },
    { id: '101-200', name: 'Stage 2', range: '101-200' },
    { id: '201-300', name: 'Stage 3', range: '201-300' },
    { id: '301-400', name: 'Stage 4', range: '301-400' },
    { id: '401-500', name: 'Stage 5', range: '401-500' },
  ];

  const handleStageClick = (level, section) => {
    setSelectedStage({ level, section });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStage(null);
  };

  return (
    <div className="App">
      <div className="main-screen">
        <header className="main-header">
          <h1 className="title">単語百先生</h1>
          <div className="title-decoration"></div>
          <p className="subtitle">100개씩 클리어하며 단어를 정복해보세요!</p>
        </header>
        
        <div className="levels-container">
          <section className="level-section n1-section">
            <div className="level-header">
              <span className="level-badge">N1</span>
            </div>
            <div className="stage-grid">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className="stage-card"
                  onClick={() => handleStageClick('n1', section.id)}
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="level-section n2-section">
            <div className="level-header">
              <span className="level-badge">N2</span>
              <span className="stage-count">5 Stages</span>
            </div>
            <div className="stage-grid">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className="stage-card"
                  onClick={() => handleStageClick('n2', section.id)}
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="level-section n3-section">
            <div className="level-header">
              <span className="level-badge">N3</span>
              <span className="stage-count">5 Stages</span>
            </div>
            <div className="stage-grid">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className="stage-card"
                  onClick={() => handleStageClick('n3', section.id)}
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>학습 모드 선택</h3>
              <div className="modal-buttons">
                <Link 
                  to={`/study/${selectedStage.level}/${selectedStage.section}`}
                  className="modal-button"
                >
                  100개 한번에 학습하기
                </Link>
                <Link 
                  to={`/study/${selectedStage.level}/${selectedStage.section}?mode=split`}
                  className="modal-button"
                >
                  10개씩 나눠서 학습하기
                </Link>
              </div>
              <button className="modal-close" onClick={closeModal}>취소</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
