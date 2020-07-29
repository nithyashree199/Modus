const YOUR_TOKEN='Bearer ya29.a0AfH6SMDNHBq3L0C2avOV9C1NIJaTasx6y4E6-qbnnQOXH1hiivvUbEszo6Yco61yx0tmMj32D87TviadnecG2rlbZNmqhqNBWDRujocgl1Im9Q45dG46Wm8fgw3IIv7D8Yhat4S2jUQpXCnR0uqZWvN87a-q9Gt1nDI';

export const OrgUpdate = function(id,body){

  return fetch(`/rest/organization/`+id, {
    method: 'PUT',

    headers:{
      'Authorization': YOUR_TOKEN,
      'Content-Type': 'application/json',

    },
    body:JSON.stringify(body)
  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response => {return response})

  .catch(error => console.error('Error:', error));
}
export const OrgAdd = function(body){

  return fetch(`/rest/organization`, {
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
export const OrgDelete = function(id){

  return fetch(`/rest/organization/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgFacilityDelete = function(id){

  return fetch(`/rest/facility/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgAdminUserGetAll=function(practionerid){

  var abc;
  console.log(practionerid)
  return fetch(`/rest/organization/user/`+practionerid, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response =>{ return(response)})

    .catch(error => console.error('Error:', error));

}
export const OrgAdminuserDelete = function(practionerid){

  return fetch(`/rest/organization/user/`+practionerid, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgAdminuserAdd = function(body){

  return fetch(`/rest/organization/user`, {
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

export const OrgAdminuserUpdate = function(practionerid,body){

  return fetch(`/rest/organization/user/`+practionerid, {
    method: 'PUT',
    headers:{
      'Authorization': YOUR_TOKEN,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(body),

  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response => {return response})

  .catch(error => console.error('Error:', error));
}
export const OrgFacilityGetAll=function(id) {
  return fetch(`/rest/facility/`+id, {
      method:'GET',
      headers:{
          'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json'
      }
  }).then(res =>res.json()) // if response is json, for text use res.text()
  .then(response => response)// if text, no need for JSON.stringify
  .catch(error => console.error('Error:', error));
}
