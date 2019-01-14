import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

export default class TableRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data          
        };
    }    

    RenderTable = (data) => {
        const keysOfFirstItem = Object.keys(data[0]);
        return (
            <Table>
                <thead>
                    {this.RenderHeaders(keysOfFirstItem)}
                </thead>
                <tbody>
                    {this.RenderBody(data)}
                </tbody>
            </Table>
        )
    }

    RenderHeaders = (keys) => {
        return (
            <tr>
                {keys.map((key, index) => <th key={index}>{key}</th>)}
                <th>Details</th>
            </tr>
        );
    }

    RenderBody = (bodyData) => {
        return (
            <>
                {bodyData.map((singleTr) => {
                    return (this.RenderSingleRow(singleTr));
                })}
            </>
        );
    }

    //NB! singleRow.PRIMARYKEY REMEMBERUUU
    RenderSingleRow = (singleRow) => {
        const values = Object.values(singleRow);
        const history = this.props.history;
        const match = this.props.match;
        return (
            <tr>
                {values.map((val, key) => {
                    return (
                        this.RenderSingleTd(val, key)
                    );
                })}
                <td>
                    <Button onClick={() => { history.push(`${match.url}/${singleRow.id}`) }}>details</Button>
                </td>
            </tr>
        );
    }


    RenderSingleTd = (singleVal, key) => {
        if (Array.isArray(singleVal) && singleVal.length > 1) {
            return <td key={key}>{singleVal[0]}(+{singleVal.length - 1})</td>
        } else {
            return (
                <td key={key}>
                    {singleVal}
                </td>
            );
        }
    }


    render() {
        /*
        if (this.state.data.length > 0) {
            return (
                <div>
                    {this.RenderTable(this.props.testData)}
                </div>
            );
        } else {
            return (<div>hi</div>)
        }*/
        return (
            <div>
                {this.RenderTable(this.props.testData)}
            </div>
        );
    }
}


/*

add pagination (numbered .. uh numbers)
add filter


*/