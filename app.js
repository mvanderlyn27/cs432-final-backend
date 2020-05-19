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
//generates truth table from input
app.post('/getTruthTable', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});





