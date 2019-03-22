import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Alert,
  AsyncStorage,
} from 'react-native';

import { 
  Constants, 
  BarCodeScanner, 
  Permissions 
} from 'expo';

export default class scan extends Component {

  static navigationOptions = {
    title: 'Scan',
  };

  state = {
    hasCameraPermission: null,
    lastScan: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

   _handleBarCodeRead =  async data => {

    if (data !== this.state.lastScan) {

      this.setState({ lastScan: data })

      try {
        await AsyncStorage.setItem('qrcode', data.data);
        console.log('qrcode was save in AsyncStorage: ', data.data);

      } catch(e) {
        console.log(e);
      }
      
      let qrcode= this.state.lastScan.data;
      //alert(qrcode);
      Alert.alert(
        'QRCODE',
        qrcode,
        [
          {text: 'OK', onPress: () => this.store_qrcode()},
        ]
      );
      return;
    }

  };

  async store_qrcode(){
    console.warn("------------Go To Post page from Scan gage-------------");
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  render() {
    return (

      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :

            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              //style={{ height: 700, width: 500 }}
              style={[StyleSheet.absoluteFill, styles.container]}
            />
        }
      </View>

    );
  }

  componentWillUnmount () {
    //alert('scan componentWillUnmount');
    this.props.navigation.state.params.refresh();
  }


  // shouldComponentUpdate(){
  //   alert("scan shouldComponentUpdate");
    
  // }

  // componentDidUpdate(){
  //   alert(" scan componentDidUpdate");
  // }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});