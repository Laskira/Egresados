import {connect} from 'mongoose'

export async function databaseConnection() {
    const database = await connect('mongodb://localhost/Egresados',{
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('Mongodb Connection running');
}
