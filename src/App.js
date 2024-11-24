import React, { useState } from 'react';
import './App.css';
import VocabStudy from './components/VocabStudy';

function App() {
  const [selectedSection, setSelectedSection] = useState(null);

  const n1Sections = [
    { id: '001-100', name: 'Stage 1' },
    { id: '101-200', name: 'Stage 2' },
    { id: '201-300', name: 'Stage 3' },
    { id: '301-400', name: 'Stage 4' },
    { id: '401-500', name: 'Stage 5' },
  ];

  const n2Sections = n1Sections.map(section => ({
    ...section,
    id: `n2/${section.id}`
  }));

  if (selectedSection) {
    return <VocabStudy section={selectedSection} onBack={() => setSelectedSection(null)} />;
  }

  return (
    <div className="App">
      <div className="main-screen">
        <h1 className="title">単語百先生</h1>
        
        <div className="level-section">
          <h2 className="level-title">N1</h2>
          <div className="section-buttons">
            {n1Sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="section-button"
              >
                <span>Stage</span>
                <span>{section.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="level-section">
          <h2 className="level-title">N2</h2>
          <div className="section-buttons">
            {n2Sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className="section-button"
              >
                <span>Stage</span>
                <span>{section.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="level-section coming-soon">
          <h2 className="level-title">N3</h2>
          <p className="coming-soon-text">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default App;
