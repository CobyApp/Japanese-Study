import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const sections = [
    { id: '001-100', name: 'Stage 1' },
    { id: '101-200', name: 'Stage 2' },
    { id: '201-300', name: 'Stage 3' },
    { id: '301-400', name: 'Stage 4' },
    { id: '401-500', name: 'Stage 5' },
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
          <p className="subtitle">100개씩 스테이지를 클리어하며 단어를 마스터하세요</p>
        </header>
        
        <section className="level-section n1-section">
          <h2 className="level-title">
            <span className="level-badge">N1</span>
          </h2>
          <div className="section-buttons">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`/study/n1/${section.id}`}
                className="section-button"
              >
                <div className="button-content">
                  <span className="stage-name">{section.name}</span>
                  <span className="stage-range">{section.id.split('-')[0]}-{section.id.split('-')[1]}</span>
                </div>
                <div className="button-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="level-section n2-section">
          <h2 className="level-title">
            <span className="level-badge">N2</span>
          </h2>
          <div className="section-buttons">
            {n2Sections.map((section) => (
              <Link 
                key={section.id} 
                to={`/study/n2/${section.id.split('/')[1]}`}
                className="section-button"
              >
                <div className="button-content">
                  <span className="stage-name">{section.name}</span>
                  <span className="stage-range">{section.id.split('/')[1].split('-')[0]}-{section.id.split('/')[1].split('-')[1]}</span>
                </div>
                <div className="button-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="level-section n3-section">
          <h2 className="level-title">
            <span className="level-badge">N3</span>
          </h2>
          <div className="section-buttons">
            {n3Sections.map((section) => (
              <Link 
                key={section.id} 
                to={`/study/n3/${section.id.split('/')[1]}`}
                className="section-button"
              >
                <div className="button-content">
                  <span className="stage-name">{section.name}</span>
                  <span className="stage-range">{section.id.split('/')[1].split('-')[0]}-{section.id.split('/')[1].split('-')[1]}</span>
                </div>
                <div className="button-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
