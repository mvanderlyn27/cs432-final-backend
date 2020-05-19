const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
/* REST API Section */
app.get('/', (req,res) =>{
    return res.send("you got it!");
});
app.get('/getData', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/saveData', (req, res) => {
    return res.send('Received a POST HTTP method');
});
app.post('/removeData', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.listen(process.env.PORT || 8080, () =>{
    connect_and_list();
    console.log(`Example app listening on port ${port}!`);},
);





/* DB FUNCTIONS */
async function connect(){
   
    const uri = "mongodb+srv://root:strongpassword@im-backend-rkump.mongodb.net/test?retryWrites=true&w=majority";
    client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        return client;
    } catch (e) {
        console.error(e);
        return null;
    }
}
connect().catch(console.error);

async function connect_and_list(){
    var client = await connect();
    listDatabases(client);
    await client.close();
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function saveData(client, data){
client = connect();
if(client != null){

    await client.close();
}

}
async function loadData(client, data){
    client = connect();

    if(client != null){

        await client.close();
    }
}
async function removeData(client, data){
    client = connect();
    if(client != null){

        await client.close();
    }
}