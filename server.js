var conns = [];

function host() {
  addPlayer(me)
  peer.on('connection', function (conn) {
    //alert('Le joueur ' + conn.peer + ' a rejoint le salon')
    test = conn
    //conn.send("Hello")

    console.log(conn)
    conn.on('data', (data) => {
      console.log(data)
      //processMsg(data)
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
  addPlayer({ 'peerId': conn.peer, 'name': conn.peer })
}

function addPlayer(player) {
  players.push(player);
  setPlayers(players)

  sendAll(setContent(me, "players", players))
}

function sendAll(data) {
  processMsg(data)
  conns.forEach((conn) => {
    //if (conn.peer != me.peerId) {
    conn.send(data)
    //}
  })

}