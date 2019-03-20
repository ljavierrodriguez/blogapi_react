import React, {Component} from 'react';
import axios from "axios";
import toastr from 'toastr';
import {Button, Form} from "react-bootstrap";

export default class PostEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                title: '',
                subtitle: '',
                slug: '',
                content: ''
            },
            id: 0,
            title: '',
            subtitle: '',
            slug: '',
            content: '',
            created_by: 0
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            id: id
        })
        this.getPost(id);
    }

    handleSubmit = event => {
        event.preventDefault();
        let data = {
            "id": this.state.id,
            "title": event.target.title.value,
            "subtitle": event.target.subtitle.value,
            "slug": event.target.slug.value,
            "content": event.target.content.value,
            "created_by": this.props.user.id
        }
        this.putPost(data);

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    getPost(id) {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + this.props.user.token
        }

        console.log(this.props.user.token)
        axios.get('http://localhost:8000/api/v1/posts/' + id, {headers: headers})
            .then(response => {
                console.log(response.data)
                this.setState({
                    post: response.data,
                    id: response.data.id,
                    title: response.data.title,
                    subtitle: response.data.subtitle,
                    slug: response.data.slug,
                    content: response.data.content
                })
            }).catch(error => {
            console.log(error)
        });
    }

    putPost(data) {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + this.props.user.token
        }

        axios.put('http://localhost:8000/api/v1/posts/' + this.state.id + '/',
            data,
            {headers: headers}
        ).then(response => {
            console.log(response.data)
            this.setState({
                post: response.data
            })
            toastr.success('Post Editado con exito', 'Post Edit',
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
        }).catch(error => {
            console.log(error)
        });
    }

    validateForm() {
        return this.state.title.length > 0 || this.state.post.title.length > 0;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3>Edit Post</h3>
                <Form.Group controlId="title">
                    <Form.Label>title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title"
                                  value={this.state.title}
                                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control type="text" placeholder="Enter subtitle"
                                  value={this.state.subtitle} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text" placeholder="Enter slug"
                                  value={this.state.slug} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control type="" placeholder="Enter Content" as="textarea" rows="3"
                                  value={this.state.content} onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit"
                        disabled={!this.validateForm()}>
                    Save
                </Button>
            </Form>
        )
    }
}