
function connect() {
  var hostId = document.getElementById("hostId").value;
  var conn = peer.connect(hostId);
  hostConn = conn
  conn.on('data', (data) => {
    processMsg(data)
  })
  conn.on('open', () => {
    console.log("C BON")
    deleteForm();
  })
  console.log(conn)
  console.log(peer)
}
