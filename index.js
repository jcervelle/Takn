

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

function setContent(source, dataType, data){
  return JSON.stringify({source, 'datatype': dataType, data});
}

function deleteForm() {
  document.getElementById("form").innerHTML = "";
}

function send(source, dataType, data){
  console.log("sending : "  )
  console.log(setContent(source, dataType, data))
  if (hostConn) {
    hostConn.send(setContent(source, dataType, data))
  } else {
    sendAll(setContent(source, dataType, data))
  }  
}

function setPlayers(newPlayers){
  players = newPlayers
  document.getElementById("players").innerHTML = players.map(p => p.name);
}

function processMsg(data){
  console.log(data)
  var parsedData = JSON.parse(data);
  console.log(parsedData)
  if(parsedData.datatype == "players"){
    setPlayers(parsedData.data)
  }
  if(parsedData.datatype == "chat"){
    addMsgToChat(parsedData.source, parsedData.data)
  }
}

function sendChatMessage(){
  let msg = document.getElementById("chatInput").value;
  if(msg){
    send(me, "chat", msg)
  }
  document.getElementById("chatInput").value = "";
}

function addMsgToChat(source, msg){
  var newMsg = document.createElement("div")
  newMsg.innerHTML = "<b>" + source.name + "</b> :<br>" + msg;
  document.getElementById("chat").appendChild(newMsg)
  
}
