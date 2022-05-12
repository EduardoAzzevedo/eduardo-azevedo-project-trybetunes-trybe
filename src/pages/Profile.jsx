import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
// import Usuario from '../components/Usuario';
import Carregando from '../components/Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({
      carregando: false,
      usuario,
    });
  }

  render() {
    const {
      carregando,
      usuario,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {carregando ? <Carregando />
          : (
            <div>
              <h2>{ usuario.name }</h2>
              <p>{ usuario.email}</p>
              <p>{ usuario.description}</p>
              <img data-testid="profile-image" src={ usuario.image } alt="foto" />
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>
            </div>)}
      </div>
    );
  }
}

export default Profile;
