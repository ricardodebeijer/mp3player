let _authToken = '';
const _host = 'http://localhost:8000/api';

class Api {

    static headers() {
        return {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + _authToken,
        }
    }

    static setAuthToken(authToken) {
        _authToken = authToken
    }

    static getAuthToken() {
        return _authToken
    }

    static get(route) {
        return this.xhr(route, null, 'GET');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT')
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST')
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE')
    }

    static xhr(route, params, verb) {
        const url = `${_host}${route}`;
        let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
        options.headers = Api.headers();
        return fetch(url, options).then(resp => {
            let json = resp.json();
            if (resp.ok) {
                return json;
            } else {
                console.warn(resp.status, {response: resp});
                throw resp;
            }
        });
    }
}

export default Api
