import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbunsDetails extends React.Component {
  render() {
    const { Id, Image, AlbumName } = this.props;
    return (
      <section>
        <div>
          <img src={ Image } alt={ AlbumName } />
          <p>{ AlbumName }</p>
        </div>
        <Link
          to={ `album/${Id}` }
          data-testid={ `link-to-album-${Id}` }
        >
          Album de Musicas
        </Link>
      </section>
    );
  }
}

AlbunsDetails.propTypes = {
  Id: PropTypes.string.isRequired,
  Image: PropTypes.string.isRequired,
  AlbumName: PropTypes.string.isRequired,
};

export default AlbunsDetails;
