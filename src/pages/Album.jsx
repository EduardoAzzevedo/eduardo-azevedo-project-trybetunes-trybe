import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      nomeDoArtista: '',
      nomeDaMusica: '',
      nomeDoAlbum: '',
      musicaProcurada: '',
      procurar: false,
      listaDeFavoritas: '',
      pegouFavoritas: true,
    };
    this.iteraAlbuns = this.iteraAlbuns.bind(this);
    this.procuraMusica = this.procuraMusica.bind(this);
  }

  async componentDidMount() {
    await this.procuraMusica();
    this.iteraAlbuns();
    this.pegaFavoritas();
  }

  iteraAlbuns() {
    const { musicaProcurada } = this.state;
    const musicasEncontradas = (
      musicaProcurada.filter(({ wrapperType }) => wrapperType !== 'track')
    );
    this.setState({
      nomeDaMusica: musicaProcurada.filter(({ kind }) => kind === 'song'),
      nomeDoArtista: musicasEncontradas[0].artistName,
      nomeDoAlbum: musicasEncontradas[0].collectionName,
      procurar: true,
    });
  }

  async procuraMusica() {
    const { match: { params: { id } } } = this.props;
    const achou = await getMusic(id);
    this.setState({ musicaProcurada: achou });
  }

  async pegaFavoritas() {
    const arrayDeFavoritas = await getFavoriteSongs();
    this.setState({
      pegouFavoritas: false,
      listaDeFavoritas: arrayDeFavoritas,
    });
  }

  render() {
    const {
      procurar,
      nomeDoAlbum,
      nomeDaMusica,
      nomeDoArtista,
      pegouFavoritas,
      listaDeFavoritas,
    } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {(procurar && !pegouFavoritas)
          && (
            <div>
              <h1 data-testid="artist-name">{nomeDoArtista}</h1>
              <p data-testid="album-name">{nomeDoAlbum}</p>
              {nomeDaMusica.map((unidade) => (
                <MusicCard
                  key={ unidade.trackId }
                  musicaClicada={ unidade }
                  idDaMusica={ unidade.trackId }
                  NomeDaMusica={ unidade.trackName }
                  urlDaMusica={ unidade.previewUrl }
                  listaDeFavoritas={ listaDeFavoritas }
                />)) }
            </div>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
