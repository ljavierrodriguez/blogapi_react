import axios from 'axios';

export default class Auth {
    async signIn(username, password) {
        let headers = {
            "Content-Type": "application/json",
        }
        let data = {
            "username": username,
            "password": password
        }
        return new Promise(resolve => {
            return axios.post('http://localhost:8000/api/v1/login', data, headers)
                .then(response => {
                    localStorage.setItem('user', response);
                }).catch(error => console.log(error));
        }, reject => {

        });
    }
}