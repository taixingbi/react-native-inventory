import styles from './styles';
import * as rest from './rest';

import React from 'react';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  AsyncStorage,
  Image,
  ActivityIndicator, 
} from 'react-native'

export default class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'taixingbi@gmail.com',
      password: 'Bi4820806',
      // email: '',
      // password: '',
      isLoading: false,
    }
  }
  
  async btn_login(email, password){
    if( email==='' || password===''){
      alert("email or password not found");
      return    
      ;
    }

    let access_token= await rest.post_login(email, password);
    this.setState({
      isLoading: true,
    })

    const user= await rest.post_user(email, access_token);

    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('access_token', access_token);
    console.log("access_token was stored in AsyncStorage")
    
    this.props.navigation.navigate('Home');
    console.warn("------------Go To Home Page from Login Page-------------");

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (

      <View style = {styles.container}>
        
        <View style = {styles.container1}>

          <Text style = {styles.login}> LOGIN </Text>  

          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "  Email"
            placeholderTextColor = "#808080"
            autoCapitalize = "none"
            onChangeText = { (text) => this.setState({ email: text }) }/>

          <TextInput style = {styles.input}
            secureTextEntry={true}
            underlineColorAndroid = "transparent"
            placeholder = "  Password"
            placeholderTextColor = "#808080"
            autoCapitalize = "none"
            onChangeText = { (text) => this.setState({ password: text }) }/>

          <TouchableOpacity style = {styles.submitButton}
            onPress = {
                () => this.btn_login(this.state.email, this.state.password)
            }>

            <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>

        </View>

          <View style = {styles.container2}>
          {/* <Logo /> */}

          <TouchableOpacity style = {styles.facebook}>
            <Text style = {styles.facebookText}> login with facebook </Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.google}>
            <Text style = {styles.googleText}> login with google </Text>
          </TouchableOpacity>

          <Text style = {styles.signup}> SIGNUP</Text>  
        </View>

      </View>
    );
  }  
}
