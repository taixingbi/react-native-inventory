
import axios from 'axios';

export const  post_login=  async (email, password) => {
    let url= 'https://nvp.bikerent.nyc/api/inventory_logi';
    let data= {
      email: email,
      password: password
    }

    console.log("login api url: ", url)
    console.log("data: ", data)

    let response = await axios({
      method: 'post',
      url: url,        
      data: data
    }).catch(function (e) {
      if (e.response) {
        alert(url + e);
        console.warn(e);
      }
      if(e.response.status==401){
        alert('username and password do not match');
        return;
      }
    });

    const access_token= response.data['data']['access_token'];
    console.log("access_token: ", access_token);
    if (access_token === undefined){
        return 
      }
    return access_token;
}

 //get user info
 export const  post_user=  async (email, access_token) => {
    const headers= {"Authorization" : "Bearer " + access_token };
    let url= 'https://nvp.bikerent.nyc/api/mechanician/get/users/email';
    let data= {
      email: email,
    }

    console.log("user api url: ", url)
    console.log("data: ", data)

    let response = await axios({
      method: 'post',
      url: url,        
      data: data,
      headers: headers,
    }).catch(function (e) {
      if (e.response) {
        console.log(e);
      }    
    });

    return response.data['users'];
  }