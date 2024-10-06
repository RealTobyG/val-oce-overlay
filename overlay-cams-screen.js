let socket
let overlaySetup = {}
overlaySelection = 0

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
        overlaySetup = JSON.parse(event.data)
        console.log(overlaySetup)
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
    // Set Names
    const teamANameAll = document.getElementsByClassName('apply-team-a-name')
    const teamBNameAll = document.getElementsByClassName('apply-team-b-name')
    const teamATriAll = document.getElementsByClassName('apply-team-a-tri')
    const teamBTriAll = document.getElementsByClassName('apply-team-b-tri')
    const eventNameAll = document.getElementsByClassName('apply-event-name')
    const caster1NameAll = document.getElementsByClassName('apply-caster-1-name')
    const caster2NameAll = document.getElementsByClassName('apply-caster-2-name')

    for (const instance of teamANameAll) {
        instance.textContent = `${overlaySetup.teamAName}`
    }
    for (const instance of teamBNameAll) {
        instance.textContent = `${overlaySetup.teamBName}`
    }
    for (const instance of teamATriAll) {
        instance.textContent = `${overlaySetup.teamATri}`
    }
    for (const instance of teamBTriAll) {
        instance.textContent = `${overlaySetup.teamBTri}`
    }
    for (const instance of eventNameAll) {
        instance.textContent = `${overlaySetup.eventName}`
    }
    for (const instance of caster1NameAll) {
        instance.textContent = `@${overlaySetup.caster1Name}`
    }
    for (const instance of caster2NameAll) {
        instance.textContent = `@${overlaySetup.caster2Name}`
    }

    // Set Logos
    const teamALogoAll = document.getElementsByClassName('apply-team-a-logo')
    const teamBLogoAll = document.getElementsByClassName('apply-team-b-logo')
    const eventLogoAll = document.getElementsByClassName('apply-event-logo')

    for (const element of teamALogoAll) {
        element.src = overlaySetup.teamALogo
    }
    for (const element of teamBLogoAll) {
        element.src = overlaySetup.teamBLogo
    }
    for (const element of eventLogoAll) {
        element.src = overlaySetup.eventLogo
    }

    // Overlay Theme
    let overlayType = 'VCL'
    if (overlaySelection !== overlaySetup.overlaySelection) {
        if (overlaySetup.overlaySelection === 0) {
            overlayType = 'VCL'
            overlaySelection = 0
        } else if (overlaySetup.overlaySelection === 1) {
            overlayType = 'GC'
            overlaySelection = 1
        }
    
        const overlayElements = document.getElementsByClassName('overlay-element')
        if (overlayType === "GC") {
            for (const element of overlayElements) {
                element.src = element.src.replace(/(VCL|LPL)/g, "GC")
            }
        } else if (overlayType === "VCL") {
            for (const element of overlayElements) {
                element.src = element.src.replace(/(GC|LPL)/g, "VCL")
            }
        }
    }

    document.documentElement.style.setProperty('--bg1', `${overlaySetup.bg1}`)
    document.documentElement.style.setProperty('--bg2', `${overlaySetup.bg2}`)
    document.documentElement.style.setProperty('--bg3', `${overlaySetup.bg3}`)
    document.documentElement.style.setProperty('--bg4', `${overlaySetup.bg4}`)
    document.documentElement.style.setProperty('--bga1', `${overlaySetup.bga1}`)
    document.documentElement.style.setProperty('--bga2', `${overlaySetup.bga2}`)
    document.documentElement.style.setProperty('--frames', `${overlaySetup.frames}`)


    // Bottom Bar
    const bottomBar = document.getElementById('bottom-bar')
    const chatCommandsAll = document.getElementsByClassName('chat-commands')
    if (overlaySetup.bottomBarSelection === 0) {
        bottomBar.style.display = 'none'
    } else {
        bottomBar.style.display = 'grid'
    }
    if (overlaySetup.chatCommandsSelection === 0) {
        for (const instance of chatCommandsAll) {
            instance.style.display = 'none'
        }
    } else {
        for (const instance of chatCommandsAll) {
            instance.style.display = 'flex'
        }
    }
    if (overlaySetup.bottomBarTextSizeSelection === 1) {
        bottomBar.style.fontSize = '25pt'
    } else {
        bottomBar.style.fontSize = '20pt'
    }

    // Casters Selection
    if (overlaySetup.castersSelection === 0) {
        document.getElementById('background').style.maskImage = 'url(assets/Mask_Cam_Screen.png)'
        document.getElementById('caster-handle-1').style.display = "flex"
        document.getElementById('caster-handle-2-1').style.display = "none"
        document.getElementById('caster-handle-2-2').style.display = "none"
        document.getElementById('cam-1').style.display = "flex"
        document.getElementById('cam-2-1').style.display = "none"
        document.getElementById('cam-2-2').style.display = "none"
    } else {
        document.getElementById('background').style.maskImage = 'url(assets/Mask_Dual_Cam_Screen.png)'
        document.getElementById('caster-handle-1').style.display = "none"
        document.getElementById('caster-handle-2-1').style.display = "flex"
        document.getElementById('caster-handle-2-2').style.display = "flex"
        document.getElementById('cam-1').style.display = "none"
        document.getElementById('cam-2-1').style.display = "flex"
        document.getElementById('cam-2-2').style.display = "flex"
    }
}