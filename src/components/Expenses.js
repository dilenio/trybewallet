import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, addExpense } from '../actions';
import '../css/expenses.css';

class Expenses extends React.Component {
  constructor(props) {
    super(props)

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
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInputs(event) {
    const { target: { name, value } } = event;
    this.setState((state) => ({
      ...state,
      expenses: { ...state.expenses, [name]: value },
    }));
  }

  async handleClick() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
    const { addExpenseRedux, currencies } = this.props;
    const { total, expenses: { value, currency } } = this.state;
    const sum = total + (value * currencies[currency].ask);
    this.setState((state) => ({
      ...state,
      expenses: { ...state.expenses, exchangeRates: { ...currencies } },
      total: sum,
    }), () => addExpenseRedux(this.state));
  }

  render() {
    const { expenses: { value, description } } = this.state;
    const { currencies } = this.props;
    const filterCurrencies = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    return (
      <div className="container-expenses">
        <form>
          <input
            type="number"
            name="value"
            value={value}
            placeholder="Valor"
            data-testid="value-input"
            onChange={this.handleInputs}
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Descrição"
            data-testid="description-input"
            onChange={this.handleInputs}
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={this.handleInputs}
          >
          {filterCurrencies.map((currency) => (
            <option key={currency} data-testid={currency}>
              {currency}
            </option>
          ))};
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={this.handleInputs}
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={this.handleInputs}
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={this.handleClick}
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrency()),
  addExpenseRedux: (data) => dispatch(addExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
