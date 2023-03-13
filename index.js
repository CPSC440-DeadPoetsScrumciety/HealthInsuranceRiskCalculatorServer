const express = require('express');
const bodyParser = require('body-parser').json();
const cors = require("cors");

var router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
   	origin: "https://dps-insuranceriskcalculator.azurewebsites.net"
}));


app.get('/', (req, res) => {
	res.type('text/html')
	res.send('Health Insurance Risk Calculator API')
});

app.get('/api/ping', bodyParser, (req, res) => {
	console.log("Ping recieved");
	res.type("text/html");
	res.send("Ping received!");
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
/*
// calculates risk points from bmi
app.post('/api/calc-bmi', bodyParser, (req, res) => {
	var output = {"points": 0, "category": ""};
	var heightFeet = req.body.heightFeet;
	var heightInches = req.body.heightInches;
	var weightPounds = req.body.weight;

	heightMeters = ((heightFeet * 12) + (heightInches)) * 0.0254;
	weightKG = weightPounds * 0.45349237

	bmi = weightKG / (heightMeters * heightMeters);

	if (bmi >= 18.5 && bmi < 25) {
		output.category = "Normal";			
		output.points = 0;
	} else if (bmi < 30) {
		output.category = "Overweight";
		output.points = 30;
	} else {
		output.category = "Other";
		output.points = 75;
	}

	res.type("application/json");
	res.send(output);
});

// calculates risk points from blood pressure
app.post('/api/calc-blood-pressure', bodyParser, (req, res) => {
	// TODO, returns risk points and category names based on diastolic and systolic BP

	res.type("application/json");
	res.send("0") // TODO: replace with risk points
});

// calculates risk points from family history of specified diseases
app.post('/api/calc-family-history'. bodyParser, (req, res) => {
	var output = {points: 0};
	diabetes = req.body.diabetes;
	cancer = req.body.cancer;
	alzheimers = req.body.alzheimers

	if (cancer) output.points += 10;
	if (daiabetes) output.points += 10;
	if (alzheimers) output.point += 10;

	res.type("application/json");
	res.send(output)   
});

app.post('/api/calc-total-risk', bodyParser, (req, res) => {
	var total = {"points": 0, "category": ""};

  	total.points = req.body.age + req.body.bmi;			// TODO: update

  if (total.points <= 20) {
    total.category = "Low Risk";
  } else if (total.points <= 50) {
    total.category = "Moderate Risk";
  } else if (total.points <= 75) {
    total.cateogry = "High Risk";
  } else {
    total.category = "Uninsurable";
  }

  res.type("application/json");
  res.send(total);
});

*/
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
