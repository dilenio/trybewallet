import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../actions';

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
    return password.length >= 6 ? true : false;
  }

  isLogin() {
    if (
      this.isEmail(this.state.email) &&
      this.isPassword(this.state.password)
    ) {
      this.setState({ loginDisable: false });
    } else {
      this.setState({ loginDisable: true });
    }
  }

  handlePassword(event) {
    this.setState(
      {
        password: event.target.value,
      },
      () => this.isLogin()
    );
  }

  handleLogin(props) {
    this.props.history.push('/carteira');
  }

  render() {
    const { email, password, loginDisable } = this.state;
    const { loginEmail } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <label>
          email
          <input
            type="text"
            data-testid="email-input"
            onChange={(e) => {
              this.setState({ email: e.target.value });
              this.isLogin();
            }}
          />
        </label>
        <label>
          password
          <input
            type="password"
            data-testid="password-input"
            onChange={this.handlePassword}
          />
        </label>
        <button
          id="btnlogin"
          type="button"
          disabled={loginDisable}
          onClick={() => {
            this.props.loginEmail(this.state);
            this.handleLogin(this.props);
          }}
        >
          Entrar
        </button>
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
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
