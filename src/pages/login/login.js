import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submit = async (e) => {
        console.log("first")
        e.preventDefault()
        const userDetails = {
            email: email,
            password: password
        }

        const admin = "admin@gmail.com"
        const pwd = "admin"
        if (email == admin && password == pwd) {
            localStorage.setItem("isAdmin", 1)
            navigate("/admin")
        }

        else {
            let response = await axios.post('/users/login', userDetails);

            if (response.data.message === "Wrong user name" || response.data.message === "incorrect password") {
                alert(response.data.message)
            }
            else {
                localStorage.setItem("token", response.data)
                localStorage.setItem("username", userDetails.email)
                navigate("/find-it")
            }
        }
    }

    return (
        <div className="login-outer bg-primary">
            <form className="login-form bg-light p-4 rounded">
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="button" onClick={submit} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Login
