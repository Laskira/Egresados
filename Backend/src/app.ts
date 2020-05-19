import express, {Application} from 'express';
import morgan from  'morgan';
import path from 'path';

const app: Application = express();

//Routes Importation
import Routes from './routes/index'

//Settings
app.set('port', process.env.PORT || 4000) //server port

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('', Routes);

//Carpeta Fotos
app.use('uploads', express.static(path.resolve('uploads')));

export default app;