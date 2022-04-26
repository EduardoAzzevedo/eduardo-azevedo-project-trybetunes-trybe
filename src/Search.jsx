import React from 'react';
import Header from './components/Header';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import AlbunsDetails from './components/AlbunsDetails';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isDisabled: true,
      loading: false,
      albums: [],
      artistName: '',
      showResult: false,
      notFound: false,
    };
  }

  buttonDisabled = () => {
    const { searchInput } = this.state;
    return (searchInput.length > 0
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true }));
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const valor = target.type === 'checkbox'
      ? target.checked
      : target.value;
    this.setState({ [name]: valor });
    this.buttonDisabled();
  }

  click = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const getAlbums = await searchAlbumsAPI(searchInput);
    if (getAlbums.length > 0) {
      this.setState({
        artistName: searchInput,
        searchInput: '',
        albums: getAlbums,
        loading: false,
        showResult: true,
      });
    } else {
      this.setState({
        searchInput: '',
        loading: false,
        notFound: true,
      });
    }
  }

  render() {
    const { isDisabled,
      loading,
      albums,
      notFound,
      artistName,
      searchInput,
      showResult,
    } = this.state;

    const form = (
      <form>
        Pesquisar artista:
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          onClick={ this.click }
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </form>);

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <p>Carregando...</p> : form}
        { showResult && (
          // a baixo o resultado de albuns recebe pelo input on ome do artista digitado.
          <div>
            <p>{`Resultado de álbuns de: ${artistName}`}</p>
            { albums.map((music) => (
              <AlbunsDetails key={ music.collectionId } { ...music } />)) }
          </div>)}
        { notFound && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}
