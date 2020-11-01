import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../actions';
import '../css/login.css';
import logo from '../assets/logo.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loginDisable: true,
    };
    this.handlePassword = this.handlePassword.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  isEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  isPassword(password) {
    const six = 6;
    return password.length >= six;
  }

  isLogin() {
    const { email, password } = this.state;
    if (this.isEmail(email) && this.isPassword(password)) {
      this.setState({ loginDisable: false });
    } else {
      this.setState({ loginDisable: true });
    }
  }

  handlePassword(event) {
    this.setState({ password: event.target.value }, () => this.isLogin());
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password, loginDisable } = this.state;
    const { loginEmail } = this.props;
    return (
      <div className="container-login">
        <div className="boxlogin">
          <div className="logo">
            <img src={ logo } alt="Wallet logo" className="icon" />
          </div>
          <div className="access">
            <input
              className="input"
              name="email"
              type="text"
              data-testid="email-input"
              placeholder="E-mail"
              value={ email }
              onChange={ (e) => {
                this.setState({ email: e.target.value });
                this.isLogin();
              } }
            />
            <input
              className="input"
              name="password"
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              value={ password }
              onChange={ this.handlePassword }
            />
            <button
              className="btn"
              id="btnlogin"
              type="button"
              disabled={ loginDisable }
              onClick={ () => {
                loginEmail(email);
                this.handleLogin();
              } }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (email) => dispatch(loginAction(email)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
