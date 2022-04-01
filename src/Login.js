import './App.css';
import { useState } from "react";
import http from "./http";
import { useDispatch } from 'react-redux';
import { changeOption } from './features/option/optionSlice';
import Button from '@mui/material/Button';

const useLoginHook = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const login = (onSuccess, onError) => {
      http.post('/login', {
        email,
        password,
      })
      .then(response => {
        onSuccess(response.data);
      })
      .catch(error => {
        onError(error.response.data);
        setPassword('');
      });
    };
  
    return {
      email, setEmail,
      password, setPassword,
      login,
    };
  }

function Login(props) {
    const dispatch = useDispatch();
    const { email, setEmail, password, setPassword, login } = useLoginHook();
  
    function onSuccess(e) {
        localStorage.setItem('user', JSON.stringify(e));
        dispatch(changeOption(2));
    }
  
    function onError(e) {
      alert('Usuario y/o contraseña incorrectos');
    }

    return (
        <div className="App">
          <header className="App-header">
            <img src='logo.jpg' alt='logo'/>
            <h1>Bienvenido!</h1>
            <input type="text" placeholder="Correo electronico" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
            <Button color='success' variant='contained' onClick={() => login(onSuccess, onError)}>Ingresar</Button>
          </header>
        </div>
    );
}

export default Login;