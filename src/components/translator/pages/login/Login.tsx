import  { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import {login, saveToken} from '../../../../service/api.login'
import logomicro from "../../../../assets/logo-micro.svg"
import "./login.css";

interface LoginProps {
    onLogin: () => void;
}


export const Login = ({onLogin}: LoginProps) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!username || !password){
            toast.error("Por favor, completa todos los campos.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const response = await login({email: username, password})
            if(response.token){
                saveToken(response.token)
                onLogin();
                toast.success("Bienvenido")
                navigate("/translators/profile")
            }else{
                setError("Error en la autenticacion Login.tsx 36")
            }
        } catch (error) {
            toast.error("Error al iniciar sesión. Verificar credenciales")
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-form-section">
                <div className="login-form-container">
                    <h1 className="login-title">Inicia Sesión</h1>
                    {error && <p className="login-error">{error}</p>}
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)}
                                    placeholder="Usuario"
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                    required
                                />
                            </label>
                        </div>

                        <button type="submit" className="login-button">
                            {loading ? "Cargando...": "Iniciar Sesión"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="login-image-section">
                <img
                    src={logomicro}
                    alt="Login"
                    className="login-image"
                />

                </div>
        </div>
    );
};
