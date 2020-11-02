import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <Link to="/">
          <img src={ logo } alt="Wallet logo" className="logo-wallet" />
        </Link>
        <div>
          <div data-testid="email-field">
            { email }
          </div>
          <div>
            <span>Total: </span>
            <span data-testid="total-field" value="0">{ total }</span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
