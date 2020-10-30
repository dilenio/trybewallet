// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
  case 'SIGN_IN':
    return {...state, email: action.email};
  default:
    return state;
  }
};

export default user;
