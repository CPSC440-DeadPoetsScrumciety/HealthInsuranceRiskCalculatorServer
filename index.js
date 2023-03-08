const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000;


app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(cors())


app.get('/', (req, res)=>{
console.log("reached server")
})



//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})