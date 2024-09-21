let socket
let overlaySetup = {}

function onPageLoad() {
    openSocket()

    socket.onopen = function (e) {
        console.log('Socket Open Success')
        socket.send(JSON.stringify({ action: 'get' }))
    };

    socket.onmessage = function (event) {
        overlaySetup = JSON.parse(event.data)
        console.log(overlaySetup)
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
        openSocket()
    };

    socket.onerror = function (error) {
        console.log(`[error]`);
    };
}

function openSocket() {
    socket = new WebSocket("wss://7o4cyso8n2.execute-api.ap-southeast-2.amazonaws.com/production/?token=7460345571"); // Replace Token with URL Query/known token
}

async function getOverlay() {
  console.log('sending...')
  try {
    await socket.send(JSON.stringify({ action: 'get' }))
  } catch (err) {
    alert('Error:', err)
  }
}

function closeSocket() {
  socket.close()
}