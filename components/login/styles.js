import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', 
  },

  container1: { 
    flex: 1,
    height: 200,//200
    //justifyContent: 'space-around',
    backgroundColor: '#69bfb4', //'#7a42f4'
  },

  container2: { 
    height: 500,//500
    //justifyContent: 'space-around',

  },

  login: {
    //color: '#69bfb4',
    marginLeft: 375,//370
    marginTop: 150,
    marginBottom: 15,
    color: 'white',
  },

  input: {
    margin: 100,
    marginTop: 15,
    marginBottom: 15,

    height: 40,
    borderColor: '#69bfb4', //'#7a42f4'
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white', //'#7a42f4'
  },

  submitButton: {
    margin: 300,//300
    marginTop: 15,
    marginBottom: 200,
    borderColor: 'white', //'#7a42f4'
    borderWidth: 1,

    backgroundColor: '#69bfb4', //'#7a42f4'
    padding: 10,
    height: 40,
    borderRadius: 12,
  },

  submitButtonText:{
    textAlign: 'center',
    color: 'white',
  },

  logo:{
    margin: 250,
    marginTop: 50,
  },
  
  facebook:{
    margin: 300,
    marginTop: 100,
    marginBottom: 15,

    backgroundColor: '#3b5998', //'#7a42f4'
    padding: 10,
    height: 40,
    borderRadius: 12,
  },

  facebookText:{
    textAlign: 'center',
    color: 'white',
  },

  google:{
    margin: 300,
    marginTop: 15,
    marginBottom: 15,

    backgroundColor: '#7a42f4', //'#7a42f4'
    padding: 10,
    height: 40,
    borderRadius: 12,
  },

  googleText:{
    textAlign: 'center',
    color: 'white',
  },

  signup: {
    color: '#69bfb4',
    marginLeft: 370,//370
    marginTop: 15,
    marginBottom: 15,
    
    borderColor: 'white', //'#7a42f4'
    borderWidth: 1,
  },

})
