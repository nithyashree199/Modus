import React from "react";



const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("./config");
const url = require("url");
const containerId = config.container.id
const endpoint = config.endpoint;
const key = config.key;

const databaseId = config.database.id;
//const containerId = config.container.id;
//const partitionKey = { kind: "Hash", paths: ["/category"] };

const client = new CosmosClient({ endpoint, key, connectionPolicy: {
  enableEndpointDiscovery: false
} });
/*class Cosmosconnection extends Component{
    constructor(props){
      super(props);

      this.queryItems = this.queryItems.bind(this);
    }

    async queryItems() {
    const querySpec = {
      query: 'SELECT *  from c',
     
    }
    console.log(`Querying container:\n${config.container.id}`);
   const { resources: results } = await client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll();
    for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult);
      console.log(`\tQuery returned ${resultString}\n`);
      
  
    }
     return(results) 
  }
  render(){
    return(
      this.queryItems().then(() => {
        console.log(`Completed successfully`)
      })
      .catch(error => {
        console.log(`Completed with error ${JSON.stringify(error)}`)
      })
      
    )
    }

  
}
*/
 export const queryItems =async function (dynamic) {
  let abc=[],k=[];
  var querySpec;
if(dynamic){
  querySpec = dynamic 
}
else{
   querySpec = 'SELECT * from c WHERE  c.category="orgPayer"'
}
  console.log(`Querying container:\n${config.container.id}`);
 const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();
  for (var queryResult of results) {
    k.push(queryResult);
  }
  abc=k;
  console.log(abc);
  return abc;

}



export async function createItem(itemBody) {
  const { item } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(itemBody);
  //console.log(`Created item with id:\n${itemBody}\n`);
 /* const isconfirmed =alert("successfully added");
  if(isconfirmed){
    window.location.reload();
  }
  */
 if(!alert('Successful Message')){
  window.location.reload();  
}
}

export async function updateItem(itemBody) {
  
   console.log(`Replacing item:\n${itemBody.id}\n`)
    // Change property 'grade'
    //itemBody.children[0].grade = 6
    const { item } = await client
      .database(databaseId)
      .container(containerId)
      .item(itemBody.id)
      .replace(itemBody)

      console.log("updated succesfully")
      console.log(item)
  }

  async function deleteItem(itemBody,containerId) {
    await client
      .database(databaseId)
      .container(containerId)
      .item(itemBody.id, itemBody.Country)
      .delete(itemBody)
    console.log(`Deleted item:\n${itemBody.id}\n`)
  }

 /* queryItems()
 // .then(() => createFamilyItem(config.items.Andersen))
  //.then(() => createFamilyItem(config.items.Wakefield))
 // .then(() => queryContainer())
 // .then(() => replaceFamilyItem(config.items.Andersen))
  //.then(() => queryContainer())
 // .then(() => deleteFamilyItem(config.items.Andersen))
 
 .then(() => {
   exit(`Completed successfully`)
 })
 .catch(error => {
   exit(`Completed with error ${JSON.stringify(error)}`)
 })
 */
