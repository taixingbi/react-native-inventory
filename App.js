import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

import login from './components/login/login';
import home from './components/home/home';
import profile from './components/profile/profile';

import mechanician from './components/mechanician/mechanician';
import scan from './components/scan/scan';

import test from './components/test';


const RootStack = createStackNavigator(
  {
    Login: login,
    //langding page
    Home: home,
    //profile
    Profile: profile,

    //Mechanician
    Mechanician: mechanician,
    Mechanician_: mechanician,
    Scan: scan,

    Test: test,
  },
  {
    initialRouteName: 'Mechanician', //Login
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
