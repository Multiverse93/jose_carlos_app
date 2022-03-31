import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOption } from "./features/option/optionSlice";
import http from "./http";
import Question from "./Question";

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
            <h2>Hola {user.firstName} {user.lastName}!</h2>
            <h2>Haz tu pregunta</h2>
            <div >
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea><br/>
                <button onClick={() => createQuestion()}>Preguntar</button>
                <button onClick={() => readQuestions()}>Actualizar</button>
                {user?.admin ? (<button onClick={() => dispatch(changeOption(3))}>Usuarios</button>) : (<></>)}
                <button onClick={() => logout()}>Salir</button>
            </div>
            <h1>Preguntas</h1>
            {questions?.map(question => (
                <Question key={question.id} question={question} onSuccess={() => readQuestions()}/>
            ))}
        </div>
    );
}

export default Questions;