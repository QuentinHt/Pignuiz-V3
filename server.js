  
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
        const ApiRouterClass = require('./routers/api.router');
        const apiRouter = new ApiRouterClass( { passport } );
        server.use('/api', apiRouter.init());

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
            socket.on('textResponse', (data) => {
                io.emit('textResponse',data);
            });
            socket.on('petitBacResponse', (data) => {
                io.emit('petitBacResponse',data);
            });
          });
          io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
          app.listen(3001);

          
    }

    // chat() {
    //     server.get('/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
    //         RoomModel.find().then( documents => {
    //             rooms = { };
    //             documents.forEach( room => {
    //                 rooms[room.name] = { _id: room._id, users: {}, owner: room.owner }
    //             })
    //             res.render('index', { rooms: rooms, me: req.user});
    //         });
    //     });

    //     server.post('/room', this.passport.authenticate('jwt', { session: false }), (req, res) => {
    //         if (rooms[req.body.room] != null) {
    //             return res.redirect('/')
    //         }
    //         RoomModel.create({
    //             'name': req.body.room,
    //             'owner': req.user._id,
    //         }).then( document => {
    //             rooms[req.body.room] = { users: {} };
    //             res.redirect(`${document.name}/${document._id}`);
    //             // Envoi un message pour dire que la room à été créée
    //             io.emit('room-created', document.name, document._id)
    //         });
    //     });

    //     server.get('/:room/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
    //         if (rooms[req.params.room] == null) {
    //             return res.redirect('/')
    //         }
    //         MessageModel.find({room: req.params.id}).then(messages => {
    //             res.render('room', { roomName: req.params.room, rooms: rooms, user: req.user, messages: messages })
    //         })
    //     });

    //     server.delete('/:room/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
    //         if (rooms[req.params.room] == null) {
    //             return res.redirect('/')
    //         }
    //         RoomModel.findOneAndDelete({ _id: req.params.id })
    //             .then( deletedDocument => {
    //                 res.status(200).json({
    //                     method: 'DELETE',
    //                     route: `/${req.params.endpoint}/${req.params.id}`,
    //                     data: deletedDocument,
    //                     error: null,
    //                     status: 200
    //                 })
    //             })
    //             .catch( err => res.status(404).json({
    //                 method: 'DELETE',
    //                 route: `/${req.params.endpoint}/${req.params.id}`,
    //                 data: null,
    //                 error: err,
    //                 status: 404
    //             }));
    //     });

    //     app.listen(3000);

    //     io.on('connection', socket => {
    //         socket.on('new-user', (room, name, userId) => {
    //             socket.join(room);
    //             rooms[room].users[socket.id] = name;
    //             socket.to(room).broadcast.emit('user-connected', name, userId)
    //         });
    //         socket.on('send-chat-message', (room, message, userId) => {
    //             socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id], userId: userId });
    //             UserModel.findById(userId).then( user => {
    //                 MessageModel.create({ message: message, room: rooms[room]._id, user: userId, userName: user.pseudo})
    //                     .then( document => {
    //                         console.log('Message created', document)
    //                     })
    //                     .catch( err => {
    //                         console.log('Message don\'t created')
    //                     });
    //             })
    //         });
    //         socket.on('disconnect', () => {
    //             getUserRooms(socket).forEach(room => {
    //                 socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
    //                 delete rooms[room].users[socket.id]
    //             })
    //         })
    //     });

    //     function getUserRooms(socket) {
    //         return Object.entries(rooms).reduce((names, [name, room]) => {
    //             if (room.users[socket.id] != null) names.push(name)
    //             return names
    //         }, [])
    //     }
    // }

    launch(){
        // Start MongoDB connection
        this.MongoDB.connectDb()
        .then( db => {
            // io.on('connection', (socket) => {
            //     console.log('a user connected');
            //     socket.on('disconnect', () => {
            //       console.log('user disconnected');
            //     });
            //     socket.on('chat message', (msg) => {
            //       io.emit('chat message', msg);
            //     });
            //   });
              
            //   io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

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