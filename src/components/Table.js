import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaRegEdit, FaEraser } from 'react-icons/fa';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  renderExpense(expense) {
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const { deleteExpenseDispatch } = this.props;
    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ parseFloat(exchangeRates[currency].ask * value).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            className="btn-table btn-edit"
          >
            <FaRegEdit />
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            className="btn-table btn-eraser"
            onClick={ () => deleteExpenseDispatch(expense) }
          >
            <FaEraser />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="container-table">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => this.renderExpense(expense)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (expense) => dispatch(deleteExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf().isRequired,
  deleteExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
