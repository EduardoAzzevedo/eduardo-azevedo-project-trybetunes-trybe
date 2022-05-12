import React from 'react';
import PropTypes from 'prop-types';
import AlbunsDetails from './AlbunsDetails';

class MusicaCardAlbum extends React.Component {
  render() {
    const {
      arrayAlbuns,
      nomeArtista,
    } = this.props;
    if (arrayAlbuns.length <= 0) {
      return (<div>Nenhum álbum foi encontrado</div>);
    } return (
      <div>
        <section>
          <p>
            Resultado de álbuns de:
            {' '}
            { nomeArtista }
          </p>
          {arrayAlbuns
            .map(({ collectionId, artworkUrl100, collectionName }) => (
              <AlbunsDetails
                key={ collectionId }
                Id={ collectionId }
                Image={ artworkUrl100 }
                AlbumName={ collectionName }
              />
            ))}
        </section>
      </div>
    );
  }
}

MusicaCardAlbum.propTypes = {
  arrayAlbuns: PropTypes.arrayOf(Object).isRequired,
  nomeArtista: PropTypes.string.isRequired,
};

export default MusicaCardAlbum;
