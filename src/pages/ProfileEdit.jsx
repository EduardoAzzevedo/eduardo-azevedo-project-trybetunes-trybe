import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.atualiza = this.atualiza.bind(this);
    this.checando = this.checando.bind(this);
    this.state = {
      carregando: true,
      name: '',
      email: '',
      image: '',
      description: '',
      ativaBotao: true,
    };
  }

  async componentDidMount() {
    const detalhes = await getUser();
    this.setState({
      name: detalhes.name,
      email: detalhes.email,
      image: detalhes.image,
      description: detalhes.description,
      carregando: false,
    });
    this.checando(detalhes);
  }

  onInputChange({ target }) {
    const { name, email, image,
      description,
    } = this.state;
    const input = target.value;
    this.setState({
      [target.name]: input,
    }, () => {
      if (
        name !== ''
        && email !== ''
        && image !== ''
        && description !== '') {
        return this.setState({ ativaBotao: false });
      }
      return this.setState({ ativaBotao: true });
    });
  }

  checando(objeto) {
    if (
      objeto.name !== ''
      && objeto.email !== ''
      && objeto.image !== ''
      && objeto.description !== '') {
      return this.setState({ ativaBotao: false });
    }
    return this.setState({ ativaBotao: true });
  }

  atualiza() {
    const { name, email, image,
      description,
    } = this.state;
    const { history } = this.props;
    const usuario = {
      name,
      email,
      image,
      description,
    };
    updateUser(usuario);
    history.push('/profile');
  }

  render() {
    const { carregando, name, email, image,
      description, ativaBotao,
    } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          {carregando ? (<Carregando />
          ) : (
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  name="name"
                  type="text"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="image">
                Imagem:
                <input
                  data-testid="edit-input-image"
                  name="image"
                  type="text"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  data-testid="edit-input-email"
                  name="email"
                  type="text"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  data-testid="edit-input-description"
                  name="description"
                  text="text"
                  value={ description }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ ativaBotao }
                onClick={ this.atualiza }
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
