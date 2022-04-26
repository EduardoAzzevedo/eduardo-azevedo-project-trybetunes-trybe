import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from './services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isDisabled: true,
      loading: false,
    };
  }

  click = () => {
    const { history } = this.props;
    const { inputName } = this.state;
    const user = {
      name: inputName,
    };

    this.setState({ loading: true }, async () => {
      await createUser(user);
      history.push('/search');
    });
  }

  buttonDisabled = () => {
    const { inputName } = this.state;
    console.log(inputName.length);
    return (inputName.length > 1
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true }));
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: valor });
    this.buttonDisabled();
  }

  render() {
    const {
      inputName,
      isDisabled,
      loading,
    } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            data-testid="login-name-input"
            id="input-name"
            name="inputName"
            value={ inputName }
            onChange={ this.onInputChange }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.click }
          disabled={ isDisabled }
        >
          Entrar
        </button>
        { loading && <p>Carregando...</p> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
