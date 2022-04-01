import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOption } from "./features/option/optionSlice";
import { setUser } from "./features/user/userSlice";
import http from "./http";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const readUsers = () => {
        http.get('/user')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error(error.response.data);
        });
    };

    return {
        users, setUsers,
        readUsers,
    };
}

function Users() {
    const dispatch = useDispatch();
    const { users, readUsers } = useUsers();

    useEffect(() => {
        readUsers();
    }, []);

    return (
        <div className="user__panel">
            <h1>Usuarios</h1>
            <div className="user__options">
                <Tooltip title="Regresar">
                    <Button color='success' onClick={() => dispatch(changeOption(2))}><ArrowBackIcon/></Button>
                </Tooltip>
                <Button color='success' variant='contained' onClick={() => dispatch(changeOption(4))}>Nuevo Usuario</Button><br/><br/>
            </div>
            {users?.map(user => (
                <div className="user__card">
                    <div key={user.id} onClick={() => { dispatch(setUser(user)); dispatch(changeOption(4));}}>
                        <label><b>Nombre:</b> {user.firstName} {user.lastName}</label><br/>
                        <label><b>Correo electronico:</b> {user.email}</label><br/>
                        <label><b>{user.admin ? 'Veterinario': 'Cliente'}</b></label><br/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Users;