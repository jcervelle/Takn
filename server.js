var conns = [];



function host() {
  peer.on('connection', function (conn) {
    //alert('Le joueur ' + conn.peer + ' a rejoint le salon')
    test = conn
    //conn.send("Hello")

    console.log(conn)
    conn.on('data', (data) => {
      sendAll(data);
    })
    conn.on('open', () => {
      addConn(conn)
    })

  });

  peer.on('data', (data) => {
    console.log(data)
  })
  deleteForm();
  console.log(peer)
}

function addConn(conn) {
  conns.push(conn);
  addPlayer(conn.peer)
}

function addPlayer(player) {
  players.push(player);
  document.getElementById("players").innerHTML = players;
  
  sendAll(setContent("players", players))
}

function sendAll(string) {
  conns.forEach((conn) => {
    if (conn.peer != myId) {
      conn.send(string)
    }
  })
  console.log(string)

}