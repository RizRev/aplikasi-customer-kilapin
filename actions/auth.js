import * as actionTypes from './actionTypes';

const loginStart = login => {
  return {
    type: actionTypes.LOGIN_START,
    login,
  };
};
const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_ERROR,
    logout,
  }
}


export const authentication = (login,logout, callback) => dispatch => {
  // Dispatch login start action
  dispatch(loginStart());

  // Simulating asynchronous operation (e.g., API call) with a delay
  setTimeout(() => {
    if (login) {
      // Simulating successful login
      let data = {
        success: login,
      };
      dispatch(loginSuccess(data));
      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } else if(logout) {
      // Simulating failed login
      dispatch(loginFailed());
      if (typeof callback === 'function') {
        callback({ success: false });
      }
    }
  }, 500);
};
