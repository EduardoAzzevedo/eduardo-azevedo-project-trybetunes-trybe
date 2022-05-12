import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isDisabled: true,
      loading: false,
      redirectToSearch: false,
    };
    this.buttonDisabled = this.buttonDisabled.bind(this);
    this.sendUserName = this.sendUserName.bind(this);
  }

  buttonDisabled({ target }) {
    const magicNumber = 3;
    const { value } = target;
    this.setState({
      inputName: value,
      isDisabled: (value.length < magicNumber),
    });
  }

  async sendUserName() {
    this.setState({ loading: true });
    const { inputName } = this.state;
    await createUser({ name: inputName });
    this.setState({ loading: false, redirectToSearch: true });
  }

  render() {
    const {
      inputName,
      isDisabled,
      loading,
      redirectToSearch,
    } = this.state;
    return (
      <div>
        <div data-testid="page-login">Login</div>
        Nome:
        <input
          type="text"
          data-testid="login-name-input"
          value={ inputName }
          onChange={ this.buttonDisabled }
        />

        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.sendUserName }
          disabled={ isDisabled }
        >
          Entrar
        </button>
        { loading && <p>Carregando...</p> }
        { redirectToSearch && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
