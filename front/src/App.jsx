import React from 'react';
import ReadCards from './components/ReadCards'
import './index.css'; // Import Tailwind CSS

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReadCards />
      </header>
    </div>
  );
}

export default App;
