const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express();


//dividindo o servido para ele trabalhe com requisições http e websocket que permite a comunicação em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

//cone
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-jplms.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//acesso a req.io
app.use((req, res, next) => {
    req.io = io;

    next();
});

//permitir que urls de servidores diferente tenham acesso
app.use(cors());

//rota statica para ter acesso a todas as imagens que foram salvas na aplicação
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));


server.listen(3333);
