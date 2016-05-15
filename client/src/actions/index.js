import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

const signinUser = ({ email, password }) => {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // Save the JWT Token
        localStorage.setItem('token', response.data.token);

        // redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {

      })
  };
};

export {
  signinUser,
}
