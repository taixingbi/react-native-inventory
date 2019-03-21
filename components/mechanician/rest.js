import axios from 'axios';

export const  post=  async (headers, data) => {
    console.warn("confirm buton was pressed");
    //------------------------REST-------------------------
    let url= 'https://nvp.bikerent.nyc/api/mechanician/post';

    console.log('post headers:', headers);
    console.log('post data:', data);

    await axios({
        method: 'post',
        url: url,  
        data: data,      
        headers: headers,
        }).then(function (response) {
          alert("Post Successfully");
          console.log(response.data);
        }).catch(function (e) {
          console.log(e);
        });
      
    console.warn("post table mechanician successfully");
    return;
}

export const get= async (headers, email) => {//post
    let url= 'https://nvp.bikerent.nyc/api/mechanician/get/taixingbi@gmail.com';
    
    let data= {
        email: email,
    }

    let response = await axios({
      method: 'post',
      url: url,    
      data: data,          
      headers: headers
    }).catch(function (e) {
      console.log(e);
    });
    
    return response.data.mechanicians;
  }
