const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000


app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
 
app.use(cors())


app.get('/', (req, res)=>{
res.send("Welcome to your server")
})


// below function adapted from epogue's github:
// Template for calculating BMI using height in feet/inches and weight in pounds.
app.get('/calculate-bmi', (req, res) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	var totalInches = heightInches + (12 * heightFeet)
	var heightMeters = heightInches * 0.0254

	// TODO: convert weight into kilograms *******
	var weightKG = 1 // TODO: delete, this is a temp placeholder for bmi function *******

	var bmi = weightKG / (heightMeters * heightMeters)

	console.log(bmi)
	res.send(bmi)
})


//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})