import React, { useState } from "react";
import CreateEvent from "./Event/Create";
import CreateCoupon from "./Coupon/Create";
import CreateCategory from "./Category/Create";
import Dashboard from "./Dashboard/Dashboard";
import { Navbar, NavbarBrand as Brand, Container, Row, Col, Card, Collapse } from "react-bootstrap";
import { FaBars, FaUsers } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdEvent, MdDashboard } from "react-icons/md";
import { isAuthenticated, lougout } from "./helpers/auth"
import "./styles/style.css";
import { Route, Link, useRouteMatch, Redirect } from "react-router-dom"

export default function App() {
  const [sideBar, setSideBar] = useState(true);
  const [eventCollapse, setEventCollapse] = useState(false);
  const [userCollapse, setUserCollapse] = useState(false);
  const [configCollapse, setConfigCollapse] = useState(false);
  let { path, url } = useRouteMatch();

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
                <Link to={`${url}/dashboard`}><MdDashboard/> Dashboard</Link>
              </li>
              <li>
                <a aria-controls="event" onClick={() => setEventCollapse(!eventCollapse)} data-toggle="collapse" aria-expanded={eventCollapse} className="dropdown-toggle cursor-pointer"><MdEvent/> Evento</a>
                <Collapse in={eventCollapse}>
                  <ul className="list-unstyled" id="event">
                      <li>
                          <Link to={`${url}/event`}>Eventos</Link>
                      </li>
                      <li>
                          <Link to={`${url}/category`}>Categorias</Link>
                      </li>
                      <li>
                          <a href="#">Pedidos</a>
                      </li>
                      <li>
                          <a href="#">Ingressos</a>
                      </li>
                      <li>
                          <Link to={`${url}/coupon`}>Cupons</Link>
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

              <li>
                <a onClick={() => lougout()} className="cursor-pointer"><RiLogoutBoxRLine /> Sair</a>
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
                    <Route path="/admin/dashboard" component={Dashboard}/>
                    <Route path="/admin/event" component={CreateEvent}/>
                    <Route path="/admin/category" component={CreateCategory}/>
                    <Route path="/admin/coupon" component={CreateCoupon}/>
                </Card>
              </Col>
            </Row>
          </Container>
          { !isAuthenticated() && <Redirect to="/admin/login" /> }
        </div>
      </div>
  );
}