const YOUR_TOKEN=sessionStorage.getItem("tokenId")
export const OrgUpdate = function(id,body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/`+id, {
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

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization`, {
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

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgFacilityDelete = function(id){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgAdminUserGetAll=function(practionerid){

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/user/`+practionerid, {
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

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/user/`+practionerid, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const OrgAdminuserAdd = function(body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/user`, {
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

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/user/`+practionerid, {
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
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/`+id, {
      method:'GET',
      headers:{
          'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json'
      }
  }).then(res =>res.json()) // if response is json, for text use res.text()
  .then(response => response)// if text, no need for JSON.stringify
  .catch(error => console.error('Error:', error));
}
