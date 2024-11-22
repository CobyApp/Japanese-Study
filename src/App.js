import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const sections = [
    { id: '001-100', name: 'Stage 1', range: '001-100' },
    { id: '101-200', name: 'Stage 2', range: '101-200' },
    { id: '201-300', name: 'Stage 3', range: '201-300' },
    { id: '301-400', name: 'Stage 4', range: '301-400' },
    { id: '401-500', name: 'Stage 5', range: '401-500' },
  ];

  const n2Sections = sections.map(section => ({
    ...section,
    id: `n2/${section.id}`
  }));

  const n3Sections = sections.map(section => ({
    ...section,
    id: `n3/${section.id}`
  }));

  return (
    <div className="App">
      <div className="main-screen">
        <header className="main-header">
          <h1 className="title">単語百先生</h1>
          <div className="title-decoration"></div>
          <p className="subtitle">100개씩 스테이지를 클리어하며 단어를 정복해보세요!</p>
        </header>
        
        <div className="levels-container">
          <section className="level-section n1-section">
            <div className="level-header">
              <span className="level-badge">N1</span>
              <span className="stage-count">5 Stages</span>
            </div>
            <div className="stage-grid">
              {sections.map((section) => (
                <Link 
                  key={section.id} 
                  to={`/study/n1/${section.id}`}
                  className="stage-card"
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="level-section n2-section">
            <div className="level-header">
              <span className="level-badge">N2</span>
              <span className="stage-count">5 Stages</span>
            </div>
            <div className="stage-grid">
              {n2Sections.map((section) => (
                <Link 
                  key={section.id} 
                  to={`/study/n2/${section.id.split('/')[1]}`}
                  className="stage-card"
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="level-section n3-section">
            <div className="level-header">
              <span className="level-badge">N3</span>
              <span className="stage-count">5 Stages</span>
            </div>
            <div className="stage-grid">
              {n3Sections.map((section) => (
                <Link 
                  key={section.id} 
                  to={`/study/n3/${section.id.split('/')[1]}`}
                  className="stage-card"
                >
                  <div className="stage-info">
                    <span className="stage-name">{section.name}</span>
                    <span className="stage-range">{section.range}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
