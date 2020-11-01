import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

class Header extends React.Component {
  render () {
    console.log(this.props)
    const { email } = this.props;
    const { total } = this.props.wallet;
    return (
      <header>
        <img src={ logo } alt="Wallet logo" className="logo-wallet" />
        <div>
          <div data-testid="email-field">
            { email }
          </div>
          <div>
            <p>
              Total:{ ' ' }
              <span data-testid="total-field">{ (total) ? total : 0 }</span>
              <span data-testid="header-currency-field"> BRL</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number,
};

export default connect(mapStateToProps)(Header);
