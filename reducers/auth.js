import * as actionTypes from '@actions/actionTypes';

const initialState = {
  login: {
    success: false,
    loggedIn: false,
    userId: null,
  },
  logout: {
    success: false,
    loggedIn: false,
    userId: null,
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          success: true,
          loggedIn: true,
          userId: action.data,
        },
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          success: false,
          loggedIn: false,
          userId: null,
        },
        // logout: {
        //   ...state.logout,
        //   success: false,
        //   loggedIn: false,
        //   userId: null,
        // },
  };
    // case actionTypes.CLEAR_AUTH:
    //   return {
    //     ...state.login,
    //     success: false,
    //     loggedIn: false,
    //     userId: null,
    //   }  
    default:
      return state;
  }
};
