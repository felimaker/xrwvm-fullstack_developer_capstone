import React, { useState } from 'react';// Opcional, si quieres darle estilos

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        const login_url = "/djangoapp/login";
        
        const res = await fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            }),
        });

        const json = await res.json();
        if (json.status != null && json.status === "Authenticated") {
            sessionStorage.setItem('username', json.userName);
            window.location.href = "/"; // Redirige a la página principal
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div>
            <form onSubmit={login}>
                <h2>Iniciar Sesión</h2>
                <div>
                    <label>Usuario: </label>
                    <input 
                        type="text" 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Ingresa tu usuario" 
                        required 
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Ingresa tu contraseña" 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;