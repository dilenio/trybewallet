// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
};

export default user;
