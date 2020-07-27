import React, { useState, useEffect } from 'react';
import { Row, Form, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import CancelAndSend from './../Componenets/CancelAndSend';
import setErrors from './../helpers/setErrors';
import api from "./../helpers/api"
import { useForm } from "react-hook-form";

export default function Create() {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const [events, setEvents] = useState(false);

    async function onSubmit(formData) {
        const response  = await api.post("/coupon", JSON.stringify(formData));
        const data      = response.data;

        setErrors(setError, data.errors);
    }
    
    useEffect(() => {
        async function getEvents() {
            const response  = await api.get("event");
            const data      = response.data;
    
            setEvents(data);
        }

        getEvents();
    }, []);


    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={12} md={3}>
                    <FormGroup controlId="name">
                        <FormLabel>Código</FormLabel>
                        <FormControl name="name" ref={register} type="text" placeholder="Código"/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                    <FormGroup controlId="event_id">
                        <FormLabel>Evento</FormLabel>
                        <FormControl name="event_id" ref={register} as="select" placeholder="Evento">
                            <option value="">{events ? 'Selecione o evento' : '...'}</option>
                            {
                                events && (
                                    events.map(event => (
                                        <option key={event.id} value={event.id}>{event.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.event_id && <p>{errors.event_id.message}</p>}
                    </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                    <FormGroup controlId="start_date">
                        <FormLabel>Data Inicial</FormLabel>
                        <FormControl name="start_date" ref={register} type="datetime-local" placeholder="Data Inicial"/>
                        {errors.start_date && <p>{errors.start_date.message}</p>}
                    </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                    <FormGroup controlId="end_date">
                        <FormLabel>Data Final</FormLabel>
                        <FormControl name="end_date" ref={register} type="datetime-local" placeholder="Data Final"/>
                        {errors.end_date && <p>{errors.end_date.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <CancelAndSend/>
        </Form>
    )
}