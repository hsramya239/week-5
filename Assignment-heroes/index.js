const express = require('express');
const config=require("./config.json");
const app = express();
const fs = require('fs');

app.set('view engine'); 
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('home.ejs', { title: '', firstName: '', lastName: '', power: '', city: '' });
});

app.post('/add-hero', (req, res) => {
  const { title, firstName, lastName, power, city } = req.body;

  // Load existing hero data from the JSON file
  let heroes = [];
  try {
    const heroesData = fs.readFileSync('heroes.json', 'utf-8');
    heroes = JSON.parse(heroesData);
  } catch (err) {
    console.error(err);
  }

  // Add the new hero to the array
  heroes.push({ title, firstName, lastName, power, city });

  // Write the updated hero data back to the JSON file
  fs.writeFileSync('heroes.json', JSON.stringify(heroes, null, 2));

  res.redirect('/');
});

// Start the server
app.listen(config.port,config.host,error=>{
  error
  ? console.log("Error",error)
  : console.log(`server is now live on ${config.host} and ${config.port}`)
})
