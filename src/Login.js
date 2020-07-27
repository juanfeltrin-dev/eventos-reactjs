import React, { useState } from "react"; 
import { Container, Row, Brand, Card, Form, FormLabel, FormControl, FormGroup, Button, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import api from "./helpers/api"
import { login, isAuthenticated } from "./helpers/auth"
import "./styles/login.css"

export default function Login() {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();

    async function onSubmit(formData) {
        try {
            const response = await api.post("/auth/login", JSON.stringify(formData));

            const data = response.data
            const accessToken = data.access_token
            
            login(accessToken)
        } catch(e) {
            const errorData = e.response.data;

            if (errorData && "error" in errorData) {
                setError("email", {
                    type: "manual"
                });
                
                setError("password", {
                    type: "manual",
                    message: errorData.error
                });
            }
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="form-signin">
            <Card className="p-3">
                <h4 className="h3 mb-3 font-weight-normal">Entrar com suas credenciais</h4>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl name="email" className={errors.email && "is-invalid"} ref={register} type="email" placeholder="Insira seu email"/>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Senha</FormLabel>
                    <FormControl name="password" className={errors.password && "is-invalid"} ref={register} type="password" placeholder="Insira sua senha"/>
                    {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
                </FormGroup>
            </Card>

            <Row className="mt-3">
                <Col>                
                    <Button type="submit" block>Entrar</Button>
                </Col>
            </Row>
            {isAuthenticated() && <Redirect to="/admin/dashboard" />}
        </Form>
    );
}