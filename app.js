const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const infoSchema = require('./models/info');
const info = require('./models/info')
const csv = require('csvtojson')
const app = express();

app.use(cors())
app.listen(3001);
app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs');


//Insert your database Connection string in to the url below
//for example * const url = mongodb:localhost:8089
const url = `mongodb+srv://honymissy:honymissy@cluster0.q6yjv.mongodb.net/Data?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//Set up you database and create a collection

//Test you connection with the endpoint below
//Make sure your server is running at the back end
//Go to you browser and enter the url  -> localhost:3001/test

//Check you database for the collection......
//if the collection contains {name: orlando, age: 99}
//Then database setup is successful, you can proceed to the next step

app.get('/test', (req,res) =>{
   const information = new info({
       name: 'Olando',
       age: 99
   })

    information.save().then(response =>{
      res.render('csv', {data: 'ok'})
    }).catch(err =>{
      console.log('cant save you',err);
    })    
});
//Make sure the name of your collection is the same as the model name e.g csvdata
// Open your browser and type in the url localhost:3001/csv
//Wait for the files to convert and save to your database 
// After it logs saved to the console check your database the data is their already

app.get('/csv', async (req, res)=>{
res.render('csv', {data: 'Saving converted file to database, please wait...'})

csv().fromFile('./companies.csv')
.then((convertedResponse) =>{ 
  console.log(convertedResponse);
  convertedResponse.forEach(csv => {

    console.log(csv);
   const data = new infoSchema({
                uniqueId: csv.uniqueId,
                name: csv.name,
                industry: csv.industry,
                subindustry: csv.subindustry,
                address: csv.address,
                street: csv.street,
                house_nr: csv.house_nr,
                postalcode: csv.postalcode,
                city: csv.city,
                state: csv.state,
                country: csv.country,
                phone: csv.phone,
                skype: csv.skype,
                url: csv.url,
                logo: csv.logo,
                email:csv.email
               })

               data.save().then(data =>{
                 console.log(data);
               }).catch(err =>{
                 console.log('not saved',err);
               })
      }) 
  }) 

  console.log('Saved......');
})


