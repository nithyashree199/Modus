const YOUR_TOKEN=sessionStorage.getItem("tokenId")

 export const GetOrg = function()  {

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organizations`, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(response => {return response})

    .catch(error => console.error('Error:', error));

    //import axios from 'axios'

    //const instance = axios.create({baseURL: '<api-url>'});

   // instance.get('//fdjslk')

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

export const GetSingleOrg=function(id){

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/`+id, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response => {return response})

    .catch(error => console.error('Error:', error));

}
export const OrgFacilityGet=function(orgid){

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/facilities/`+orgid, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response =>{ return(response)})

    .catch(error => console.error('Error:', error));

}
export const OrgAdminuserGet=function(orgid){

  var abc;
  return fetch(`https://modus-services-testing.azurewebsites.net/rest/organization/users/`+orgid, {
      method: 'GET',

      headers:{
        'Authorization': YOUR_TOKEN,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()) // if response is json, for text use res.text()
    .then(response =>{ return(response)})

    .catch(error => console.error('Error:', error));

}
