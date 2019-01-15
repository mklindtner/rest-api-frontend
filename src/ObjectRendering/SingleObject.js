import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

export default class SingleObject extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            object: {},
            flipTable: true
        });
    }

    //unable to call this, why?
    ComponentDidMount() {
    }

    findObject = () => {
        this.props.data.forEach((obj) => {
            if (obj.name == this.props.match.params.objectId && !Object.keys(this.state.object).length) //checks param and if object is empty
                this.setState({ object: obj })
        });
    }

    RenderTable = (data) => {
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
                {values.map(value => {
                    return <td>{value}</td>
                })}
            </tr>
        );
    }

    RenderTableSideWays = () => {
        let keys = Object.keys(this.state.object);
        return (
            <Table>
                <tbody>
                    {keys.map((key, index) => {
                        let value = this.state.object[key];
                        return (
                            <tr key={index}>
                                <th>{key}</th>
                                <td>{value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    RenderHeaderSideWays = (key) => {
        return <th>{key}</th>
    }

    RenderBodySideWays = (value) => {
        return <td>{value}</td>;
    }

    ChooseTable = () => {
        return !this.state.flipTable ? <div>{this.RenderTable()}</div> : <div>{this.RenderTableSideWays()}</div>
    }

    ChangeTable = () => {
        this.setState( prevState => ({
            flipTable: !prevState.flipTable
        }));     
    }

    render() {
        this.findObject(); //this should be placed elsewhere
        if (!this.state.object)
            return (<div>object Not Found</div>);
        return (
            <div>
                {this.ChooseTable()}
                <Button onClick={(e) => this.ChangeTable()}>flipTable</Button> 
            </div>
        );
    }
}