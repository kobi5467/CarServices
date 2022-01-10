import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import userRoute from './routes/users.js'
import treatmentsRoute from './routes/treatments.js'

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/users', userRoute);    
app.use('/treatments', treatmentsRoute);

// const users_route = require('./routes/users')

// app.route('users', users_route);

app.get('/', (req, res) => {
    res.send("Hello")
})


const port = process.env.PORT || 3000

const username = process.env.MONGO_DB_USER || 'ohkl'
const password = process.env.MONGO_DB_PASSWORD || 'ohkl1234'

const CONNECTION_URL = `mongodb+srv://${username}:${password}@cluster0.btjyq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB succussfully.")
        app.listen(port, () => {
            console.log("listening...  http://localhost:" + port)
        })
    })
    .catch(err => console.log(err));

