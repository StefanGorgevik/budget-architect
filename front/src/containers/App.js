import React from 'react';
import './App.css';
import BudgetCalc from './BudgetCalc/BudgetCalc'
import Header from '../components/BudgetCalc/Header/Header'

function App() {
  return (
    <div className="App">
    <Header/>
        <BudgetCalc/>
    </div>
  );
}

export default App;
