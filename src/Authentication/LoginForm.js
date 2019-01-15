import React, { Component } from 'react';
import UserFacade from './UserFacade';
import { Button, FormControl, Form, ControlLabel, FormGroup } from 'react-bootstrap';


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { userInput: "user", passwordInput: "test", loggedIn: false }
    }

    HandleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    HandleSubmit = async (e) => {
        e.preventDefault();

        let user =  await UserFacade.authLogin(this.state.userInput, this.state.passwordInput);                
        this.props.SetUser(user);
        this.props.history.push("/user");
    }

    render() {
        return (
            <Form inline>
                <FormGroup controlId="formUsername">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        name="userInput"
                        value={this.state.userInput}
                        onChange={this.HandleChange}
                        placeholder="username"
                    />
                </FormGroup><br />
                <FormGroup controlId="formPassword">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="text"
                        name="passwordInput"
                        value={this.state.passwordInput}
                        onChange={this.HandleChange}
                        placeholder="password"
                    />
                </FormGroup>
                <Button onClick={this.HandleSubmit}>Submit</Button>
            </Form>
        );
    }
}


//{this.state.loggedIn && "username or password incorrect" } 
//setState for loggedIn