import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import Table from '../components/Table';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container-wallet">
        <Header />
        <Expenses />
        <Table />
        <footer className="container-footer">
          <div className="footer-text">
            Criado por Dilenio Enderle - Projeto Trybe Wallet
          </div>
        </footer>
      </div>
    );
  }
}

export default Wallet;
