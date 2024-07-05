import React from 'react';
import WebFont from 'webfontloader';

import "./App.scss";
import Home from './pages/Home/Home';
import { Routes, Route}  from 'react-router-dom'
import Login from './pages/login/Login';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Work Sans', 'Inter']
      }
    });
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
