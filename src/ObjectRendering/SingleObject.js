import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class SingleObject extends Component {
    constructor(props) {
        super(props);
        this.state = ({ data: this.props.testData, object: {} });
    }

    //unable to call this, why?
    ComponentDidMount() {
    }

    findObject = () => {
        this.state.data.forEach((obj) => {            
            if (obj.id == this.props.match.params.objectId && !Object.keys(this.state.object).length) //checks param and if object is empty
                this.setState({ object: obj })
        });
    }

    RenderTable = (data) => {
        //find singleObject
        //const keys = Object.keys(data);
        let keys = Object.keys(this.state.object);
        return (
            <Table>
                <thead>
                    {this.RenderHeader(keys)}
                </thead>
                <tbody>
                    {this.RenderBody(this.state.object)}
                </tbody>
            </Table>
        );
    }

    RenderHeader = (keys) => {
        return (
            <tr>
                {keys.map(key => <th>{key}</th>)}
            </tr>
        );
    }

    RenderBody = (foundObject) => {
        const values = Object.values(foundObject);

        return (
            <tr>
                {values.map( value => {
                    return <td>{value}</td>
                })}
            </tr>
        );
    }

    render() {
        this.findObject();

        return (
            <div>{this.RenderTable(this.state.data)}</div>
        );
    }
}