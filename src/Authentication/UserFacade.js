import makeOptions, { authToken } from '../Facade/Fetch';
const URL_auth = "http://localhost:8081/api/login";
const URL_loggedIn = "http://localhost:8081/api/info/user";

class UserFacade {


    async authLogin(user, pass) {
        let loginObject = { username: user, password: pass }
        let loggedObject = await fetch(URL_auth, makeOptions("POST", loginObject))
            .then(header => header.json());
        let userInfo = await fetch(URL_loggedIn, authToken("GET", loggedObject.token))
            .then(header => header.json())

        //console.log(userInfo);
        return userInfo;
    }
}

//loggedObject["username"] = body.username;
//loggedObject["token"] = body.token;

export default new UserFacade();