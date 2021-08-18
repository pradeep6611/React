import React , { Component } from 'react';
import HomePage from './components/HomePage';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Result from './components/Result';
import Summary from './components/Summary';
import { Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render () {
    return (
      <Provider store={store}>
            <Switch>
              <Route exact path ="/" component={HomePage}/>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/register" component={Register}/>
              <Route exact path ="/profile" component={Profile}/>
              <Route exact path ="/quiz" component={Quiz}/>
              <Route exact path ="/summary" component={Summary}/>
              <Route exact path ="/result" component={Result} />
            </Switch>
      </Provider>
    );
}
}

export default App;
