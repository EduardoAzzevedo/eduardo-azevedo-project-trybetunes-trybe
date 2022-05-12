import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class ListaDeFavoritos extends React.Component {
  render() {
    const {
      arrayDeFav,
      atualizar,
    } = this.props;
    return (
      <div>
        {arrayDeFav.map((unidade) => (
          <MusicCard
            key={ unidade.trackId }
            musicaClicada={ unidade }
            idDaMusica={ unidade.trackId }
            NomeDaMusica={ unidade.trackName }
            urlDaMusica={ unidade.previewUrl }
            listaDeFavoritas={ arrayDeFav }
            atualizar={ atualizar }
          />))}
      </div>
    );
  }
}

ListaDeFavoritos.propTypes = {
  arrayDeFav: PropTypes.arrayOf(Object).isRequired,
  atualizar: PropTypes.func.isRequired,
};

export default ListaDeFavoritos;
