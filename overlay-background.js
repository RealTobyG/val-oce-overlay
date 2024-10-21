let socket
let overlaySetup = {}
let gameEvent = {}

function onPageLoad() {
    openSocket()
}

function openSocket() {
    let urlParams = new URLSearchParams(document.location.search)
    let token = urlParams.get('token')
    socket = new WebSocket(`wss://7o4cyso8n2.execute-api.ap-southeast-2.amazonaws.com/production/?token=${token}`); // Replace Token with URL Query/known token
    socket.onopen = function (e) {
        console.log('Socket Open Success')
        socket.send(JSON.stringify({ action: 'get' }))
    };

    socket.onmessage = function (event) {
        let serverMessage = JSON.parse(event.data)
        if (serverMessage.overlay) {
            overlaySetup = serverMessage.overlay
            console.log(overlaySetup)   
        }
        if (serverMessage.gameEvent) {
            gameEvent = serverMessage.gameEvent
            console.log(gameEvent)
        }
        setOverlay()
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            console.log('[close] Connection died');
        }
        setTimeout(openSocket, 1000)
    };

    socket.onerror = function (error) {
        console.log(`[error]`);
    };
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

function setOverlay() {
    // Overlay Theme
    document.documentElement.style.setProperty('--bg1', `${overlaySetup.bg1}`)
    document.documentElement.style.setProperty('--bg2', `${overlaySetup.bg2}`)
    document.documentElement.style.setProperty('--bg3', `${overlaySetup.bg3}`)
    document.documentElement.style.setProperty('--bg4', `${overlaySetup.bg4}`)
    document.documentElement.style.setProperty('--bga1', `${overlaySetup.bga1}`)
    document.documentElement.style.setProperty('--bga2', `${overlaySetup.bga2}`)
    document.documentElement.style.setProperty('--frames', `${overlaySetup.frames}`)
}