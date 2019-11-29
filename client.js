
function connect() {
  var hostId = document.getElementById("hostId").value;
  var conn = peer.connect(hostId);
  hostConn = conn
  conn.on('data', (data) => {
    processMsg(data)
  })
  conn.on('open', () => {
    console.log("C BON")
  })
  console.log(conn)
  deleteForm();
  console.log(peer)
}

function processMsg(msg){
  var parsedData = JSON.parse(data);
  if(parsedData.datatype = "players"){
    setPlayers(parsedData.data)
  }
  if(parsedData.datatype = "chat"){
    addMsgToChat(parsedData.data)
  }
}


function setPlayers(newPlayers){
  players = newPlayers
  document.getElementById("players").innerHTML = players;
}