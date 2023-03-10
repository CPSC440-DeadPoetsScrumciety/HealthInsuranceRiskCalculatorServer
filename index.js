const express = require('express');
const bodyParser = require('body-parser').json();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(cors());


app.get('/ping', (req, res)=>{
console.log("reached server")
response.type("text/plain");
response.send("Ping succeeded!");
});

// calculates risk points from age
app.post('/calc-age', bodyParser, (req, res) => {
	// TODO, returns risk points based on age range
	var output = {points: 0};
  	age = req.body.age;
	
	if (age < 30) {
		output.points = 0;
	} else if (age < 45) {
		output.points = 10;
	} else if (age < 60) {
		output.points = 20;
	} else {
		output.points = 30;
	}

  	res.type("application/json");
  	res.send(JSON.stringify(output));
});

// calculates risk points from bmi
app.post('/calc-bmi', bodyParser, (req, res) => {
	var heightFeet = req.body.heightFeet;
	var heightInches = req.body.heightInches;
	var weightPounds = req.body.weight;

	heightMeters = ((heightFeet * 12) + (heightInches)) * 0.0254;
	weightKG = weightPounds * 0.45349237

	bmi = weightKG / (heightMeters * heightMeters);

	if (bmi >= 18.5 && bmi < 25) {
		cateogry = "Normal";
		points = 0;
	} else if (bmi < 30) {
		category = "Overweight";
		points = 30;
	} else {
		cateogry = "Other";
		points = 75;
	}

	res.type("application/json");
	res.send(category);
	res.send(points);
});

// calculates risk points from blood pressure
app.post('calc-blood-pressure', bodyParser, (req, res) => {
	// TODO, returns risk points and category names based on diastolic and systolic BP

	res.type("application/json");
	res.send("") // TODO: replace with category 
	res.send(0) // TODO: replace with risk points
});

// calculates risk points from family history of specified diseases
app.post('calc-family-history'. bodyParser, (req, res) => {
	//TODO, returns risk points based on existence of certains diseases in your family

	res.type("application/json");
	res.send(0) // TODO: replace with risk points
});

app.post('calc-total-risk', bodyParser, (req, res) => {
	// TODO, returns the sum of all the above calculated risk points

	res.type("application/json");
	res.send("") // TODO: replace with risk category
	res.send(0) // TODO: replace with risk points
});


// Custom 404 page
app.use((req, res) => {
	// TODO
});

// Custom 500 page
app.use(function (error, req, res, next) {
	// TODO
});


//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});