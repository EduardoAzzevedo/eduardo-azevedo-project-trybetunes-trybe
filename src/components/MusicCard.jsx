import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
    this.enviaParaFavoritos = this.enviaParaFavoritos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.favorita();
  }

  handleChange = ({ target }) => {
    const { musicaClicada } = this.props;
    const value = target.checked;
    this.setState({
      check: value,
    });
    if (value) {
      this.enviaParaFavoritos(musicaClicada);
    } else {
      this.removeDeFavoritos(musicaClicada);
    }
  }

  favorita() {
    const {
      listaDeFavoritas,
      idDaMusica,
    } = this.props;
    const musFav = listaDeFavoritas.some((mus) => mus.trackId === idDaMusica);
    this.setState({
      check: musFav,
    });
  }

  async enviaParaFavoritos(musicaClicada) {
    this.setState({ loading: true });
    await addSong(musicaClicada);
    this.setState({ loading: false });
  }

  async removeDeFavoritos(musicaClicada) {
    this.setState({ loading: true });
    await removeSong(musicaClicada);
    this.setState({ loading: false });
  }

  render() {
    const {
      NomeDaMusica,
      urlDaMusica,
      idDaMusica,
    } = this.props;

    const {
      loading,
      check,
    } = this.state;

    return (
      loading
        ? <p>Carregando...</p>
        : (
          <div>
            <p>{ NomeDaMusica }</p>
            <audio data-testid="audio-component" src={ urlDaMusica } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <input
              data-testid={ `checkbox-music-${idDaMusica}` }
              type="checkbox"
              checked={ check }
              onChange={ this.handleChange }
            />
          </div>)
    );
  }
}

MusicCard.propTypes = {
  NomeDaMusica: PropTypes.string.isRequired,
  urlDaMusica: PropTypes.string.isRequired,
  idDaMusica: PropTypes.number.isRequired,
  musicaClicada: PropTypes.shape().isRequired,
  listaDeFavoritas: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
