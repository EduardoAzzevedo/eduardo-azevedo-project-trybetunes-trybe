import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      changeClick,
      trackId,
      favMus,
      musica,
    } = this.props;

    const favoritList = favMus.some((musicas) => musicas.trackId === trackId);

    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="input-fav">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id="input-fav"
            onChange={ () => changeClick(musica) }
            checked={ favoritList }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  changeClick: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  favMus: PropTypes.string.isRequired,
  musica: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
