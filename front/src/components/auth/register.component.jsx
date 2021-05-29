import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from "validator";
import AuthService from '../../services/auth.service'
import './register.component.scss'
const required = value => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required
            </div>
        )
    }
}

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className='alert alert-danger' role='alert'>
                This email is not valid
            </div>
        )
    }
}

const usernameLength = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className='alert alert-danger' role='alert'>
                Username requires 3 to 20 character
            </div>
        )
    }
}

const passwordLength = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className='alert alert-danger' role='alert'>
                Password requires 6 to 40 character
            </div>
        )
    }
}

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            successful: false,
            message: ''
        }
    }

    componentDidMount() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.innerHTML = `
              <span></span>
              <span>${btn.textContent}</span>
            `
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: '',
            successful: false
        })

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password,
            )
                .then(res => {
                    this.setState({
                        message: res.data.message,
                        successful: true,
                    })
                }, error => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) || error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                    })
                })
        }
    }

    render() {
        return (
            <div className='register'>
                <div className='card'>
                    <h3 className="title">SIGN UP</h3>
                    <div className="borderbottom"></div>
                    <Form onSubmit={this.handleRegister} ref={c => { this.form = c }}>
                        {!this.state.successful && (
                            <div>
                                <div className='form-group'>
                                    {/* <label htmlFor="username">Username</label> */}
                                    <Input type='text' className='form-control' name='username'
                                        value={this.state.username} onChange={this.onChangeUsername}
                                        placeholder='Username'
                                        validations={[required, usernameLength]}
                                    />
                                </div>
                                <div className='form-group'>
                                    {/* <label htmlFor="email">Email</label> */}
                                    <Input type='text' className='form-control' name='email'
                                        value={this.state.email} onChange={this.onChangeEmail}
                                        placeholder='Email'
                                        validations={[required, email]}
                                    />
                                </div>
                                <div className='form-group'>
                                    {/* <label htmlFor="password">Password</label> */}
                                    <Input type='password' className='form-control' name='password'
                                        value={this.state.password} onChange={this.onChangePassword}
                                        placeholder='Password'
                                        validations={[required, passwordLength]}
                                    />
                                </div>

                                <div className="borderbottom"></div>
                                <div className='form-group'>
                                    <button className='btn btn-primary'>REGISTER</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role='alert'>
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                    </Form>
                </div>
            </div>
        )
    }
}