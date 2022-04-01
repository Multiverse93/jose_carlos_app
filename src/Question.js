import dayjs from "dayjs";
import { useState } from "react";
import http from "./http";
import Reply from "./Reply";
import Button from '@mui/material/Button';

const useReplyHook = () => {
    const [description, setDescription] = useState('');

    const createReply = (question, onSuccess) => {
        if (description.trim() === '') {
            return;
        }
        
        http.post('/reply', {
            description,
            question,
            user: JSON.parse(localStorage.getItem('user')).id,
        })
        .then(response => {
            setDescription('');
            onSuccess();
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }

    return {
        description, setDescription,
        createReply,
    };
}

function Question(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const { description, setDescription, createReply } = useReplyHook();

    return (
        <div className="question__card">
            <label><b>{props.question.description}</b></label><br/>
            <small>Por {props.question.user.firstName} {props.question.user.lastName} - {dayjs(props.question.createdOn).format('DD/MMMM/YYYY - h:mm:ss A')}</small><br/>
            {props.question?.replies?.map(reply => (
                <Reply key={reply.id} obj={reply}></Reply>
            ))}
            {user.admin ? (
                <div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea><br/>
                    <Button color='success' variant='contained' onClick={() => createReply(props.question.id, props.onSuccess)}>Responder</Button>
                </div>
            ) : (<div></div>)}
        </div>
    );
}

export default Question;