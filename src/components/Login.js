import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import AuthService from "../services/auth.service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleLogin(e) {
        e.preventDefault();
    
        this.setState({
            message: "",
            loading: true,
        });
    
        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
    
                this.setState({
                    loading: false,
                    message: resMessage,
                });
            }
        );
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    required
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={this.state.loading}
                            >
                                Login
                            </Button>
                        </Form>
                        
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    {this.state.message && 
                        <Alert variant={this.state.successful ? "success" : "warning"}>
                            {this.state.message}
                        </Alert>
                    }
                </Row>
            </Container>
        );
    }
}