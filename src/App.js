import React from 'react';
import './App.css';
import Login from './Login';
import { useSelector } from 'react-redux';
import { readOption } from "./features/option/optionSlice";
import Questions from './Questions';
import Users from './Users';
import User from './User';

function App() {
  const option = useSelector(readOption);

  switch (option) {
    case 1: return <Login/>;
    case 2: return <Questions/>;
    case 3: return <Users/>;
    case 4: return <User/>;
    default: return <></>;
  }
}

export default App;
