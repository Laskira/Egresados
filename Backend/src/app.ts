import express, {Application} from 'express';
import morgan from  'morgan';
import path from 'path';
import cors from 'cors';
var bodyParser = require('body-parser');

const app: Application = express();

//Routes Importation
import Routes from './routes/index'

//Settings
app.set('port', process.env.PORT || 4000) //server port

//Middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('', Routes);

//Carpeta Fotos
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;