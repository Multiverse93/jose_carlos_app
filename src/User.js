import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOption } from "./features/option/optionSlice";
import { readUser, setUser } from "./features/user/userSlice";
import http from "./http";

const useUser = () => {
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [repitedPassword, setRepitedPassword] = useState('');

    const saveUser = (onSuccess) => {
        if (password !== repitedPassword) {
            alert('las contraseñas no coinciden');
            return;
        }
        http.patch('/user', {
            id,
            firstName,
            lastName,
            email,
            admin,
            password,
        })
        .then(response => {
            onSuccess();
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }

    const set = user => {
        setId(user.id);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setAdmin(user.admin);
        setPassword(user.password);
        setRepitedPassword(user.password);
    }

    return {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        admin, setAdmin,
        password, setPassword,
        repitedPassword, setRepitedPassword,
        saveUser,
        set,
    };
}

function User() {
    const dispatch = useDispatch();
    const user = useSelector(readUser);
    const {
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        admin, setAdmin,
        password, setPassword,
        repitedPassword, setRepitedPassword,
        saveUser,
        set,
    } = useUser();

    useEffect(() => {
        if (user != null && user !== undefined) {
            set(user);
        }
    }, []);

    return (
        <div>
            <h1>{user?.id > 0 ? 'Editar Usuario' : 'Crear Usuario'}</h1>
            <label>Nombres</label><br/>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/><br/>
            <label>Apellidos</label><br/>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/><br/>
            <label>Correo electronico</label><br/>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <label>Administrador</label>
            <input type="checkbox" checked={admin} onChange={e => setAdmin(!admin)}/><br/>
            <label>Contraseña</label><br/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <label>Repite contraseña</label><br/>
            <input type="password" value={repitedPassword} onChange={e => setRepitedPassword(e.target.value)}/><br/>
            <button onClick={() => saveUser(() =>{ dispatch(setUser(null)); dispatch(changeOption(3)); })}>Guardar</button>
            <button onClick={() => { dispatch(setUser(null)); dispatch(changeOption(3));}}>Regresar</button>
        </div>
    );
}

export default User;