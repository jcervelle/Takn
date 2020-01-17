

var hostConn;
var me = {};
var players = [];
const chat = document.getElementById('chat')
var peer = new Peer({ key: 'lwjd5qra8257b9' });
peer.on('open', function (id) {
  document.getElementById("peerId").innerHTML = id
  console.log('My peer ID is: ' + id);
  me.peerId = id;
  me.name = id;
  //addPlayer(me)
});

function setContent(source, dataType, data) {
  return JSON.stringify({ source, 'datatype': dataType, data });
}

function deleteForm() {
  document.getElementById("form").innerHTML = "";
}

function send(source, dataType, data) {
  console.log("sending : ")
  console.log(setContent(source, dataType, data))
  if (hostConn) {
    hostConn.send(setContent(source, dataType, data))
  } else {
    sendAll(setContent(source, dataType, data))
  }
}

function setPlayers(newPlayers) {
  players = newPlayers
  drawPlayers()
}

function drawPlayers(){
  document.getElementById("players").innerHTML = players.map(p => p.name);
}

function processMsg(msg) {
  console.log(msg)
  var parsedMsg = JSON.parse(msg);
  console.log(parsedMsg)
  if (parsedMsg.datatype == "players") {
    setPlayers(parsedMsg.data)
  }
  if (parsedMsg.datatype == "chat") {
    addMsgToChat(parsedMsg.source, parsedMsg.data)
  }
  if (parsedMsg.datatype == "rename") {
    localRename(parsedMsg.source)
  }
  if (parsedMsg.datatype == "logout") {
    logout(parsedMsg.source)
  }
}

function sendChatMessage() {
  let msg = document.getElementById("chatInput").value;
  if (msg) {
    send(me, "chat", msg)
  }
  document.getElementById("chatInput").value = "";
}

function addMsgToChat(source, msg) {
  if(source.peerId != me.peerId && msg.toLowerCase() == "wizz"){
    wizz()
  }
  let newMsg = document.createElement("div")
  newMsg.innerHTML = "<b>" + source.name + "</b> :<br>" + msg;
  document.getElementById("chat").appendChild(newMsg)

}

function rename() {
  let newName = document.getElementById("renameInput").value
  me.name = newName
  send(me, "rename", null)
}

function localRename(player) {
  let playerToRename = players.find(p => p.peerId == player.peerId)
  let chat = document.getElementById("chat");
  let elems = chat.children;
  console.log(elems)
  if (elems.length > 0) {
    for(let i = 0; i < elems.length; i++) {
      console.log(elems[i])
      let e = elems[i].children[0]
      if (e.innerText == playerToRename.name) {
        e.innerText = player.name;
      }
    };
  }
  playerToRename.name = player.name;
  drawPlayers()
}


function wizz(){
  document.body.className = "wizz";
  let wizz = setInterval(() => {
    if(document.body.className == "wizz"){
      document.body.className = ""
    }else{
      document.body.className = "wizz"
    }
  }, 100);
  setTimeout(() => {
    clearInterval(wizz)
    document.body.className = ""
  }, 1000)
}

function logout(source){
  players.slice(findIndex(p => p.peerId == source.peerId), findIndex(p => p.peerId == source.peerId));
  drawPlayers()
}