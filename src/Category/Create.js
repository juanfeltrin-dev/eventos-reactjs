import React from 'react';
import { Row, Form, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import CancelAndSend from './../Componenets/CancelAndSend';
import setErrors from './../helpers/setErrors';
import handleError from './../helpers/handleError';
import api from "./../helpers/api"
import { useForm } from "react-hook-form";

export default function Create() {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();

    async function onSubmit(formData) {
        try {
            const response  = await api.post("/category", JSON.stringify(formData));
            const data      = response.data;
        } catch (error) {
            handleError(setError, error)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                    <FormGroup controlId="name">
                        <FormLabel>Nome</FormLabel>
                        <FormControl name="name" className={errors.name && "is-invalid"} ref={register} type="text" placeholder="Nome"/>
                        {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <CancelAndSend/>
        </Form>
    );
}