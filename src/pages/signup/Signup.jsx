import React, { useState } from "react";
import './signup.css'
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Signup() {
    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        const userDetails = {
            username: fname,
            email: email,
            password: password
        }
        
        let newUserEntry = await axios.post('/users/createuser', userDetails)
        if (newUserEntry.data.message == "Username already exists") {
            alert(newUserEntry.data.message)
        }
        else {
            alert(newUserEntry.data.message)
            navigate('/login')
        }

    }

    return (
        <div className="signup-outer bg-primary">
            <form onSubmit={submit} className="signup-form bg-light p-4 rounded">
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </div>

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
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>
    )
}

export default Signup