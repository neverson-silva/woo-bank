import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!, {})
  .then(() => console.log('Connected to Mongoose'))
