import React from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const name = await getUser();
    this.setState({ loading: false, userName: name.name });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <p>Carregando...</p>
          : <p data-testid="header-user-name">{ userName }</p> }
      </header>
    );
  }
}
