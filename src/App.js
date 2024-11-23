import React, { useState } from 'react';
import './App.css';
import VocabStudy from './components/VocabStudy';

function App() {
  const [selectedSection, setSelectedSection] = useState(null);

  const sections = [
    { id: '001-100', name: '1-100' },
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
        <h1 className="title">JLPT N1 단어 학습</h1>
        <div className="section-buttons">
          {sections.map((section) => (
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
    </div>
  );
}

export default App;
