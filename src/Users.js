import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeOption } from "./features/option/optionSlice";
import { setUser } from "./features/user/userSlice";
import http from "./http";

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
        <div>
            <h1>Usuarios</h1>
            <button onClick={() => dispatch(changeOption(2))}>Regresar</button>
            <button onClick={() => dispatch(changeOption(4))}>Nuevo Usuario</button><br/><br/>
            {users?.map(user => (
                <div>
                    <div key={user.id} onClick={() => { dispatch(setUser(user)); dispatch(changeOption(4));}}>
                        <label>Nombre: {user.firstName} {user.lastName}</label><br/>
                        <label>Correo electronico: {user.email}</label><br/>
                        <label>Administrador: {user.admin ? 'Si': 'No'}</label><br/>
                    </div>
                    <br/>
                    <br/>
                </div>
            ))}
        </div>
    );
}

export default Users;