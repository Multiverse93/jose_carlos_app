import './index.css';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOption } from "./features/option/optionSlice";
import http from "./http";
import Question from "./Question";
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

const useQuestionHook = () => {
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    const readQuestions = () => {
        http.get('/question')
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.error(error.response.data);
        });
    };

    const createQuestion = () => {
        if (description.trim() === '') {
            return;
        }

        http.post('/question', {
            description,
            user: JSON.parse(localStorage.getItem('user')).id,
        })
        .then(response => {
            setDescription('');
            readQuestions();
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }

    return {
        description, setDescription,
        questions, setQuestions,
        createQuestion,
        readQuestions,
    };
};

function Questions() {
    const dispatch = useDispatch();
    const { description, setDescription, questions, createQuestion, readQuestions } = useQuestionHook();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        readQuestions();
    }, []);

    function logout() {
        dispatch(changeOption(1));
    }

    return (
        <div>
            <div className='question__banner'>
                <img className='question__banner' src='banner.jpg' alt='banner'/>
            </div>
            <div className='question__panel'>
                <h2>Hola {user.firstName} {user.lastName}! Haz tu pregunta</h2>
                <textarea rows={7} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <div className='question__options'>
                    {user?.admin ? (<Tooltip title="Usuarios"><Button color='success' onClick={() => dispatch(changeOption(3))}><PeopleIcon/></Button></Tooltip>) : (<></>)}
                    <Button color='success' variant='contained' onClick={() => createQuestion()}>Preguntar</Button>
                    <Tooltip title="Salir">
                        <Button color='success' onClick={() => logout()}><LogoutIcon/></Button>
                    </Tooltip>
                </div>
                {questions?.map(question => (
                    <Question key={question.id} question={question} onSuccess={() => readQuestions()}/>
                ))}
            </div>
        </div>
    );
}

export default Questions;