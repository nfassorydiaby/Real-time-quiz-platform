import React from 'react';
import { useOutlet } from 'react-router-dom'; 
import './index.css'; // Import Tailwind CSS
import NavBar from './components/NavBar';

function App() {
  const outlet = useOutlet(); 

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>

      {outlet} 
    </div>
  );
}

export default App;
