import { Fragment, useEffect } from 'react'
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { gql, useSubscription } from '@apollo/client';

import { useAuthDispatch, useAuthState } from '../../context/auth';
import { useMessageDispatch } from '../../context/message';

import Users from './Users';
import Messages from './Messages';

const NEW_MESSAGE = gql`
  subscription newMessage {
    uuid
    from
    to
    content
    createdAt
  }
`;

export default function Home({ history }) {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);

  useEffect(() => {
    if (messageError) {
      console.log(messageError);
      return;
    }

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser = user.username === message.to ? message.from : message.to;
      console.log(otherUser);
      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData]);

  const logout = () => {
    authDispatch({ type: 'LOGOUT' });
    // history.push('/login'); cache token from localstorage if use this way
    window.location.href = '/login';
  };

  return(
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
}