const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  total: 0,
  editMode: false,
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO':
    return { ...state, total: action.payload.total };
  case 'ADD_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.expense.expenses,
        },
      ],
      ...state.total,
      total: action.expense.total,
    };
  case 'DELETE_EXPENSE': {
    const filterExpenses = state.expenses.filter(
      (expense) => expense.id !== action.expense.id,
    );
    const total = filterExpenses.reduce(
      (acc, curr) => acc + (curr.value * curr.exchangeRates[curr.currency].ask), 0,
    );
    return {
      ...state,
      expenses: [...filterExpenses],
      total,
    };
  }
  case 'EDIT_EXPENSE': {
    const expensesEdited = [...state.expenses];
    expensesEdited.splice(action.expense.expenses.id, 1, action.expense.expenses);
    const total = expensesEdited.reduce(
      (acc, curr) => acc + (curr.value * curr.exchangeRates[curr.currency].ask), 0,
    );
    return {
      ...state,
      expenses: [...expensesEdited],
      total,
      editMode: false,
      expenseToEdit: {},
    };
  }
  case 'EDIT_MODE': {
    return {
      ...state,
      editMode: action.editMode,
      expenseToEdit: action.expense,
    };
  }
  default:
    return state;
  }
};

export default wallet;
