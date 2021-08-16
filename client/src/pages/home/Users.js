import { gql, useQuery } from '@apollo/client';
import { Col, Image } from 'react-bootstrap';
import classNames from 'classnames';

import { useMessageDispatch, useMessageState } from '../../context/message';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find(u => u.selected === true)?.username;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: data => {
      dispatch({ type: 'SET_USERS', payload: data.getUsers });
    },
    onError: err => console.log(err),
  });

  let usersMarkup;

  if (!users || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map(user => {
      const selected = selectedUser === user.username;
      return (
        <div
          role="button"
          className={classNames('user-div d-flex p-3', {
            'bg-white': selected,
          })}
          key={user.username}
          onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
        >
          <Image
            src={user.imageUrl}
            roundedCircle
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
          <div className="mx-3">
            <p className="text-success">{user.username}</p>
            <p className="font-weigth-light">
              {user.latestMessage
                ? user.latestMessage.content
                : 'You are now connected'
              }
            </p>
          </div>
        </div>
      )
    });
  }
  return (
    <Col xs={4} className="pa-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}