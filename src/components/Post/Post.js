import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import toastr from "toastr";

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

    deletePosts(id) {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + this.props.user.token
        }
        axios.delete('http://localhost:8000/api/v1/posts/' + id + '/', {headers: headers})
            .then(response => {
                toastr.info('Post Eliminado con exito', 'Post Delete',
                    {
                        closeButton: true,
                        debug: false,
                        newestOnTop: false,
                        progressBar: true,
                        positionClass: "toast-top-center",
                        preventDuplicates: false,
                        onclick: null,
                        showDuration: "300",
                        hideDuration: "1000",
                        timeOut: "5000",
                        extendedTimeOut: "1000",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut"
                    });
                this.getPosts()
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
                    <td><Link to={"/posts/"+p.id+"/edit"} className="btn btn-info btn-sm">Edit</Link></td>
                    <td><Button variant="danger" className="btn-sm" onClick={this.deletePosts.bind(this, p.id)}>Delete</Button></td>
                </tr>
            )
        });
        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Post Title</th>
                    <th colSpan={2} width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>
                { posts }
                </tbody>
            </table>
        )
    }
}