import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

export default class TableRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            page: 1,
            pageSize: 3
        };
    }

    RenderTable = (data) => {
        console.log(data);
        return (
            <Table>
                <thead>
                    {data.length > 0 && this.RenderHeaders(Object.keys(data[0]))}
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
                    <Button onClick={() => { history.push(`${match.url}/${singleRow.name}`) }}>details</Button>
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

    NextPage = () => {
        this.setState(prevState => ({
            page: ++prevState.page
        }));
    }

    PreviousPage = () => {
        this.setState(prevState => ({
            page: --prevState.page
        }));
    }


    render() {
        const currentPage = (this.state.page - 1);
        const paginatedResult = this.props.data.slice(currentPage, this.state.pageSize + currentPage);

        return (
            <div>
                {this.RenderTable(paginatedResult)}
                <Button onClick={this.PreviousPage}>previous page</Button>
                <Button onClick={this.NextPage}>next page</Button>
            </div>
        );
    }
}



/*

add pagination (numbered .. uh numbers) (DONE)
add filter


*/