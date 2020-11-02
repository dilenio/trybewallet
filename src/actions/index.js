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

export const fetchCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(addCurrency(data));
};
