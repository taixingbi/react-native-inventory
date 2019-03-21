import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '新闻',
  };
  render() {
    return (
      <Button
      title="国际新闻"
      onPress={
        () => { 
          this.props.navigation.goBack() 
          this.props.navigation.state.params.refresh();
        }
      }
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});