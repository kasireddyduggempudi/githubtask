import React from 'react';
import logo from './logo.svg';
import './App.css';

import NavbarNew from './components/NavbarNew';
import MainBody from './components/MainBody';
import Navbar from './components/NavbarNew';

function App() {

  return (
    <div className="App">
      <NavbarNew />
      <MainBody />
    </div>
  );
}

export default App;
