const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/Routes/authRoutes');
const userRoutes = require('./src/Routes/userRoutes');
const agencyRoutes = require('./src/Routes/agencyRoutes');



const app = express()

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database conneted successfully ");
}).catch((error) => {
    console.log(error);
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth/', authRoutes)
app.use('/api/user/', userRoutes)
app.use('/api/agency/', agencyRoutes)



app.get('/', (req, res) => {
    return res.send("Wellcome to my TravelApp")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:2003");
})