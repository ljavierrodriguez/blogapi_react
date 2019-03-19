import React, {Component} from 'react';
import axios from 'axios';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + this.props.user.token
        }
        axios.get('http://localhost:8000/api/v1/posts', headers)
            .then(response => {
                console.log(response.data.results)
                this.setState({
                    posts: response.data.results
                })
            }).catch(error => {
            console.log(error)
        });
    }

    render() {
        const posts = this.state.posts.map((p) => {
            return (
                <tr key={p.id}>
                    <td>{ p.id }</td>
                    <td>{ p.title }</td>
                </tr>
            )
        });
        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Post Title</th>
                </tr>
                </thead>
                <tbody>
                { posts }
                </tbody>
            </table>
        )
    }
}