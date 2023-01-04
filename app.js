// IMPORTS
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;


// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));  // for serving File using url: /static
app.use(express.urlencoded());


// PUB SPECIFIC CONFIGURATION
app.set('view engine', 'pug');  // set templete engine for pug
app.set('views',path.join(__dirname, 'views')); // set viwes as directory 


// ENDPOINTS
app.get('/',(req,res)=>{
    const  params = { };
    res.status(200).render('Home.pug',params);
});

app.get('/contact',(req,res)=>{
    const  params = { };
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let address = req.body.address;
    let out = `name:${name}  age:${age}  gender:${gender}  address:${address} | `;
    console.log(req.body);
    params = { };
    fs.writeFileSync('output.txt',out);
    res.status(200).render('contact.pug',params);
});


// START THE SERVER
app.listen(port,()=>{
    console.log(`app started successfully on http://localhost:${port}`);
});


// app.post('/',(req,res)=>{
//     let name = req.body.name;
//     let age = req.body.age;
//     let gender = req.body.gender;
//     let address = req.body.address;
//     let more = req.body.more;
    
//     const output = `name:${name}, age:${age}, gender:${gender}, address:${address}, more:${more}     `;
//     fs.appendFileSync('output.txt',output);
    
//     const  params = {'message':'Your Form Is Sucessfully submitted'};
//     res.status(200).render('index.pug',params);
// })