import makeOptions from './Fetch';

const URL = "http://localhost:8081/api/webdata/swapi/2/planets"; //remember http
const URI = "";

class DataFacade {
    constructor() {
        this._data = []
    }

    get data() {
        return this._data;
    }

    setData = (data) => {
        this._data = data;
    }    

    //use await on each crud on the component that uses these
    //recommended: ComponenDidMount();
    getData = async () => {
        await fetch(URL)
            .then((header) => header.json())
            .then(body => { this._data = body });
    }

    addData = (body) => {
        return fetch(URL, makeOptions("POST", body));
    }

    editData = (body) => {
        return fetch(URL + URI, makeOptions("PUT", body));
    }

    deleteData = () => {
        return fetch(URL + URI, makeOptions("DELETE"));
    }
}




export default new DataFacade();