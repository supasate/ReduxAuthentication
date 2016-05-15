import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3090';

const signinUser = ({ email, password }) => {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {

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
