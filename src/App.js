import React, { useState } from 'react';
import './App.css';
import VocabStudy from './components/VocabStudy';

function App() {
  const [selectedSection, setSelectedSection] = useState(null);

  const n1Sections = [
    { id: '001-100', name: '001-100' },
    { id: '101-200', name: '101-200' },
    { id: '201-300', name: '201-300' },
    { id: '301-400', name: '301-400' },
    { id: '401-500', name: '401-500' },
  ];

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
                {section.name}
              </button>
            ))}
          </div>
        </div>

        <div className="level-section coming-soon">
          <h2 className="level-title">N2</h2>
          <p className="coming-soon-text">Coming Soon</p>
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
