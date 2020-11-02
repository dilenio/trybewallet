// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO':
    return { ...state, total: action.payload.total };
  case 'ADD_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'ADD_EXPENSE':
    return {
      ...state, expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.expense.expenses }
      ],
      ...state.total, total: action.expense.total,
    };
  default:
    return state;
  }
};

export default wallet;
