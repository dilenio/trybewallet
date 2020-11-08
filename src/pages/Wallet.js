import React from 'react';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import Table from '../components/Table';
import Footer from '../components/Footer';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container-wallet">
        <Header />
        <Expenses />
        <Table />
        <Footer />
      </div>
    );
  }
}

export default Wallet;
