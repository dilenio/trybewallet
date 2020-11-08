import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, editMode, editExpense } from '../actions';

class Expenses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      total: 0,
      edit: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.clearState = this.clearState.bind(this);
    this.getDataToEdit = this.getDataToEdit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies, editModeProps } = this.props;
    !editModeProps && fetchCurrencies();
  }

  getDataToEdit(expenseToEdit) {
    const { editModeExpenseDispatch } = this.props;
    if (expenseToEdit && Object.keys(expenseToEdit).length > 0) {
      this.setState({
        expenses: expenseToEdit,
        edit: true,
      });
      editModeExpenseDispatch(false, {});
    }
  }

  handleInputs(event) {
    const { target: { name, value } } = event;
    this.setState((state) => ({
      ...state,
      expenses: { ...state.expenses, [name]: value },
    }));
  }

  clearState() {
    this.setState({
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      edit: false,
    });
  }

  async handleClick() {
    const { fetchCurrencies, editExpenseRedux } = this.props;
    const { edit, total, expenses: { value, currency } } = this.state;
    if (edit) {
      editExpenseRedux(this.state);
    } else {
      await fetchCurrencies();
      const { addExpenseRedux, currencies } = this.props;
      const sum = total + (value * currencies[currency].ask);
      this.setState((state) => ({
        ...state,
        expenses: { ...state.expenses, exchangeRates: { ...currencies } },
        total: Number(sum.toFixed(2)),
      }), () => addExpenseRedux(this.state));
    }
    this.clearState();
  }

  render() {
    const { expenses: { value, description, currency, method, tag }, edit } = this.state;
    const { currencies, expenseToEdit } = this.props;
    const { getDataToEdit } = this;
    const filterCurrencies = Object.keys(currencies)
      .filter((currElement) => currElement !== 'USDT');
    // (expenseToEdit && Object.keys(expenseToEdit).length > 0) && getDataToEdit(expenseToEdit);
    getDataToEdit(expenseToEdit);
    return (
      <div className={ edit ? 'container-edit' : 'container-expenses' }>
        <form>
          <input
            type="number"
            name="value"
            value={ value }
            placeholder="Valor"
            data-testid="value-input"
            className="expense-input"
            onChange={ this.handleInputs }
          />
          <input
            type="text"
            name="description"
            value={ description }
            placeholder="Descrição"
            data-testid="description-input"
            className="expense-input"
            onChange={ this.handleInputs }
          />
          <select
            name="currency"
            data-testid="currency-input"
            className="expense-input"
            value={ currency }
            onChange={ this.handleInputs }
          >
            { filterCurrencies.map((curr) => (
              <option key={ curr } data-testid={ curr } value={ curr }>
                { curr }
              </option>
            )) }
          </select>
          <select
            name="method"
            data-testid="method-input"
            className="expense-input"
            value={ method }
            onChange={ this.handleInputs }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            className="expense-input"
            value={ tag }
            onChange={ this.handleInputs }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            className="btn-expense"
            onClick={ this.handleClick }
          >
            { edit ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editModeProps: state.wallet.editMode,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  addExpenseRedux: (data) => dispatch(addExpense(data)),
  editExpenseRedux: (data) => dispatch(editExpense(data)),
  editModeExpenseDispatch: (edit, expense) => dispatch(editMode(edit, expense)),
});

Expenses.propTypes = {
  currencies: PropTypes.shape().isRequired,
  editModeProps: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.shape().isRequired,
  addExpenseRedux: PropTypes.func.isRequired,
  editExpenseRedux: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  editModeExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
