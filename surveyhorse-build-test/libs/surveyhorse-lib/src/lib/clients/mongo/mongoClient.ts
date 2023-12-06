
import mongoose from 'mongoose';

export const connect = async (): Promise<typeof mongoose> => {
    const connectionString = process.env['MONGODB_CONNECTION_STRING'];
    console.log(connectionString);
    if(!connectionString){
        throw "400";
    }
    return mongoose.connect(connectionString);
}