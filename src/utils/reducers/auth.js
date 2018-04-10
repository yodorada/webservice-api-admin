// in reducer/authReducer.js
import { USER_LOGIN_SUCCESS } from 'admin-on-rest';

const defaultState = {
  loginSuccess: false
};

export default (previousState = defaultState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...previousState, loginSuccess: true };
    default:
      return previousState;
  }
};
