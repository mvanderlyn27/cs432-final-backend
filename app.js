const MongoClient = require('mongodb').MongoClient;
const express = require('express');
var cors = require('cors');
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json())

/* REST API Section */
app.get('/', (req, res) => {
    return res.send("you got it!");
});
//gets all form data
app.get('/getData', (req, res) => {
    console.log(req.body);
    this.loadData().then(data=> res.send(data));
});
//saves 1 form entry to entries
app.post('/saveData', (req, res) => {
    console.log(req.body);
    this.saveData(req.body).then(data=> res.send(data));
});
//clears form data
app.post('/removeData', (req, res) => {
    this.removeData().then(data=> res.send(data));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});





/* DB FUNCTIONS */
//connects to the mongodb
async function connect() {
    const uri = "mongodb+srv://root:strongpassword@im-backend-rkump.mongodb.net/test?retryWrites=true&w=majority";
    client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const db = client.db("swe432-final-db");

        return db, client;
    } catch (e) {
        console.error(e);
        return null;
    }
}
connect().catch(console.error);

//uploads one entry to entries collection in mongodb
async function saveData(client, data) {
    var db, client = connect();
    if (db != null) {
        db.collection('entries').insertOne({
            data
        }).then(async function (result) {
            await client.close();
            return (result);
        })
    }
}
//loads all data from entries collection, could be made to search for specific strings
async function loadData(client, data) {
    var db, client = connect();

    if (db != null) {
        var cursor = db.collection('entries').find({});
        await client.close();
        return cursor;
    }
}
//removes all entries, could be used to remove certain ones later
async function removeData(client, data) {
    var db, client = connect();
    if (db != null) {
        db.collection('entries').remove({});
        await client.close();
    }
}