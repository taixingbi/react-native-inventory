import styles from './styles';
import * as modules from './modules';
import * as rest from './rest';

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  AsyncStorage,
  Picker,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

import { Container, 
        Content, 
        Accordion, 
        Icon,  
        Footer, 
} from "native-base";

import { Table, 
         Row, 
         Rows } from 'react-native-table-component';

export default class Mechanician extends Component {
  static navigationOptions = {
    title: 'Mechanician',
  };

  _refresh= async ()=>{
    console.log('refresh')
    alert('refresh')
    qrcode = await AsyncStorage.getItem('qrcode');
    this.setState({
      qrcode: qrcode,
    });
    console.warn(qrcode," is just taken.");
  }

  camera= () => ( <Image style = {styles.scan} source = {require('../../imgs/scan.jpg')} /> )

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      //login user info
      user: null,
      //table
      tableData: null,
      dataArray: [
        { title: "Info", content: "" },
        { title: "Scan", content: "" },
        { title: "Post", content: "" },
        { title: "Table", content: "" },
      ],
      //dynamic
      qrcode: '',
      action: '',

    }

    this._renderContent = this._renderContent.bind(this);
  }

  async componentWillMount(){
    //alert("componentWillMount");
    console.warn("componentWillMount");

    //get user info 
    user = JSON.parse( await AsyncStorage.getItem('user') );
    //Authorization
    const access_token = await AsyncStorage.getItem('access_token');
    const headers= {"Authorization" : "Bearer " + access_token };

    this.setState({
      headers: headers,
      user: user,
    });

    //get dababase data and show as table
    const data= await this.get();

    //update table as array
    this.data2table(data);

    //set time out for resending
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 50);

  }

  async get(){
    return rest.get( this.state.headers, this.state.user.email) 
  } 

  async post(){

    data= {
        email: this.state.user.email,
        qrcode: this.state.qrcode,
        qrcode_state: this.state.action,
        comment: this.state.comment,
        category: this.state.category,
        color: this.state.color,
        size: this.state.size,
        qty: this.state.qty,
    }
    
    rest.post(this.state.headers, data) 
    alert("test")

    //re-get table 

    data= await this.get();
    console.warn(data);
    this.data2table(data);
  }

  confirm_button(){
    if(this.state.action==0){
        alert("Please select action");
        return;
    }
    Alert.alert(
        'Are You Sure?',
        this.state.qrcode,
        [
           { text: 'OK', onPress: () => this.post() },
          //{ text: 'OK', onPress: () => {alert("test")} },

        ]
    );
  }

  data2table(data){
    function json2array(obj) {
      return [  obj.first_name + ' '+ obj.last_name, 
                obj.qrcode, 
                obj.state, 
                obj.category, 
                obj.color, 
                obj.size, 
                obj.qty, 
                obj.comment, 
                obj.location, 
                obj.created_at];
    }

    this.setState({
      data: data,
      tableData: data.map( json2array ),
    });
  }

  _renderHeader(item, expanded) {
    if(item.title== "Info"){
      return (
        <View style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center" ,
          backgroundColor: "#b1d67f" }}>

          <Text style={{ 
            fontWeight: "600",
            textAlign: 'center', // <-- the magic
            }}>
            {" "}{item.title}
          </Text>

          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}

        </View>
      );
    }

    if(item.title== "Scan"){
      return (
        <View style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center" ,
          backgroundColor: "#8dc63f" }}>
          <Text style={{ fontWeight: "600" }}>
            {" "}{item.title}
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
        </View>
      );
    }
    if(item.title== "Post"){
      return (
        <View style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center" ,
          backgroundColor: "#598527" }}>

        <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>

        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}

        </View>
      );
    }
    if(item.title== "Table"){
      return (
        <View style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center" ,
          backgroundColor: "#464646" }}>
        <Text style={{ fontWeight: "600" }}>
            {" "}{item.title}
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
        </View>
      );
    }

  }

  _renderContent(item) {

    action= modules.action

    if(item.title== "Info"){
      picker= () => {  
        //if (this.state.user.level=='4') {//4: mechanicial
            return  <Picker 
                      selectedValue = {this.state.action} 
                      onValueChange = { (value) => this.setState({ action: value }) }>
                      <Picker.Item label = "Please select action" value = "0" /> 
                      <Picker.Item label = "Lets fix bike" value = {action['start_fix']} /> 
                      <Picker.Item label = "Bike-fixing done" value = {action['finish_fix']} />

                      <Picker.Item label = "Pick bike" value = {action['pick']} />
                      <Picker.Item label = "Send bike" value = {action['send']} />

                      <Picker.Item label = "Lets increase count" value = {action['add_count']} />
                      <Picker.Item label = "Lets decrease count" value = {action['reduce_count']} />

                    </Picker>;   
      }
        
      return (
        <Content style={styles.content1}>

          <Text   style={styles.user}>
            {this.state.user.first_name} {this.state.user.last_name} {'    '} {this.state.user.email}

          </Text>  

          {picker()}

        </Content>
      );
    }

    if(item.title== "Scan"){
      return (
      <Content style={styles.content1}>

        <TouchableHighlight onPress={() => this.ButtonQRReader()}>
          <Image
            style={styles.imgCamera}
            source={require('../../imgs/scan.jpg')}
          />
        </TouchableHighlight>

      </Content>   
      ) 
    }

    if(item.title== "Table"){
      return (
        <Table borderStyle={styles.table}>
          <Row data={['User', 'Qrcode', 'State', 'category', 'color' , 'Size', 'quantity', 'Comment', 'Location', 'Created time']} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.state.tableData} textStyle={styles.text}/>
        </Table>    
      );
    }

    if(item.title== "Post"){
      console.log(this.state.qrcode);
      //let qrcode = await AsyncStorage.getItem('qrcode');
      return (

        <Content style={styles.content1}>

          { <Picker 
            selectedValue = {this.state.category} 
            onValueChange = { (value) => this.setState({ category: value }) }>
                <Picker.Item label = "Bike" value = "27" />
                <Picker.Item label = "Hemlets" value = "2" />
                <Picker.Item label = "Locks" value = "10" />
          </Picker>  }

          <TextInput 
                      value={this.state.color}
                      onChangeText = {  (value) => this.setState({ color: value }) }

                      style = {styles.input_color}
                      underlineColorAndroid = "transparent"
                      placeholder = "color"
                      autoCapitalize = "none"
                  />

          <TextInput 
                      value={this.state.size}
                      onChangeText = {  (value) => this.setState({ size: value }) }

                      style = {styles.input_size}
                      underlineColorAndroid = "transparent"
                      placeholder = "size"
                      autoCapitalize = "none"
                  />

          <TextInput 
                      value={this.state.qty}
                      onChangeText = {  (value) => this.setState({ qty: value }) }

                      style = {styles.input_qty}
                      underlineColorAndroid = "transparent"
                      placeholder = "qty"
                      autoCapitalize = "none"
                  />

         <TextInput 
                      value={this.state.comment}
                      onChangeText = {  (value) => this.setState({ comment: value }) }

                      style = {styles.input_comment}
                      underlineColorAndroid = "transparent"
                      placeholder = "comment"
                      autoCapitalize = "none"
                  />

          <TouchableOpacity
          style = {styles.submitButton}
          onPress = {
              () => this.confirm_button()
          }>
          <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>

        </Content>
      );
    }
  }

  ButtonQRReader = ( ) => {
    console.warn("------------Go To Scan page from Mechanician Page-------------");
    this.props.navigation.navigate('Scan',{
      refresh:()=>{

        this._refresh();
      },
    })

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
        <Container>

          <Content padder>
            <View style={styles.container}>

              <Accordion
                dataArray={this.state.dataArray}
                animation={true}
                expanded={true}

                //headerStyle={{ backgroundColor: "#b7daf8" }}
                //contentStyle={{ backgroundColor: "#ddecf8" }}

                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />

            </View>


          </Content>

          <Footer>
            <View style={{
              //flexDirection: "row",
              padding: 20,
              justifyContent: "space-between",
              alignItems: "left" ,
              //backgroundColor: "#8dc63f" 
              }}>
              <Text style = {styles.state}> Action: { modules.action_(this.state.action) }</Text>
              <Text style = {styles.qrcode}> Qrcode: {this.state.qrcode}</Text>
            </View>
          </Footer>

        </Container>
    );
  }

  async componentDidMount(){
    //alert("Mechanician componentDidMount");
    qrcode = await AsyncStorage.getItem('qrcode');
    if(qrcode!=this.state.qrcode){
      this.setState({
        qrcode: qrcode,
      });
      console.warn(qrcode," is just taken.");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    //alert('componentWillUpdate');

    console.warn(nextState.action); //will show the new state
    console.warn(this.state.action); //will show the previous state
  }

  async componentWillUnmount () {
    //alert('Mechanician componentWillUnmount');

    console.warn("componentWillUnmount");

    //alert('componentWillUnmount2');
    //AsyncStorage.clear();
    console.log('log out already');
  }

 


  // shouldComponentUpdate(){
  //   alert("Mechanician shouldComponentUpdate");
    
  // }

  componentDidUpdate(){
    //alert(" Mechanician componentDidUpdate");
  }

}
