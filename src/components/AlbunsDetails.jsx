import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbunsDetails extends React.Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div>
        <p>{ `Artist ID: ${artistId}` }</p>
        <p>{ `Artist Name: ${artistName}` }</p>
        <p>{ `CD ID: ${collectionId}` }</p>
        <p>{ `CD Name: ${collectionName}` }</p>
        <p>{ `CP Price: ${collectionPrice}` }</p>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ `Release Date: ${releaseDate}` }</p>
        <p>{ `Tracks: ${trackCount}` }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Album Musics
        </Link>
      </div>
    );
  }
}

AlbunsDetails.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
