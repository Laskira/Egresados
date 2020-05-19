import app from './app';
import { databaseConnection } from './database';

//server inizialition funtion
async function main() {
    databaseConnection();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

//server ejecution
main(); 