import { Fragment } from 'react'
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuthDispatch } from '../../context/auth';

import Users from './Users';
import Messages from './Messages';

export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  };

  return(
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Col>
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
        </Col>
        <Col>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
}