const YOUR_TOKEN=sessionStorage.getItem("tokenId")
export const AddModusadmin = function(body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/systemadmin`, {
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

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/systemadmin/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}

export const ModusadminTableGet=function(){

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/systemadmins`, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));

}
