import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';
import ListaDeFavoritos from '../components/ListaDeFavoritos';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeFavoritas: [],
      carregando: false,
    };
    // this.pegaFavorito = this.pegaFavorito.bind(this);
    // this.atualizaMusica = this.atualizaMusica.bind(this);
  }

  componentDidMount() {
    this.pegaFavorito();
  }

  async atualizaMusica() {
    const favoritas = await getFavoriteSongs();
    this.setState({ listaDeFavoritas: favoritas });
  }

  async pegaFavorito() {
    this.setState({
      carregando: true,
    });
    const pegaMusicas = await getFavoriteSongs();
    this.setState({
      listaDeFavoritas: pegaMusicas,
      carregando: false,
    });
  }

  render() {
    const {
      listaDeFavoritas,
      carregando,
    } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando ? <Carregando />
          : (
            <div>
              Lista de Favoritos
              <ListaDeFavoritos
                arrayDeFav={ listaDeFavoritas }
                atualizar={ () => this.atualizaMusica() }
              />
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
