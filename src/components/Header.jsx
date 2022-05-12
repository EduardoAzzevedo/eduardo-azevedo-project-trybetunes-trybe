import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
    this.userNameFunc = this.userNameFunc.bind(this);
  }

  async componentDidMount() {
    const nome = await getUser();
    this.userNameFunc(nome.name);
  }

  userNameFunc(umaString) {
    this.setState({
      loading: false,
      userName: umaString,
    });
  }

  render() {
    const {
      loading,
      userName,
    } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favoritos </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </nav>
        { loading ? <Carregando />
          : (
            <p data-testid="header-user-name">{userName}</p>
          )}
      </header>
    );
  }
}

export default Header;
