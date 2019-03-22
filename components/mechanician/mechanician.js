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
    //title: "",
  };

  _refresh= async ()=>{
    console.log('refresh')
    //alert('refresh')
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
      //
      stateFromHome: null,
      //login user info
      user: null,
      //table
      tableData: null,
      dataArray: [
        { title: "Start", content: "" },
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
    //home
    const stateFromHome = await AsyncStorage.getItem('stateFromHome');

    this.setState({
      stateFromHome: stateFromHome,
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
    this.setState({
      isLoading: true,
    });
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

    //re-get table 

    data= await this.get();
    console.warn(data);
    this.data2table(data);

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  confirm_button(){
    if(this.state.action==0){
        alert("Please select action");
        return;
    }

    //this.post();

    Alert.alert(
        'Are You Sure?',
        this.state.qrcode,
        [
           {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
           {text: 'OK', onPress: () => this.post() },

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
    if(item.title== "Start"){
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
    action_= modules.action_

    if(item.title== "Start"){
      //refresh
      this.state.qrcode= "";

      const mechanician= ()=>{ 
        if(this.state.stateFromHome=="Mechanician"){
           return true; 
        }
      }

      const delivery= ()=>{ 
        if(this.state.stateFromHome=="Send and Pick Bike"){
           return true; 
        }
      }

      const count= ()=>{ 
        if(this.state.stateFromHome=="Count Accessories"){
           return true; 
        }
      }
        
      return (
        <Content style={styles.content1}>
          {
            <Picker 
              selectedValue = {this.state.action} 
              onValueChange = { (value) => this.setState({ action: value }) }>
              <Picker.Item label = "Please select action" value = "0" /> 

              { mechanician() ? <Picker.Item label = { action_[action['start_fix']]} value = {action['start_fix']}  />  : null }
              { mechanician() ? <Picker.Item label = { action_[action['finish_fix']]} value = {action['finish_fix']} />  : null }

              { delivery() ?<Picker.Item label = { action_[action['pick']]} value = {action['pick']} /> : null }
              { delivery() ?<Picker.Item label = { action_[action['send']]} value = {action['send']} /> : null }

              { count() ?<Picker.Item label = { action_[action['add_count']]} value = {action['add_count']} /> : null }
              { count() ?<Picker.Item label = { action_[action['reduce_count']]} value = {action['reduce_count']} /> : null }
            </Picker> 
          }
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

      const count= ()=>{
        if(this.state.stateFromHome=="Count Accessories" ){
          return(
            <View>
            { <Picker 
              selectedValue = {this.state.category} 
              onValueChange = { (value) => this.setState({ category: value }) }>
                  <Picker.Item label = "Select stuff" value = "0" />

                  <Picker.Item label = "Bike" value = {modules.category["Bike"]} />
                  <Picker.Item label = "Hemlets" value = {modules.category["Hemlets"]} />
                  <Picker.Item label = "Locks" value = {modules.category["Locks"]} />

            </Picker>  }

              <TextInput 
                value={this.state.color}
                onChangeText = {  (value) => this.setState({ color: value }) }

                style = {styles.input_color}
                placeholder = "color"
                autoCapitalize = "none"
              />

              <TextInput 
                value={this.state.size}
                onChangeText = {  (value) => this.setState({ size: value }) }

                style = {styles.input_size}
                placeholder = "size"
                autoCapitalize = "none"
              />
              
              <TextInput 
                value={this.state.qty}
                onChangeText = {  (value) => this.setState({ qty: value }) }

                style = {styles.input_qty}
                placeholder = "qty"
                autoCapitalize = "none"
              />
            </View> 
          )
        }
      }

      const comment= ()=>{
        if(this.state.stateFromHome=="Mechanician" || this.state.stateFromHome=="Send and Pick Bike" ){
          return(
            <View>
              <TextInput 
                value={this.state.comment}
                onChangeText = {  (value) => this.setState({ comment: value }) }

                style = {styles.input_comment}
                placeholder = "comment"
                autoCapitalize = "none"
              />
            </View> 
          )
        }
      }
      return (
        <Content style={styles.content1}>
          {count()}
          {comment()}

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
           
          <Text   style={styles.user}>
            {this.state.user.first_name} {this.state.user.last_name} {'    '} {this.state.user.email}
            {'                                                                                                       '}{this.state.stateFromHome} 
          </Text> 
          <Content padder>
            <View style={styles.container}>

              <Accordion
                dataArray={this.state.dataArray}
                animation={true}
                //expanded={true}

                //headerStyle={{ backgroundColor: "#b7daf8" }}
                //contentStyle={{ backgroundColor: "#ddecf8" }}

                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />

            </View>


        </Content>

          <Footer>
            <View >

              <View style={{
                flexDirection: "row",
                padding: 15,
                justifyContent: "space-between",
                alignItems: "left" ,
                //backgroundColor: "#8dc63f" 
                }}>
                
                  <Text style = {styles.footerText}> Action: </Text>
                  <Text style = {styles.footerInput}> { modules.action_[this.state.action]}     </Text>
                  <Text style = {styles.footerText}> Qrcode: </Text>
                  <Text style = {styles.footerInput}> {this.state.qrcode}</Text>
                  <Text style = {styles.footerText}> Category: </Text>
                  <Text style = {styles.footerInput}> { modules.category_(this.state.category) }     </Text>

              </View>

              {/* <View >
                <Text >  </Text>
              </View> */}

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
