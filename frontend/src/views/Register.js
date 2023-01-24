import React, { useState } from 'react'
import {Link} from "react-router-dom";
import Alert from "../components/Alert";
import axios from 'axios';
import bgImg from "../bg.jpg";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState({});

    const Register = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            "email": email,
            "password": password,
            "password_confirm": confirmationPassword
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8888/api/v1/register',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(response => {
                setIsShow(true);
                setMessage({type: 'alert-success', message: response.data.message});
            })
            .catch(error => {
                setIsShow(true);
                if (typeof error.response.data.errors !== 'undefined' && error.response.data.errors.length > 0){
                    const errors = error.response.data.errors.map((element) => {
                        return `<p>${element.msg}</p>`;
                    });
                    setMessage({type: 'alert-danger', message: errors});
                } else {
                    setMessage({type: 'alert-danger', message: error.response.data.message});
                }
            });
    }

    const validateForm = () => {
        return email.length > 0 && password.length > 0 && (confirmationPassword.length > 0 && confirmationPassword === password);
    }

    const bg = {backgroundImage: `url(${ bgImg })`};

    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2 className="heading-section">APP NAME</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="login-wrap py-5">
                            <div className="img d-flex align-items-center justify-content-center" style={bg}></div>
                            <h3 className="text-center mb-0">Welcome</h3>
                            <p className="text-center">Register by entering the information below</p>
                            <form onSubmit={Register} className="login-form">
                                { (isShow) ? <Alert type={message.type} message={message.message}/> : ''  }
                                <div className="form-group">
                                    <div className="icon d-flex align-items-center justify-content-center"><span
                                        className="fa fa-user"></span></div>
                                    <input type="text" className="form-control" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <div className="icon d-flex align-items-center justify-content-center"><span
                                        className="fa fa-lock"></span></div>
                                    <input type="password" className="form-control" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <div className="icon d-flex align-items-center justify-content-center"><span
                                        className="fa fa-lock"></span></div>
                                    <input type="password" className="form-control" placeholder="********" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <button type="submit"
                                            className="btn form-control btn-primary rounded submit px-3" disabled={!validateForm()}>REGISTER
                                    </button>
                                </div>
                            </form>
                            <div className="w-100 text-center mt-4 text">
                                <p className="mb-0">You have an account?</p>
                                <Link to="/">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
