const express = require('express');
const bodyParser = require('body-parser').json();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use( bodyParser.json() );       							// to support JSON-encoded bodies
app.use(express.static(HealthInsuranceRiskCalculatorClient + '/static'));
app.use(cors());


app.get('/api/ping', (req, res)=>{
	console.log("reached server")
	response.type("text/plain");
	response.send("Ping succeeded!");
});

// calculates risk points from age
app.post('/api/calc-age', bodyParser, (req, res) => {
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
  	res.send(output);
});

// calculates risk points from bmi
app.post('/api/calc-bmi', bodyParser, (req, res) => {
	var output = {};
	var heightFeet = req.body.heightFeet;
	var heightInches = req.body.heightInches;
	var weightPounds = req.body.weight;

	heightMeters = ((heightFeet * 12) + (heightInches)) * 0.0254;
	weightKG = weightPounds * 0.45349237

	bmi = weightKG / (heightMeters * heightMeters);

	if (bmi >= 18.5 && bmi < 25) {
		output.category = "Normal";			// TODO: change format
		output.points = 0;
	} else if (bmi < 30) {
		output.category = "Overweight";
		output.points = 30;
	} else {
		output.category = "Other";
		output.points = 75;
	}

	res.type("application/json");
	//res.send(category);
	res.send(output);
});

// calculates risk points from blood pressure
app.post('/api/calc-blood-pressure', bodyParser, (req, res) => {
	// TODO, returns risk points and category names based on diastolic and systolic BP

	res.type("application/json");
	res.send("") // TODO: replace with category 
	res.send(0) // TODO: replace with risk points
});

// calculates risk points from family history of specified diseases
app.post('/api/calc-family-history'. bodyParser, (req, res) => {
	//TODO, returns risk points based on existence of certains diseases in your family

	res.type("application/json");
	res.send(0) // TODO: replace with risk points
});

app.post('/api/calc-total-risk', bodyParser, (req, res) => {
	var total = {};

  	total.points = request.body.age + request.body.bmi;

  if (total.points <= 20) {
    total.risk = "Low Risk";
  } else if (total.points <= 50) {
    total.risk = "Moderate Risk";
  } else if (total.points <= 75) {
    total.risk = "High Risk";
  } else {
    total.risk = "Uninsurable";
  }

  response.type("application/json");
  response.send(total);
});

// Custom 404 page
app.use((req, res) => {
	res.type('text/plain')
	res.status(404)
	res.send('Not Found')
});

// Custom 500 page
app.use(function (error, req, res, next) {
	console.error(err.message)
	res.type('text/plain')
	res.status(500)
	res.send('Server Error')
});


//Start your server on a specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
