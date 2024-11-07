const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Iointialize = require('./Controllers/socket');
const Auth = require('./Routes/UserAuthRouter');
const GoogleStrategy = require('./Routes/GoogleAuthRouter');
const JwtVerifyRouter = require("./Routes/JwtVerifyRouter");
const CreateRoom = require("./Routes/CreateRoomRouter");
const Rooms = require("./Routes/RoomRouter");
const JoinRoom = require("./Routes/JoinRoomRouter");
const RoomDetails = require("./Routes/RoomDetailsRouter");
const CreateRoomComplaint = require("./Routes/UserComplaintRouter");
const SecurityLog = require("./Routes/LogRouter");
const Dashboard = require("./Routes/DashBoardRouter");
const isRoleVerify = require('./Routes/RoleVerification');
const Annoucement = require("./Routes/AnnouncementRoute");
const Admin = require("./Routes/AdminRouter");
const Payment = require("./Routes/PaymentRoute");
const path = require('path');
class App extends Iointialize {
    constructor() {
        super();
        this.cors = {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            optionSuccessStatus: 200,
        };
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                credentials: true
            }
            ,
            connectionStateRecovery: {}
        })
        this.setMiddleware(this.cors);
        this.setRoutes();
        this.initializeSocket();
    }

    setMiddleware(corsOptions) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cookieParser());
        // this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        this.app.use(passport.initialize());



        this.app.use(cors(corsOptions));
        this.app.options('*', cors(corsOptions));

        require('./config/passport_config');
    }

    setRoutes() {

        this.app.use('/user', Auth);
        this.app.use('/auth/google', GoogleStrategy);
        this.app.use('/jwtVerify', JwtVerifyRouter);
        this.app.use('/createRoom', CreateRoom);
        this.app.use('/my-rooms', Rooms);
        this.app.use('/join-room', JoinRoom);
        this.app.use('/room-details', RoomDetails);
        this.app.use('/complaints', CreateRoomComplaint);
        this.app.use('/dashboard', Dashboard);
        this.app.use('/api/residents', SecurityLog);
        this.app.use('/isSuperRole', isRoleVerify);
        this.app.use('/announcement', Annoucement);
        this.app.use('/admin', Admin);
        this.app.use('/payment', Payment);
    }

    initializeSocket() {
        this.initSocket(this.io);
    }

    start(port) {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

module.exports = App;
