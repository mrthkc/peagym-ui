import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: {
                email: "",
                fullname: "",
                permission: {
                    type: ""
                },
            },
        };
    }

    componentDidMount() {
        const { uid } = this.props.match.params
        UserService.getUser(uid).then(
            response => {
                this.setState(prevState => ({
                    content: {
                        ...prevState.content,
                        email: response.data.data.email
                    }
                }));
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
                this.props.history.push("/login");
                window.location.reload();
            }
        );
    }

    render() {
        return (
        <div className="container">
            <header className="jumbotron">
            <h3>{this.state.content.email}</h3>
            </header>
        </div>
        );
    }
}