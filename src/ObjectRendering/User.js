import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                {this.props.user}
            </div>
        );
    }
}