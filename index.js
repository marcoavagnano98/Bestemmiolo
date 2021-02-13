const { strict } = require('assert');
const express = require('express');
const app = express();
const port =  process.env.PORT || 1337;
const request = require('request');
const https = require('https');
var fs = require("fs");
var text = fs.readFileSync("./banwords.txt");
var banWords = text.toString('utf8').split('\n');
var barray='';
var bsize=0;
var http = require('http');
//var superagent = require('superagent');




//This is isn't declared as `async` because it already returns a promise
async function delay() {
  // `delay` returns a promise
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function() {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, 800);
  });
}

function filterB(entry){
  for(let i=0;i<bsize;i++){
    if (entry.toUpperCase().localeCompare(barray[i].toUpperCase()) == 0){
        barray[i]="BANNABILE";
    }
}
}



 async function getBestemmia(){


  request('http://bestemmie.org/api/random', { json: true }, (err, res, body) => {
  	if (err) { return console.log(err); }
  		barray=(body.bestemmia).split(' ');
  		bsize=barray.length;
	});
  
    

   // The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
 
    
    /*

    */
     await delay();
      banWords.forEach(function(entry) {
        filterB(entry);
       }, this);
       let concatB='';
       for(let i=0;i<bsize;i++){
         let c=' ';
         if(i==(bsize-1)){
            c=''; //avoid space at the end of string
         }
            concatB=concatB.concat(barray[i].concat(c)); //concat final BESTEMMIA(P.D.)
       }
      
       const resp={
           "bestemmia": concatB
       };
       return resp;
}
app.get('/genera', (req,res) =>{
   (async function(){
     let response=await getBestemmia();
     
	res.send(response);
})();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

