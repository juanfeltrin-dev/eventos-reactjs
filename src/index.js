import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

export default function Index() {
  return(
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() =>(
            <>
              <Link to="/admin/login">Entrar no administrativo</Link>
            </>
          )} />
          <Route exact path="/admin/login" component={Login} />
          <Route path="/admin" component={App} />
        </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Index/>, document.getElementById('root'));
