import React, { useState, useEffect } from 'react';
import { FormGroup, Form, FormLabel, FormControl, Row, Col, FormCheck, FormFile, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';
import Api from './Service/Api'
import './css/InputRadioImage.css'

function Create() {
    const [featuredBanner, setFeaturedBanner] = useState(false);
    const [categories, setCategories] = useState(false);
    const [ages, setAges] = useState(false);
    const [states, setStates] = useState(false);
    const [cities, setCities] = useState(false);
    const { register, handleSubmit, watch, errors, setError, clearErrors } = useForm();
    const [editorChange, setEditorChange] = useState('');
    const api = new Api();

    // const onSubmit = formData => {
    //     fetch('http://127.0.0.1:8000/api/event', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(function(res) {
    //         console.log(res.json())
    //     })
    //     .catch(e => console.log)
    // };

    async function onSubmit(formData) {
        const response = await fetch('http://127.0.0.1:8000/api/event', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        for(var error in data.errors) {
            const errorArray = data.errors[error];

            errorArray.map(e => {
                setError(error, {
                    type: "manual",
                    message: e
                })
                console.log(error, e)
            })
        }
    }

    useEffect(() => {
        async function getAges() {
            const res = await fetch('http://127.0.0.1:8000/api/age');
            const data = await res.json();
    
            setAges(data);
        }

        async function getCategories() {
            const res = await fetch('http://127.0.0.1:8000/api/category');
            const data = await res.json();

            setCategories(data);
        }

        async function getStates() {
            const res = await fetch('http://127.0.0.1:8000/api/state');
            const data = await res.json();
    
            setStates(data);
        }

        getCategories();
        getStates();
        getAges();
    }, [])

    async function getCities(state) {
        const res = await fetch('http://127.0.0.1:8000/api/city/state/' + state);
        const data = await res.json();

        setCities(data);
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={12} md={4}>
                    <FormGroup controlId="name">
                        <FormLabel>Título</FormLabel>
                        <FormControl name="name" type="text" ref={register} placeholder="Título"/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                    <FormGroup controlId="category_id">
                        <FormLabel>Categoria</FormLabel>
                        <FormControl name="category_id" ref={register} as="select">
                            <option value="">{states ? 'Selecione a categoria' : '...'}</option>
                            {
                                categories && (
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.category_id && <p>{errors.category_id.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="date">
                        <FormLabel>Data</FormLabel>
                        <FormControl name="date" ref={register} type="datetime-local" placeholder="Data"/>
                        {errors.date && <p>{errors.date.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={4}>
                    <FormGroup controlId="quantity_tickets">
                        <FormLabel>Quantidade de Ingressos</FormLabel>
                        <FormControl name="quantity_tickets" ref={register} type="number" min={0} placeholder="Quantidade de Ingressos"/>
                        {errors.quantity_tickets && <p>{errors.quantity_tickets.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="banner">
                        <FormLabel>Banner</FormLabel>
                        {/* <FormFile name="banner" ref={register} /> */}
                        {errors.banner && <p>{errors.banner.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="featured_banner">
                        <FormLabel>Banner Destaque</FormLabel>
                        <FormCheck name="featured_banner" ref={register} type="checkbox" onChange={(event) => setFeaturedBanner(event.target.checked)} label={ featuredBanner ? 'Sim' : 'Não'} />           
                        {errors.featured_banner && <p>{errors.featured_banner.message}</p>}             
                    </FormGroup>
                </Col>
            </Row>

            <Row>                
                <Col sm={12} md={4}>
                    <FormGroup controlId="state">
                        <FormLabel>Estado</FormLabel>
                        <FormControl name="state" ref={register({required: true})} onChange={(event) => getCities(event.target.value)} as="select">
                            <option value="">{states ? 'Selecione o estado' : '...'}</option>
                            {
                                states && (
                                    states.map(state => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.state && "O campo estado é obrigatório."}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="city_id">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl name="city_id" ref={register} as="select">
                            <option value="">{cities ? 'Selecione a cidade' : 'Selecione um estado'}</option>
                            {
                                cities && (
                                    cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))
                                )
                            }
                        </FormControl>
                        {errors.city_id && <p>{errors.city_id.message}</p>}
                    </FormGroup>
                </Col>
                
                <Col sm={12} md={4}>
                    <FormGroup controlId="place">
                        <FormLabel>Local</FormLabel>
                        <FormControl name="place" ref={register} type="text" placeholder="Local"/>
                        {errors.place && <p>{errors.place.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <Row>                
                <Col sm={12} md={4}>
                    <FormGroup controlId="status">
                        <FormLabel>Status</FormLabel>
                        <FormControl name="status" ref={register} as="select">
                            <option value="">Selecione o status</option>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </FormControl>
                        {errors.status && <p>{errors.status.message}</p>}
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
                        {errors.age_rating_id && <p>{errors.age_rating_id.message}</p>}
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
                        {errors.description && <p>{errors.description.message}</p>}
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-end">
                    <Button variant="success" type="submit">Cadastrar</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default Create;