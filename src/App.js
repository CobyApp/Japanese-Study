import React from 'react';
import './App.css';
import VocabStudy from './components/VocabStudy';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JLPT N1 단어 학습</h1>
      </header>
      <main>
        <VocabStudy />
      </main>
    </div>
  );
}

export default App;
