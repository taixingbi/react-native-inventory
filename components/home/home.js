import React, { Component } from 'react';

import { 
  View, 
  ActivityIndicator, 
  Image,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native'

import { Col, Row, Grid } from "react-native-easy-grid";
import styles from './styles';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }
  
  static navigationOptions = {
    title: 'Home',
  };

  async mechanician(name){
    await AsyncStorage.setItem('stateFromHome', name);

    if(name=="Count Accessories"){
      this.props.navigation.navigate('Count');
    }
    if(name=="Send and Pick Bike"){
      this.props.navigation.navigate('Delivery');
    }
    if(name=="Mechanician"){
      this.props.navigation.navigate('Mechanician');
    }


    console.warn("------------Go To Mechanician Page from Login Page-------------");  
  }

  profile(){
    this.props.navigation.navigate('Profile');
    console.warn("------------Go To profile Page from Login Page-------------");  
  }
      
  async componentWillMount(){
    console.warn("componentWillMount");

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
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
      <Grid style={styles.grid}>

        <Row  size={2}>
          <Image  style = {styles.img_b}
            source={require('../../imgs/inventory.jpg')}
          />
        </Row>

        <Row style={{ backgroundColor: 'white', }} size={1}>

          <Row >
            <TouchableHighlight onPress={() => this.mechanician("Count Accessories")}>
              <Image  style = {styles.img_s}
                      source={require('../../imgs/accessories.jpg')}
              />
            </TouchableHighlight>        
          </Row> 

          <Row >
            <TouchableHighlight onPress={() => this.mechanician("Send and Pick Bike")}>
              <Image  style = {styles.img_s}
                      source={require('../../imgs/bike.jpg')}
              />
            </TouchableHighlight>        
          </Row>   

          <Row >
            <TouchableHighlight onPress={() => this.mechanician("Mechanician")}>
              <Image  style = {styles.img_s}
                      source={require('../../imgs/mechanician.jpg')}
              />
            </TouchableHighlight>        
          </Row>   

        </Row>

        <Row  size={1.5}>
          <Row size={1} >
            <TouchableHighlight onPress={() => this.profile()}>
              <Image  style = {styles.img_m}
                      source={require('../../imgs/profile.jpg')}
              />
            </TouchableHighlight>
          </Row>

          <Row  size={1}  style={styles.container_small} >
            <TouchableHighlight onPress={() => this.mechanician()}>
              <Image style = {styles.img_m}
                source={require('../../imgs/analytics.jpg')}
              />
            </TouchableHighlight>   
          </Row>
        </Row>
        
      </Grid>
    );
  }
}