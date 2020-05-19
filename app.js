const express = require('express');
var cors = require('cors');
const port = process.env.PORT || 8080;
const replace_dict = [{
    "op": "&",
    "pred": ["and", "&&"]
}, {
    "op": "|",
    "pred": ["or", "||"]
}, {
    "op": "~",
    "pred": ["not", "!"]
},
{
    "op": "^",
    "pred": ["xor"]
}];
const ops = ["&", "|", "!"]
const app = express();
app.use(cors());
app.use(express.json())

/* REST API Section */
app.get('/', (req, res) => {
    return res.send("you got it!");
});
//generates truth table from input
app.post('/getTruthTable', (req, res) => {
    let pred = req.body.pred;
    let clean_pred = clean(pred);
    let ar = clean_pred.split(" ");
    let clause_indeces = [];
    let log_op_indeces = [];
    ar.forEach((val, i) => {
        if (!ops.includes(val)) {
            clause_indeces.push(i);
        } else {
            log_op_indeces.push(i);
        }
    });
    let truth_vals = buildTruthVals(clause_indeces,ar);
    console.log(truth_vals);
    res.send({exp:clean_pred, data: truth_vals});
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

function clean(pred) {
    pred = pred.toLowerCase();
    pred = pred.split(' ').join('');
    replace_dict.forEach(check => {
        let op1 = check['op'];
        let ops = check['pred'];
        //console.log(op1,ops)
        ops.forEach(op2 => {
            pred = pred.replace(op2,op1);
        })
        console.log(pred,op1);
        if(pred.includes(op1)){
        pred = pred.replace(new RegExp("\\"+op1,"g"), " "+op1+" ");
        }
        console.log(pred)

    });
    return pred;
}

//builds truth table for clause list
function buildTruthVals(arr,orig) {
    let ret_ar = [arr.map(ind=>orig[ind])];
    for (let i = 0; i < Math.pow(2, arr.length); i++) {
        ret_ar.push(dec2binarray(i,arr.length));
    }
    return ret_ar;
}
//Converts number into decimal representation of length size
function dec2binarray(dec,length) {
     let ret_ar = ((dec >>> 0).toString(2)).split('').map(x => +x);
     while(ret_ar.length < length){
         ret_ar.unshift(0);
     }
     return ret_ar;
}