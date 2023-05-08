import React from 'react';
import './App.css';
import Login from './pages/login/login';
import Signup from './pages/signup/Signup';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Notfound from './Notfound';
import Findit from './pages/fintit/Findit';
import Final from './pages/Final/Final'
import Win from './pages/win';
import Start from './pages/start';
import Lost from './pages/lost';
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { CgProfile } from 'react-icons/cg'
import Admin from './pages/admin/admin';

function App() {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='app'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                {/* <button className="btn-dark btn" ><img src={treasure} className='icon' style={{ scale: "1.8" }} alt="logo" /></button> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    localStorage.getItem("token") == null &&
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="signup">Signup</Link>
                            </li>
                        </ul>
                    </div>
                }

                {localStorage.getItem("token") !== null &&
                    <NavDropdown
                        title={<>
                            <CgProfile scale={"5"} className='d-inline' />
                            <p className="lead d-inline">{localStorage.getItem("username")}</p>
                        </>}
                        id="collasible-nav-dropdown"
                        className="drop-down ms-auto"
                    >
                        <NavDropdown.Item>Change password</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                }
            </nav>

                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/find-it' element={<Findit />} />
                    <Route path='/final' element={<Final />} />
                    <Route path='/win' element={<Win />} />
                    <Route path='/lost' element={<Lost />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<Notfound />} />
                </Routes>
        </div>
    );
}

export default App;
