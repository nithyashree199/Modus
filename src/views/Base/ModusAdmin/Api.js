const YOUR_TOKEN='Bearer ya29.a0AfH6SMDNHBq3L0C2avOV9C1NIJaTasx6y4E6-qbnnQOXH1hiivvUbEszo6Yco61yx0tmMj32D87TviadnecG2rlbZNmqhqNBWDRujocgl1Im9Q45dG46Wm8fgw3IIv7D8Yhat4S2jUQpXCnR0uqZWvN87a-q9Gt1nDI';

export const AddModusadmin = function(body){

  return fetch(`/rest/systemadmin`, {
    method: 'POST',
    headers:{
      'Authorization': YOUR_TOKEN,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(body),

  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response => {return response})

  .catch(error => console.error('Error:', error));
}

export const DeleteModusadmin = function(id){

  return fetch(`/rest/systemadmin/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}

export const ModusadminTableGet=function(){

  var abc;
  return fetch(`/rest/systemadmins`, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));

}
