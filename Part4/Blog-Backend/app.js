const express = require( 'express' )
const mongoose = require( 'mongoose' )
const logger = require( './utils/logger' )
const blogsRouter = require( './controllers/blogs' )

require( 'dotenv' ).config()

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect( mongoUrl, { family: 4 } )
  .then( () => {
    logger.info( 'connected to MongoDB' )
  } )
  .catch( ( error ) => {
    logger.error( 'error connection to MongoDB:', error.message )
  } )

app.use( express.json() )

app.use( '/api/blogs', blogsRouter )


module.exports = app