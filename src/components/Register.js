import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import AuthService from "../services/auth.service";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
            fullname: "",
            email: "",
            password: "",
            success: false,
            message: null
        };
    }

    onChangeFullname(e) {
        this.setState({
            fullname: e.target.value
        });
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();
    
        this.setState({
            message: "",
            success: false
        });

        AuthService.register(
            this.state.fullname,
            this.state.email,
            this.state.password
        ).then(
            () => {
                this.setState({
                    message: "Successfully registered. Redirecting login page",
                    success: true,
                });
                setTimeout(() => { 
                    this.props.history.push('/login');
                    window.location.reload();
                }, 1000);
            }
        ).catch(
            () => {
                this.setState({
                    message: "Failed",
                    success: false,
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
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <Form.Group controlId="formBasicFullname">
                                <Form.Label>Fullname</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Fullname"
                                    name="fullname"
                                    value={this.state.fullname}
                                    onChange={this.onChangeFullname}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
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
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    {this.state.message && 
                        <Alert variant={this.state.success ? "success" : "warning"}>
                            {this.state.message}
                        </Alert>
                    }
                </Row>
            </Container>
        );
    }
}