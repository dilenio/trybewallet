export const loginAction = (email) => ({
  type: 'SIGN_IN',
  email,
});

export const addCurrency = (currencies) => ({
  type: 'ADD_CURRENCIES',
  currencies,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const deleteExpense = (expense) => ({
  type: 'DELETE_EXPENSE',
  expense,
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense,
});

export const editMode = (editionMode, expense) => ({
  type: 'EDIT_MODE',
  editMode: editionMode,
  expense,
});

export const fetchCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(addCurrency(data));
};
