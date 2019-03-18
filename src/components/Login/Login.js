import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from "axios";

export default class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            user: {}
        }
    }

    validateForm(){
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        try {
            this.signIn(this.state.username, this.state.password);
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            })

            console.log(this.state.user)
        }catch (e) {
            console.log(e)
        }

    }

    async signIn(username, password) {
        let headers = {
            "Content-Type": "application/json",
        }
        let data = {
            "username": username,
            "password": password
        }
        return new Promise(resolve => {
            return axios.post('http://localhost:8000/api/v1/login', data, headers)
                .then(response => {
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }).catch(error => console.log(error));
        }, reject => {

        });
    }

    render(){
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                                  value={this.state.username}
                        onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={this.state.password} onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit"
                    disabled={!this.validateForm()}>
                    Submit
                </Button>
            </Form>
        )
    }
}