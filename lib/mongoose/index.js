import mongoose from 'mongoose';


const MONGODB_URI = process.env.NEXT_APP_MONGODB_URI

const connection = {} /* creating connection object*/

async function connectMongo() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  mongoose.set('strictQuery', false)
  const db = await mongoose.connect(MONGODB_URI)
  connection.isConnected = db.connections[0].readyState
}


export default connectMongo;