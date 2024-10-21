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
    document.documentElement.style.setProperty('--bg1', `${overlaySetup.bg1}`)
    document.documentElement.style.setProperty('--bg2', `${overlaySetup.bg2}`)
    document.documentElement.style.setProperty('--bg3', `${overlaySetup.bg3}`)
    document.documentElement.style.setProperty('--bg4', `${overlaySetup.bg4}`)
    document.documentElement.style.setProperty('--bga1', `${overlaySetup.bga1}`)
    document.documentElement.style.setProperty('--bga2', `${overlaySetup.bga2}`)
    document.documentElement.style.setProperty('--frames', `${overlaySetup.frames}`)
    

    // Swapping sides on IGO according to map and which team starts def
    let seriesScore = '0-0'
    const teamANameIGO = document.querySelector("#team-a-name-igo")
    const teamBNameIGO = document.querySelector("#team-b-name-igo")
    const teamALogoIGO = document.querySelector("#team-a-logo-igo")
    const teamBLogoIGO = document.querySelector("#team-b-logo-igo")
    if ((overlaySetup.seriesLengthSelection === 1) && (overlaySetup.teamASeriesScore<2 && overlaySetup.teamBSeriesScore<2)) {
        if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-a') {
            seriesScore = `${overlaySetup.teamASeriesScore}-${overlaySetup.teamBSeriesScore}`
            teamBNameIGO.setAttribute("class", "team-name-right-igo apply-team-b-name")
            teamANameIGO.setAttribute("class", "team-name-left-igo apply-team-a-name")
            teamBLogoIGO.setAttribute("class", "team-logo-right-igo apply-team-b-logo")
            teamALogoIGO.setAttribute("class", "team-logo-left-igo apply-team-a-logo")
        } else if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-b') {
            seriesScore = `${overlaySetup.teamBSeriesScore}-${overlaySetup.teamASeriesScore}`
            teamANameIGO.setAttribute("class", "team-name-right-igo apply-team-a-name")
            teamBNameIGO.setAttribute("class", "team-name-left-igo apply-team-b-name")
            teamALogoIGO.setAttribute("class", "team-logo-right-igo apply-team-a-logo")
            teamBLogoIGO.setAttribute("class", "team-logo-left-igo apply-team-b-logo")
        }
    } else if  ((overlaySetup.seriesLengthSelection === 2) && (overlaySetup.teamASeriesScore<3 && overlaySetup.teamBSeriesScore<3)) {
        if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-a') {
            seriesScore = `${overlaySetup.teamASeriesScore}-${overlaySetup.teamBSeriesScore}`
            teamBNameIGO.setAttribute("class", "team-name-right-igo apply-team-b-name")
            teamANameIGO.setAttribute("class", "team-name-left-igo apply-team-a-name")
            teamBLogoIGO.setAttribute("class", "team-logo-right-igo apply-team-b-logo")
            teamALogoIGO.setAttribute("class", "team-logo-left-igo apply-team-a-logo")
        } else if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-b') {
            seriesScore = `${overlaySetup.teamBSeriesScore}-${overlaySetup.teamASeriesScore}`
            teamANameIGO.setAttribute("class", "team-name-right-igo apply-team-a-name")
            teamBNameIGO.setAttribute("class", "team-name-left-igo apply-team-b-name")
            teamALogoIGO.setAttribute("class", "team-logo-right-igo apply-team-a-logo")
            teamBLogoIGO.setAttribute("class", "team-logo-left-igo apply-team-b-logo")
        }
    }

    // Setting score dots on IGO
    const mapScoreIGO = document.getElementById('map-score')
    if (overlaySetup.seriesLengthSelection === 0) {
        mapScoreIGO.style.display = none
    } else if ((overlaySetup.seriesLengthSelection === 1) && (overlaySetup.teamASeriesScore<2 && overlaySetup.teamBSeriesScore<2)) {
        mapScoreIGO.src = `assets/map_scores/GEN_BO3_${seriesScore}.png`
    } else if ((overlaySetup.seriesLengthSelection === 2) && (overlaySetup.teamASeriesScore<3 && overlaySetup.teamBSeriesScore<3)) {
        mapScoreIGO.src = `assets/map_scores/GEN_BO5_${seriesScore}.png`
    }
}