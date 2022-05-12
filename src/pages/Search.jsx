import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';
import MusicaCardAlbum from '../components/MusicaCardAlbum';

class Search extends React.Component {
  constructor() {
    super();

    this.desativarBotao = this.desativarBotao.bind(this);
    this.procuraArtista = this.procuraArtista.bind(this);

    this.state = {
      botaoOff: true,
      procurarNome: '',
      carregando: false,
      resultProc: [],
      ultimaProcura: '',
    };
  }

  desativarBotao({ target }) {
    const maiorIgual = 2;
    const { value } = target;
    this.setState({
      procurarNome: value,
      botaoOff: (value.length < maiorIgual),
    });
  }

  async procuraArtista() {
    const { procurarNome } = this.state;
    const procurar = procurarNome;
    this.setState({
      procurarNome: '',
      carregando: true,
    });
    const artistaResultado = await searchAlbumsAPI(procurar);
    this.setState({
      resultProc: artistaResultado,
      carregando: false,
      ultimaProcura: procurar });
  }

  render() {
    const {
      botaoOff,
      procurarNome,
      carregando,
      resultProc,
      ultimaProcura,
    } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            value={ procurarNome }
            data-testid="search-artist-input"
            onChange={ this.desativarBotao }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ botaoOff }
            onClick={ this.procuraArtista }
          >
            Pesquisar
          </button>
        </div>
        { carregando ? <Carregando />
          : <MusicaCardAlbum arrayAlbuns={ resultProc } nomeArtista={ ultimaProcura } />}
      </div>
    );
  }
}

export default Search;
