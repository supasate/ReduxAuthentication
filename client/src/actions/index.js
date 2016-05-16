import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

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
        dispatch(authError('Bad Login Info'));
      })
  };
};

const signoutUser = () => {
  // Remove the JWT Toekn
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
};

const signupUser = ({ email, password }) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
};

const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

const fetchMessage = () => {
  return function(dispatch) {
    const requestOptions = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };
    axios.get(ROOT_URL, requestOptions)
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
};

export {
  signinUser,
  signoutUser,
  signupUser,
  authError,
  fetchMessage
}
