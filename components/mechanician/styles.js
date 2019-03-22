import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-between', 
  },

  content1: { 
    flexGrow: 1,

    //width:800,
    height: 630,
    //justifyContent: 'space-between', 
  },

  container2: { 
    flex: 1,
    //width:700,
    height: 200,
    //justifyContent: 'space-around',
  },

  container3: { 
    height: 100
  },

  head: { 
    height: 40, 
    backgroundColor: 
    '#f1f8ff' 
  },

  text: { 
    margin: 6 
  },

  line:{
    borderWidth: 1,
    borderColor:'yellow',
    margin:10,
  },

  user: {
    paddingLeft: 0,
    marginTop:5,
    // marginLeft: 400,
    color: '#69bfb4',
  },

  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    //width: 500, 
    height: 500,
    margin: 30,
    marginTop: 15,
    fontSize: 20,

  },  

  table:{
    borderWidth: 2, 
    borderColor: '#c8e1ff'
  },

  ScanButton: {
    //backgroundColor: '#69bfb4',
    borderColor: 'white',
    borderWidth: 15,
    borderRadius: 2,
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    //marginTop: 100,
  },

  imgCamera: {
    margin: 300,
    marginTop: 200,
    //backgroundColor: '#69bfb4',
    padding: 10,
    margin: 15,
    width: 250,
    height: 250,
    borderRadius: 12,   
    alignSelf: 'center', 
  },

  input_comment: {
    margin: 10,
    height: 100,
    borderColor: '#69bfb4',
    borderWidth: 1
 },
 
input_color: {
  margin: 10,
  height: 30,
  borderColor: '#69bfb4',
  borderWidth: 1
},

input_size: {
  margin: 10,
  height: 30,
  borderColor: '#69bfb4',
  borderWidth: 1
 },

 input_qty: {
  margin: 10,
  height: 30,
  borderColor: '#69bfb4',
  borderWidth: 1
 },

 input_num: {
  margin: 10,
  height: 30,
  borderColor: '#69bfb4',
  borderWidth: 1
 },

action: {
  fontSize: 25,
  color: '#69bfb4',
},

submitButton: {
  margin: 300,
  backgroundColor: '#69bfb4',
  padding: 10,
  width: 200,
  margin: 15,
  height: 50,
  borderRadius: 12,   
  alignSelf: 'center', 
},

submitButtonText:{
  alignSelf: 'center',
  height: 40,
  fontSize: 20,
  color: 'white',
},



footerText:{
  color: 'grey',
},

footerInput:{
  color: 'red',
}


})