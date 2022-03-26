require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');

const { notFoundHandler, errorsHandler } = require('./app/server/middleware/errorsHandlers');
const onSocketConnection = require('./app/server/socketHandlers/socketHandler');
const dbConnection = require('./app/server/config/dbConnection');
const avatarUpload = require('./app/server/config/storageConfig');

const mainRoutes = require('./app/server/routes/mainRoutes');
const authRoutes = require('./app/server/routes/authRoutes');


const port = process.env.PORT || 4040;


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set('views', path.join(__dirname, 'app', 'client', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'app', 'client', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(logger('dev'));
app.use(multer({ storage: avatarUpload }).single('user_avatar'));

dbConnection(process.env.MONGO);
io.on('connection', onSocketConnection);

app.get('/', (req, res) => {
  res.redirect('/main');
})
app.use('/main', mainRoutes);
app.use('/auth', authRoutes);

app.use(notFoundHandler, errorsHandler);


httpServer.listen(port, () => console.log(`Server is running on port ${port}`));