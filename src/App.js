import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes!</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ (props) => <Login { ...props } /> } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
