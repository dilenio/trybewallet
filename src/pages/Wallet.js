import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container-wallet">
        <Header />
        <nav>
          <div>navbar</div>
        </nav>
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
