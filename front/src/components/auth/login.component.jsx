import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { Switch, Route, Link } from "react-router-dom";
import './login.component.scss'

import AuthService from '../../services/auth.service'

const required = value => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required
            </div>
        )
    }
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            password: '',
            loading: false,
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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: '',
            loading: true
        })

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password)
                .then(() => {
                    this.props.history.push('/profile')
                    window.location.reload();
                }, error => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) || error.message || error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    })
                })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='login'>
                <div className='card'>
                    <h3 className="title">SIGN IN</h3>
                    <div className="borderbottom"></div>

                    <Form onSubmit={this.handleLogin} ref={c => { this.form = c }}>
                        <div className='form-group'>
                            {/* <label htmlFor="username">Username</label> */}
                            <Input type='text' className='form-control' name='username'
                                value={this.state.username} onChange={this.onChangeUsername}
                                placeholder='Username'
                                validations={[required]}
                           
                                />
                        </div>

                        <div className='form-group'>
                            {/* <label htmlFor="password">Password</label> */}
                            <Input type='password' className='form-control' name='password'
                                value={this.state.password} onChange={this.onChangePassword}
                                placeholder='Password'
                                validations={[required]} 
                             
                                />
                        </div>
                        
                        <div className="borderbottom"></div>
                        <div className='form-group'>
                            <button className="btn btn-primary" disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className='spinner-border spinner-border-sm'></span>
                                )}
                                LOGIN
                            </button>
                        </div>

                        <div className="register-link">
                            Do not have an account? <Link to={'/register'} target='_blank' className='link'>Registration</Link>
                        </div>

                        {this.state.message && (
                            <div className='form-group'>
                                <div className="alert alert-danger" role='alert'>
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