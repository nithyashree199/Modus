const url='https://modus-services-testing.azurewebsites.net/rest/organizations';
const urlforsingleorg='https://modus-services-testing.azurewebsites.net/rest/organization/';
const YOUR_TOKEN=sessionStorage.getItem("tokenId")
const Org_id='470273a9-1f39-475f-87ab-0f1025d0ed23';
const facility_id='810c7470-708d-41e1-814d-2b5800462478';
const org_admin_id='810c7470-708d-41e1-814d-2b5800462478';
export const UpdateFacilityUser = function(id,body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/user/`+id, {
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
export const DeleteFacilityUser = function(id){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/user/`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const GetRoles = function()  {

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/modus/roles`, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));
}
/*export const AddFacilityUser = function(body){

  return fetch(`/rest/facility/user`, {
    method: 'POST',

    headers:{
      'Authorization': YOUR_TOKEN,
      'Content-Type': 'application/json',
    },
    'body':JSON.stringify(body)
  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response => {return response})

  .catch(error => console.error('Error:', error));
}
*/
