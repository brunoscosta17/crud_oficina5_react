import React, { Component } from 'react'
import Main from '../template/Main'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import './Login.css'
import { Link } from 'react-router-dom'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.goHome = this.goUsers.bind(this)
    }

    // state = {...initialState }

    // clear() {
    //     this.setState({ user: initialState.contact })
    // }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        
    }

    goUsers() {
        this.props.Link('/users')
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange} 
                        />
                </FormGroup>
                
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>

                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-primary"
                        block
                        //bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </button>
                    <Link to="/users">
                        <button className="btn btn-secondary ml-2">
                            Cadastrar Usuário
                        </button>
                    </Link>
                </div>
            </form>
          </div>
        );
    }
}