import axios from 'axios';

class Auth {

    constructor() {
        this.signIn.bind(this)
    }

    signIn(username, password) {
        return new Promise(resolve => {
            let headers = {
                "Content-Type": "application/json",
            }
            let data = {
                "username": username,
                "password": password
            }
            axios.post('http://localhost:8000/api/v1/login', data, headers)
                .then(response => {
                    console.log(response.json());
                    localStorage.setItem('user', JSON.stringify(response.data));
                }).catch(error => console.log(error));

            return resolve;
        });
    }
}

export default Auth;