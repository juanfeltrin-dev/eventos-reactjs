import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default function CancelAndSend() {
    return(
        <Row>
            <Col className="d-flex justify-content-between">
                <Button variant="danger">Cancelar</Button>
                <Button variant="success" type="submit">Cadastrar</Button>
            </Col>
        </Row>
    );
}