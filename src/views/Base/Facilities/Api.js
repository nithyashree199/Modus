const url='https://modus-services-testing.azurewebsites.net/rest/organizations';
const urlforsingleorg='https://modus-services-testing.azurewebsites.net/rest/organization/';
const YOUR_TOKEN=sessionStorage.getItem("tokenId")
const Org_id=sessionStorage.getItem("organizationId");

//const facility_id='810c7470-708d-41e1-814d-2b5800462478';

export const GetFacilities = function()  {

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facilities/`+ Org_id, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));

 /*  const [data, setData] = useState([]);
useEffect(()=>{

axios.get(`/#/base/organisation`).then(res=>res.json)
.then(response=>
  {const data=response.data
  setData(data)})
},[]);

   return(
   <div>{data}</div>
   )
*/
}
export const GetSingleFacility=function(id) {
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
export const UpdateFacility = function(id,body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/`+id, {
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
export const AddFacility = function(body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility`, {
    method: 'POST',

    headers:{
      'Authorization': YOUR_TOKEN,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(body)
  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response => {return response})
  .catch(error => console.error('Error:', error));
}
export const DeleteFacility = function(id){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility`+id, {
    method: 'DELETE',
   headers:{
      'Authorization': YOUR_TOKEN,
    }
  }).then(res=>{return(res)})
  .catch(error => console.error('Error:', error));
}
export const GetFacilityUsers = function(facility_id)  {
  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/users/`+facility_id, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));
  }

export const GetSingleFacilityUser=function(id) {
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/user/`+id, {
      method:'GET',
      headers:{
          'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json'
      }
  }).then(res => res.json()) // if response is json, for text use res.text()
  .then(response =>{return response})// if text, no need for JSON.stringify
  .catch(error => console.error('Error:', error));
}
export const AddFacilityUser = function(body){

  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facility/user`, {
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
