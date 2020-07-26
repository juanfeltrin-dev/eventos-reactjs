import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './Evento/Create';
import Navbar from 'react-bootstrap/Navbar';
import Brand from 'react-bootstrap/NavbarBrand';
import { FaBars, FaUsers } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { MdEvent, MdDashboard } from "react-icons/md";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './styles/style.css';
import { Collapse } from 'react-bootstrap';

export default function App() {
  const [sideBar, setSideBar] = useState(true);
  const [eventCollapse, setEventCollapse] = useState(false);
  const [userCollapse, setUserCollapse] = useState(false);
  const [configCollapse, setConfigCollapse] = useState(false);

  return(
    <div className="wrapper">
      <div id="sidebar" className={sideBar ? '' : 'active'}>
        <Row>
          <Col className="mt-5">
              <h2 className="text-center">Sistema de Eventos</h2>
          </Col>
        </Row>
        <ul className="list-unstyled components">
          <li>
            <a href="#"><MdDashboard/> Dashboard</a>
          </li>
          <li>
            <a aria-controls="event" onClick={() => setEventCollapse(!eventCollapse)} data-toggle="collapse" aria-expanded={eventCollapse} className="dropdown-toggle cursor-pointer"><MdEvent/> Evento</a>
            <Collapse in={eventCollapse}>
              <ul className="list-unstyled" id="event">
                  <li>
                      <a href="#">Eventos</a>
                  </li>
                  <li>
                      <a href="#">Categorias</a>
                  </li>
                  <li>
                      <a href="#">Pedidos</a>
                  </li>
                  <li>
                      <a href="#">Ingressos</a>
                  </li>
                  <li>
                      <a href="#">Cupons</a>
                  </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a aria-controls="user" onClick={() => setUserCollapse(!userCollapse)} data-toggle="collapse" aria-expanded={userCollapse} className="dropdown-toggle cursor-pointer"><FaUsers/> Usuário</a>
            <Collapse in={userCollapse}>
              <ul className="list-unstyled" id="user">
                  <li>
                      <a href="#">Usuários</a>
                  </li>
                  <li>
                      <a href="#">Administradores</a>
                  </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a aria-controls="config" onClick={() => setConfigCollapse(!configCollapse)} data-toggle="collapse" aria-expanded={configCollapse} className="dropdown-toggle cursor-pointer"><BsFillGearFill/> Configuração</a>
            <Collapse in={configCollapse}>
              <ul className="list-unstyled" id="config">
                  <li>
                      <a href="#">Redes Sociais</a>
                  </li>
                  <li>
                      <a href="#">Classificação Etária</a>
                  </li>
                  <li>
                      <a href="#">Formas de Pagamemento</a>
                  </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </div>
      <div id="content" className={sideBar ? '' : 'active'}>
        <Navbar bg="dark" variant="dark">
          <Brand>
            <FaBars onClick={() => setSideBar(!sideBar)} className="cursor-pointer ml-3" />
          </Brand>
        </Navbar>
        <Container className="my-4">
          <Row>
            <Col>
              <Card className="p-4">
                <Create/>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
