import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import { keys } from './config/keys';

import {router as routes} from './routes';

const app = express();

// apply middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// set up session middleware
const sessionMiddleWare = session({
    secret: keys.app.secretKey ?? "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
})

// apply routers
app.use(routes);

//apply middlewares for authentication
app.use(sessionMiddleWare);

export default app;