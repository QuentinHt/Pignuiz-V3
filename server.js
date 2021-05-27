  
/* 
Imports
*/
    // NPM modules
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const cookieParser = require('cookie-parser'); //=> https://www.npmjs.com/package/cookie-parser
    const passport = require('passport'); //=> https://www.npmjs.com/package/passport
    const path = require('path'); //=> https://www.npmjs.com/package/path
    const server = express();
    const app = require('http').Server(server);
    const io = require('socket.io')(app);

    // Services
    const MONGOclass = require('./services/mongo.class');
    const { dirname } = require('path');
    // const { Server } = require("socket.io");
    // const io = new Server(server);  

//

/*
Server class
*/
class ServerClass{
    constructor(){
        this.port = process.env.PORT;
        this.MongoDB = new MONGOclass();
    }

    init(){
        // Set CORS
        server.use( (req, res, next) => {
            // Define allowed origins
            const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
            const origin = req.headers.origin;

            // Setup CORS
            if(allowedOrigins.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', origin)}
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'POST']);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            // Use next() function to continue routing
            next();
        });

        //=> Set server view engine: use EJS (https://ejs.co)
        server.set( 'view engine', 'ejs' );

        //=> Static path configuration: define 'www' folder for backoffice static files
        server.set( 'views', __dirname + '/www' );
        server.use( express.static(path.join(__dirname, 'www')) );

        //=> Set body request with ExpressJS: BodyParser not needed (http://expressjs.com/fr/api.html#express.json)
        server.use(express.json({limit: '20mb'}));
        server.use(express.urlencoded({ extended: true }))

        //=> Set CookieParser to setup serverside cookies
        server.use(cookieParser(process.env.COOKIE_SECRET));

        // Start server configuration
        this.config();
    }

    config(){
        // Set authentication
        const { setAutentication } = require('./services/auth.service');
        setAutentication(passport);

        // Set AUTH router
        const AuthRouterClass = require('./routers/auth.router');
        const authRouter = new AuthRouterClass( { passport } );
        server.use('/auth', authRouter.init());

        // Set API router
        // const ApiRouterClass = require('./routers/api.router');
        // const apiRouter = new ApiRouterClass( { passport } );
        // server.use('/api', apiRouter.init());

        // Set backend router
        const BackendRouterClass = require('./routers/backend.router')
        const backendRouter = new BackendRouterClass( { passport } );
        server.use('/', backendRouter.init());

        // // Set Socket
        // const socket  = require('./services/socket.service');
        // this.server.use(socket)

        // Play
        this.play();

        // Launch server
        this.launch();
    }

    play() {

        // Set all socket functions
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('disconnect', () => {
              console.log('user disconnected');
            });
            socket.on('chat message', (msg) => {
              io.emit('chat message', msg);
            });
            socket.on('displayResult', (response) => {
                io.emit('displayResult', response);
            });
            socket.on('startQuizz', () => {
                io.emit('startQuizz');
            });
            socket.on('startDisplayResponse', () => {
                io.emit('startDisplayResponse');
            });
            socket.on('nextAnswer', () => {
                io.emit('nextAnswer');
            });
            socket.on('connected', (data) => {
                io.emit('connected', data)
            })
            socket.on('showScore', () => {
                io.emit('showScore');
            });
            socket.on('textResponse', (data) => {
                io.emit('textResponse',data);
            });
            socket.on('petitBacResponse', (data) => {
                io.emit('petitBacResponse',data);
            });
            socket.on('validate', () => {
                io.emit('validate');
            });
          });
          io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
          app.listen(3001);

          
    }

    launch(){
        // Start MongoDB connection
        this.MongoDB.connectDb()
        .then( db => {

            // Start server
            server.listen(this.port, () => {
                console.log({
                    node: `http://localhost:${this.port}`,
                    mongo: db.url,
                    socket: `http://localhost:3001`,
                });
            });
        })
        .catch( dbErr => console.log('MongoDB Error', dbErr));
    }
}
//

/* 
Start server
*/
    const NodeApp = new ServerClass();
    NodeApp.init();
//