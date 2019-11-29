

var hostConn;
var myId;
var players = [];
const chat = document.getElementById('chat')
var peer = new Peer({ key: 'lwjd5qra8257b9' });
peer.on('open', function (id) {
  document.getElementById("peerId").innerHTML = id
  console.log('My peer ID is: ' + id);
  myId = id;
  addPlayer(myId)
});

function setContent(dataType, data){
  return JSON.stringify({'datatype': dataType, data});
}

function deleteForm() {
  document.getElementById("form").innerHTML = "";
}

function send(dataType, data){
  if (hostConn) {
    hostConn.send(setContent(dataType, data))
  } else {
    pingAll(setContent(dataType, data))
  }  
}

function addMsgToChat(msg){
  var elem = document.createElement("div")
  //chat.
}
