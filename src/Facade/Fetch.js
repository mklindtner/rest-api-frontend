export default function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

export function authToken(method, token) {
    let opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "x-access-token": token
        }
    }
    return opts;
}