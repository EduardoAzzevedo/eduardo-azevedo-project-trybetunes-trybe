import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from './services/musicsAPI';
import MusicCard from './components/MusicCard';
import { addSong } from './services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: '',
      albumSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const fetchMusics = await getMusics(id);
    // fetchmusics recebe getmusics que recebe os ids como assincrono.
    const nomeDoArtista = fetchMusics[0].artistName;
    // nda recebe o primeiro que mostrar com o id recebido
    const nomeDoAlbum = fetchMusics[0].collectionName;

    const musicas = fetchMusics.filter((_, ids) => ids !== 0);
    // musicas filtra pelo id se o id for diferente de 0.
    this.setState({
      artist: nomeDoArtista,
      albumName: nomeDoAlbum,
      albumSongs: musicas,
    });
  }

  changeClick = () => {
    const { musica } = this.state;
    this.setState({ loading: true }, async () => {
      await addSong(musica);
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      artist,
      albumSongs,
      albumName,
      loading,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{`Artist: ${artist}`}</p>
        <p data-testid="album-name">{`Album: ${albumName}`}</p>
        { albumSongs.map((musicas, ids) => (<MusicCard
          key={ ids }
          changeClick={ this.changeClick }
          { ...musicas }
        />
        )) }
        { loading && <p>Carregando...</p> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
  }).isRequired,
};
