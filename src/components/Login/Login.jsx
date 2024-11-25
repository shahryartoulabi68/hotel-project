import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthProvider"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("shahryar@gamil.com")
    const [password, setPassword] = useState("1234")

    const navigate = useNavigate()

    const { user, login, isAuthenticated } = useAuth()
    const handleLogin = (e) => {
        e.preventDefault()
        if (email && password) login(email, password)
    }
    console.log(user);
    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true })
    }, [isAuthenticated, navigate])

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form action="" className="form" onSubmit={handleLogin}>
                <div className="formControl">
                    <label htmlFor="email">email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="password">email</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="button">
                    <button className="btn btn--primary">Login</button>
                </div>
            </form>

        </div>
    )
}

export default Login
