import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getToken().then(
            response => {
                this.setState({
                    content: response.data.data
                });
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
            <h3>{this.state.content}</h3>
            </header>
        </div>
        );
    }
}