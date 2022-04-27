import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from './services/musicsAPI';
import MusicCard from './components/MusicCard';
import { addSong, getFavoriteSongs } from './services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: '',
      albumSongs: [],
      loading: false,
      favorite: null,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const fetchMusics = await getMusics(id);
    // fetchmusics recebe getmusics que recebe os ids como assincrono.
    const nomeDoArtista = fetchMusics[0].artistName;
    // nda recebe o primeiro que mostrar com o id recebido
    const nomeDoAlbum = fetchMusics[0].collectionName;
    const songs = fetchMusics.filter((_, ids) => ids !== 0);
    // musicas filtra pelo id se o id for diferente de 0.
    this.setState({
      artist: nomeDoArtista,
      albumName: nomeDoAlbum,
      albumSongs: songs,
    });
    const fSongs = await getFavoriteSongs();
    this.setState({ favorite: fSongs });
  }

  changeClick = (song) => {
    this.setState({ loading: true }, async () => {
      await addSong(song);
      const fSongs = await getFavoriteSongs();
      this.setState({
        favorite: fSongs,
        loading: false,
      });
    });
  }

  render() {
    const {
      artist,
      albumSongs,
      albumName,
      loading,
      favorite,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{`Artist: ${artist}`}</p>
        <p data-testid="album-name">{`Album: ${albumName}`}</p>
        { favorite !== null && albumSongs.map((songs, ids) => (
          <MusicCard
            key={ ids }
            changeClick={ this.changeClick }
            fSongs={ favorite }
            song={ songs }
            { ...songs }
            // trackName={ musicas.trackName }
            // previewUrl={ musicas.previewUrl }
            // trackId={ musicas.trackId }
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
