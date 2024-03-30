import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path="/" component={RegistrationForm} /> */}
        <RegistrationForm /> {}
      </div>
    </Router>
  );
}

export default App;