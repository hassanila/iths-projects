const WebSocket = require("ws");
const request = require("request");
const moment = require("moment");
const http = require("http");
const https = require("https");
let express = require("express"),
  app = express(),
  fs = require("fs"),
  cors = require("cors"),
  compression = require("compression");
let timesyncServer = require("timesync/server");
const socket = new WebSocket("wss://ws.finnhub.io?token=*********");
require("draftlog").into(console);
//var writeStream = fs.createWriteStream('./output2.txt', {flags: 'a'});

const protobuf = require("protobufjs");
let decode;

(async () => {
  let bs = await protobuf.load("./static/yticker.proto");
  decode = bs.lookupType("yticker");
})();

const wsClients = {
  yahooFinance: new WebSocket("wss://streamer.finance.yahoo.com"),
  //binance: new WebSocket('wss://ws.finnhub.io?token=*********'),
  //finnhub: new WebSocket('wss://ws.finnhub.io?token=*********')
};

let stocks = ["ETHUSDT", "BTCUSDT", "TSLA", "NIO", "NAS"];

let objToSend = {};
let lastMessageTime = 0;
let timeouts = [];

let updateLog = {};
stocks.forEach((stock) => (updateLog[stock] = console.draft("")));

for (let site in wsClients) {
  let ws = wsClients[site];

  ws.onopen = function () {
    console.log(site + " Socket sucessfully opened!");
    ws.send(JSON.stringify({ subscribe: ["NIO", "TSLA", "NAS.OL"] }));
  };

  ws.onmessage = function (data) {
    var decoded = decode.decode(Buffer.from(data.data, "base64"));

    updateLog[decoded.id](decoded.id + ": " + decoded.price.toFixed(2));

    //$('#tsla').text(+'$');
    //$('#lastTradeTime').text(moment(trade.t).format("HH:mm:ss"));

    //let percent = (((trade.p/closePrice)-1)*100).toFixed(2);
    //$('#percent').text((percent > 0 ? '+' : '') + percent + '%').css('color', percent > 0 ? 'green' : 'red');
  };

  ws.onclose = function (e) {
    console.log(site + " Socket closed: ", e.reason);

    // reconnect
  };

  ws.onerror = function (e) {
    console.error(
      site + " Socket encountered an error: ",
      e.message,
      "Closing socket"
    );
    ws.close();
  };
}

/*

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    console.log(moment().format('YYYY-MM-DD HH:MM:SS') + ': Socket opened!');
    stocks.forEach((stock) => socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock})))
});

socket.addEventListener('close', function (event) {
    console.log(moment().format('YYYY-MM-DD HH:MM:SS') + ': Socket closed!');
});

var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
// Listen for messages
socket.addEventListener('message', function (event) {

    let res = JSON.parse(event.data);
    if (res.type && res.type === 'trade') {

        //writeStream.write(JSON.stringify(res.data) + ',');

        //let trades = evenlyPickItemsFromArray(res.data, 10);
        //let trades = res.data.slice(-1);
        res.data = [res.data.reduce((prev, current) => (prev.t > current.t) ? prev : current)]
        let trades = res.data;
        objToSend = res;
        let lastInterval = Date.now() - lastMessageTime;

        if (lastInterval > 2000) {
            lastInterval = 2000;
        }

        timeouts.forEach((timeout)=>clearTimeout(timeout));
        timeouts = [];


        trades.forEach((trade, i) => timeouts[i] = setTimeout(()=> {
            timeouts.splice(i, 1);
            updateLog[trade.s](trade.s + ': ' + trade.p + '$');
        }, (lastInterval / trades.length) * i));

        lastMessageTime = Date.now();

        //unsubscribe('TSLA');
        //socket.close();
    }

});
*/
process.on("SIGINT", function () {
  //unsubscribe('TSLA');
  //writeStream.end()
  socket.close();
  process.exit();
});

//app.set('json spaces', 4)
app.set("trust proxy", true);
app.use(cors());
app.use(compression());
app.disable("x-powered-by");

app.use("/timesync", timesyncServer.requestHandler);

app.use("/static", express.static("static"));

app.get("/tsla", function (req, res) {
  res.sendFile("./index.html", { root: __dirname });
});

let httpServer = http.createServer(null, app);
let wss = new WebSocket.Server({ server: httpServer });

let broadcastTimeout;
let lastMessageSent = null;
let startBroadcast = function () {
  clearTimeout(broadcastTimeout);

  if (wss.clients.size > 0) {
    let stringified = JSON.stringify(objToSend);

    if (lastMessageSent !== stringified) {
      lastMessageSent = stringified;

      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
          return ws.terminate();
        }

        ws.send(stringified);
      });
    }
  }

  broadcastTimeout = setTimeout(startBroadcast, 200);
};
let pingInterval = setInterval(function () {
  //lastMessageSent = null;
  wss.clients.forEach(function (ws) {
    if (ws.isAlive === false) {
      // console.log(getDateTime() + ' ' + (ws._socket.remoteAddress).replace('::ffff:', '') + ' has disconnected');
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);

wss.on("connection", function (ws) {
  console.log(
    getDateTime() +
      " " +
      "New connection from: " +
      ws._socket.remoteAddress.replace("::ffff:", "")
  );

  lastMessageSent = null;

  ws.isAlive = true;

  ws.on("pong", function () {
    this.isAlive = true;
    //console.log(getDateTime() + ' ' + 'Received: pong from: ' + (ws._socket.remoteAddress).replace('::ffff:', ''))
  });

  ws.on("message", function (message) {
    console.log(
      getDateTime() +
        " " +
        "Received: " +
        message +
        " from: " +
        ws._socket.remoteAddress.replace("::ffff:", "")
    );
    //lastMessageSent = null;

    if (message === "update") {
      console.log("Updating...");
    }
  });

  ws.on("close", function () {
    // console.log(getDateTime() + ' ' + (ws._socket.remoteAddress).replace('::ffff:', '') + ' has disconnected');
  });
});

wss.on("error", function (err) {
  console.log("WebSocket Server:\n" + err);
});

startBroadcast();

httpServer.listen(3300, function () {
  console.log("HTTP on port 3300!");
});

httpServer.on("error", (err) => console.log("\nhttpServer:\n" + err));

function evenlyPickItemsFromArray(allItems, neededCount) {
  // if we want more items than avaliable, return all items
  if (neededCount >= allItems.length) {
    return [...allItems];
  }
  // buffer for collecting picked items
  const result = [];
  const totalItems = allItems.length;
  // default interval between items (might be float)
  const interval = totalItems / neededCount;

  for (let i = 0; i < neededCount; i++) {
    // always add half of interval, so 'picking area' is 'aligned' to the center
    // eg evenlyPickItemsFromArray([0...100], 1); // [50] instead of [0]
    const evenIndex = Math.floor(i * interval + interval / 2);

    result.push(allItems[evenIndex]);
  }
  return result;
}

function getDateTime(onlyTime, noSeconds, onlyDate, minOffset = 0) {
  var date = new Date();

  date.setMinutes(date.getMinutes() + minOffset);

  var min = String(date.getMinutes()).padStart(2, "0");
  var hour = String(date.getHours()).padStart(2, "0");

  var sec = String(date.getSeconds()).padStart(2, "0");
  var year = String(date.getFullYear());
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");

  if (onlyDate) {
    return year + month + day;
  }

  return onlyTime
    ? hour + ":" + min + (noSeconds ? "" : ":" + sec)
    : year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        min +
        (noSeconds ? "" : ":" + sec);
}
