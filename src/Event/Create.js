import React, { useState, useEffect } from 'react';
import { FormGroup, Form, FormLabel, FormControl, Row, Col, FormCheck, FormFile, Button } from 'react-bootstrap';
import CancelAndSend from './../Componenets/CancelAndSend'
import { useForm } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';
import handleError from './../helpers/handleError';
import api from "./../helpers/api"
import './css/InputRadioImage.css';

function Create() {
    const [featuredBanner, setFeaturedBanner] = useState(false);
    const [categories, setCategories] = useState(false);
    const [ages, setAges] = useState(false);
    const [states, setStates] = useState(false);
    const [cities, setCities] = useState(false);
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const [editorChange, setEditorChange] = useState('');

    async function onSubmit(formData) {
        try {
            await api.post("/event", JSON.stringify(formData));
        } catch (error) {
            handleError(setError, error);
        }
    }

    useEffect(() => {
        async function getAges() {
            try {
                const response  = await api.get("/age");
                const data      = response.data;
                
                setAges(data);
            } catch (error) {
                alert(error);
            }
        }

        async function getCategories() {
            try {
                const response  = await api.get("/category");
                const data      = response.data;                
                
                setCategories(data);
            } catch (error) {
                alert(error);                
            }
        }

        async function getStates() {
            try {
                const response  = await api.get("/state");
                const data      = response.data;
                
                setStates(data);
            } catch (error) {
                alert(error);    
            }
        }

        getCategories();
        getStates();
        getAges();
    }, [])

    async function getCities(state) {
        try {
            const response  = await api.get("/city/state/" + state);
            const data      = response.data;
    
            setCities(data);
        } catch (error) {
            alert(error);   
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={12} md={4}>
                    <FormGroup controlId="name">
                        <FormLabel>Título</FormLabel>
                        <FormControl name="name" className={errors.name && "is-invalid"} type="text" ref={register} placeholder="Título"/>
                        {errors.name && <p className="invalid-feedback">{errors.name.message}</p>}
                    </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                    <FormGroup controlId="category_id">
                        <FormLabel>Categoria</FormLabel>
                        <FormControl name="category_id" className={errors.category_id && "is-invalid"} ref={register} as="select">
                            <option value="">{states ? 'Selecione a categoria' : '...'}</option>
                            {
                                categories && (
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.category_id && <p className="invalid-feedback">{errors.category_id.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="date">
                        <FormLabel>Data</FormLabel>
                        <FormControl name="date" className={errors.date && "is-invalid"} ref={register} type="datetime-local" placeholder="Data"/>
                        {errors.date && <p className="invalid-feedback">{errors.date.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={4}>
                    <FormGroup controlId="quantity_tickets">
                        <FormLabel>Quantidade de Ingressos</FormLabel>
                        <FormControl name="quantity_tickets" className={errors.quantity_tickets && "is-invalid"} ref={register} type="number" min={0} placeholder="Quantidade de Ingressos"/>
                        {errors.quantity_tickets && <p className="invalid-feedback">{errors.quantity_tickets.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="banner">
                        <FormLabel>Banner</FormLabel>
                        {/* <FormFile name="banner" ref={register} /> */}
                        {/* {errors.banner && <p>{errors.banner.message}</p>} */}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="featured_banner">
                        <FormLabel>Banner Destaque</FormLabel>
                        <FormCheck name="featured_banner" className={errors.featured_banner && "is-invalid"} ref={register} type="checkbox" onChange={(event) => setFeaturedBanner(event.target.checked)} label={ featuredBanner ? 'Sim' : 'Não'} />           
                        {errors.featured_banner && <p className="invalid-feedback">{errors.featured_banner.message}</p>}           
                    </FormGroup>
                </Col>
            </Row>

            <Row>                
                <Col sm={12} md={4}>
                    <FormGroup controlId="state">
                        <FormLabel>Estado</FormLabel>
                        <FormControl name="state" className={errors.state && "is-invalid"} ref={register({required: true})} onChange={(event) => getCities(event.target.value)} as="select">
                            <option value="">{states ? 'Selecione o estado' : '...'}</option>
                            {
                                states && (
                                    states.map(state => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.state && <p className="invalid-feedback">O campo estado é obrigatório.</p>} 
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="city_id">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl name="city_id" className={errors.city_id && "is-invalid"} ref={register} as="select">
                            <option value="">{cities ? 'Selecione a cidade' : 'Selecione um estado'}</option>
                            {
                                cities && (
                                    cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.city_id && <p className="invalid-feedback">{errors.city_id.message}</p>} 
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="place">
                        <FormLabel>Local</FormLabel>
                        <FormControl name="place" className={errors.place && "is-invalid"} ref={register} type="text" placeholder="Local"/>
                        {errors.place && <p className="invalid-feedback">{errors.place.message}</p>} 
                    </FormGroup>
                </Col>
            </Row>

            <Row>                
                <Col sm={12} md={4}>
                    <FormGroup controlId="status">
                        <FormLabel>Status</FormLabel>
                        <FormControl name="status" className={errors.status && "is-invalid"} ref={register} as="select">
                            <option value="">Selecione o status</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </FormControl>
                        {errors.status && <p className="invalid-feedback">{errors.status.message}</p>} 
                    </FormGroup>
                </Col>

                <Col sm={12} md={8}>
                    <FormGroup>
                        {
                            ages ? (
                                ages.map(age => (
                                    <FormLabel htmlFor={"age-"+age.id} key={age.id}>
                                        <input type="radio" className="form-check-input" ref={register} value={age.id} name="age_rating_id" id={"age-"+age.id} />
                                        <img className="mr-2" src={age.image} width={70} height={70} />
                                    </FormLabel>
                                ))
                            ) : "..."
                        }
                        {errors.age_rating_id && <p className="invalid-feedback" style={{display: "block"}}>{errors.age_rating_id.message}</p>} 
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup controlId="description">
                        <FormLabel>Descrição</FormLabel>
                        <textarea ref={register} style={{display: "none"}} value={editorChange} aria-hidden="true" name="description"></textarea>
                        <Editor
                            apiKey="xh1vw1kjs2ivn4zsxvc8e9cwqqbvdefnixzbgnen47v6k47e"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={setEditorChange}
                            onChange={() => clearErrors(["description"])}
                        />
                        {errors.description && <p className="invalid-feedback" style={{display: "block"}}>{errors.description.message}</p>} 
                    </FormGroup>
                </Col>
            </Row>
            <CancelAndSend/>
        </Form>
    );
}

export default Create;