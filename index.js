const express = require( 'express')
const dotenv = require( 'dotenv')
const authRoute = require( './routes/auth.js')
// const usersRoute = require( './routes/users.js')
const projectsRoute = require( './routes/projects.js')
const categoriesRoute = require( './routes/categories.js')
const servicesRoute = require( './routes/services.js')
const jobsRoute = require( './routes/jobs.js')

const connectDb = require( './db/connect.js')
const cookieParser = require( 'cookie-parser')
const multer = require('multer')
const cors = require('cors')
const path = require( 'path')
const { S3Client } = require('@aws-sdk/client-s3');

const { fromIni } = require('@aws-sdk/credential-provider-ini');

dotenv.config()
const app = express()

// Initialize S3 client
const s3Client = new S3Client({
    credentials: fromIni({ profile: 'Abdulhayy' }), // Use the AWS profile with the necessary permissions
    region: 'ap-south-1' // Replace 'your-region' with the AWS region where your bucket is located
});


const connection = async() => {
    try {
        await connectDb(process.env.MONGO_URL)
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
    }
}

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/test', async(req, res)=>{
    res.json('Its working')
})

//route middlewares
app.use('/api/auth', authRoute)
app.use('/api/projects', projectsRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/services', servicesRoute)
app.use('/api/jobs', jobsRoute)


const port = process.env.PORT || 2000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connection()
})