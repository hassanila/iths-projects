const http = require('http'),
  express = require('express'),
  app = express(),
  cors = require('cors'),
  { Server } = require("socket.io"),
  server = http.createServer(app),
  io = new Server(server);

const apiRouter = require('./routes/api');
const PORT = 3000;

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/client/index.html');
});

app.get('/chat', (req, res) => {

  res.sendFile(__dirname + '/client/chat.html');
});


// CHAT SERVER SOCKET
const mainRoom = "main room";
const waitingRoom = "waiting room";
let peopleInMainRoom = 0;

io.on('connection', (socket) => { // PÅ händelsen connection | NIVÅ: I/O (input/output)

  peopleInMainRoom++; // ÖKA antalet personer i main room med 1

  if(peopleInMainRoom <= 2) { // OM antalet personer i main room är mindre eller lika med 2, gör följande

    socket.join(mainRoom);

    socket.emit('server message', 'Välkommen till chattrummet')

    console.log("People in main room: " + peopleInMainRoom);
  }
  else { // ANNARS, gör följande
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommen till väntrummet ')
    socket.emit('server message', 'Du är placerad i kö...')
  }

  socket.on('disconnect', () => { // PÅ händelsen disconnect | NIVÅ: SOCKET (anslutning)
    console.log('A user disconnected');
    peopleInMainRoom--; // MINSKA antalet personer i main room med 1
  });

  socket.on('chat message', (message) => {

    io.to(mainRoom).emit('chat message', message); // YTTRA (skicka) händelsen chat message till main room
  })
});



app
  .use(cors())
  .use(express.urlencoded({extended: true}))
  .use(express.static('client/public'))
  .use(express.json())
  .use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });