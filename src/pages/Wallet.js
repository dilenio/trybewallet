import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div className="container-wallet">
        <Header />
        <Expenses />
        <div>
          navbar
          { email }
        </div>
        <main>
          <div>main</div>
        </main>
        <footer>
          <div>
            footer
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
