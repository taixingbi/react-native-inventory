import React, { Component } from 'react';
import {  Text, 
          View,
          AsyncStorage,
          ActivityIndicator,
          TouchableHighlight,
          Image
        } 
from 'react-native';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      level: '',
      locations: '',
      isLoading: false,
    }
  }

  async componentWillMount(){
    this.setState({
      isLoading: true,     
    });
    console.warn("componentWillMount");

    user = await AsyncStorage.getItem('user');
    user= JSON.parse(user);

    this.setState({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      level: user.level,
      locations: user.locations,      
    });

    console.log(this.state);

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    parse_level= {
      '1': "admin",
      '2': "manager",
    }

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableHighlight >
          <Image  
                  source={require('../../imgs/user.jpg')}
          />
        </TouchableHighlight>   

        <Text> Name:  {this.state.first_name} { this.state.last_name}</Text>
        <Text> Email:  {this.state.email} </Text>

        <Text> Role: { parse_level[ this.state.level.toString() ] }</Text>

      </View>
    );
  }
}


