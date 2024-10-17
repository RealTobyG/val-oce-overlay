let socket
let overlaySetup = {}
let overlaySelection = 0

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
    // Overlay Theme
    document.documentElement.style.setProperty('--bg1', `${overlaySetup.bg1}`)
    document.documentElement.style.setProperty('--bg2', `${overlaySetup.bg2}`)
    document.documentElement.style.setProperty('--bg3', `${overlaySetup.bg3}`)
    document.documentElement.style.setProperty('--bg4', `${overlaySetup.bg4}`)
    document.documentElement.style.setProperty('--bga1', `${overlaySetup.bga1}`)
    document.documentElement.style.setProperty('--bga2', `${overlaySetup.bga2}`)
    document.documentElement.style.setProperty('--frames', `${overlaySetup.frames}`)

    // Show BO1/BO3/BO5 Overlay
    if (overlaySetup.seriesLengthSelection === 0) {
        document.getElementById('map-veto-bo1').style.display = 'grid'
        document.getElementById('map-veto-bo3').style.display = 'none'
        document.getElementById('map-veto-bo5').style.display = 'none'
    } else if (overlaySetup.seriesLengthSelection === 1) {
        document.getElementById('map-veto-bo1').style.display = 'none'
        document.getElementById('map-veto-bo3').style.display = 'grid'
        document.getElementById('map-veto-bo5').style.display = 'none'
    } else if (overlaySetup.seriesLengthSelection === 2) {
        document.getElementById('map-veto-bo1').style.display = 'none'
        document.getElementById('map-veto-bo3').style.display = 'none'
        document.getElementById('map-veto-bo5').style.display = 'grid'
    }

    if (overlaySetup.seriesLengthSelection === 1) {
        // Sets defense teams for map veto overlay 
        const bo3PickSides = document.getElementsByClassName('bo3-side-team')
        overlaySetup.mapPicksSides.forEach((team, i) => {
            bo3PickSides[i].className = bo3PickSides[i].className.replace(/(team-a|team-b)/g, `${team}`)
        })
        // Sets map ban team names on map veto overlay
        const bo3BanNames = document.getElementsByClassName('bo3-ban-team')
        Array.from(bo3BanNames).forEach((element, i) => {
            element.className = element.className.replace(/(team-a|team-b)/g, `${overlaySetup.mapBansTeams[i]}`)
        })
        // Sets map pick team names on map veto overlay
        const bo3PickNames = document.getElementsByClassName('bo3-pick-team')
        overlaySetup.mapPicksTeams.forEach((pick, i) => {
            bo3PickNames[i].className = bo3PickNames[i].className.replace(/(team-a|team-b)/g, `${pick}`)
        })
        // Sets map names and images for each map ban on map veto overlay
        const bo3BanImgs = document.getElementsByClassName('bo3-ban-img')
        const bo3BanMapNames = document.getElementsByClassName('bo3-ban-mapname')
        overlaySetup.mapBans.forEach((ban, i) => {
            bo3BanImgs[i].src = `assets/Maps/${ban}_320x320.png`
            bo3BanMapNames[i].textContent = `${ban}`
        })
        // Sets map names and images for each map pick on map veto overlay
        const bo3PickImgs = document.getElementsByClassName('bo3-pick-img')
        const bo3PickMapNames = document.getElementsByClassName('bo3-pick-mapname')
        overlaySetup.mapPicks.forEach((pick, i) => {
            bo3PickImgs[i].src = `assets/Maps/${pick}_320x640.png`
            bo3PickMapNames[i].textContent = `${pick}`
        })
        // Shows/Hides map results for finished maps
        const mapResultOverlays = document.getElementsByClassName('map-result-overlay')
        Array.from(mapResultOverlays).forEach((element, i) => {
            if (Number(i)+1<=overlaySetup.mapNumber) {
                element.style.display = 'flex'
            }
            else {
                element.style.display = 'none'
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 2) {
        // Sets defense teams for map veto overlay 
        const bo5PickSides = document.getElementsByClassName('bo5-side-team')
        overlaySetup.mapPicksSides.forEach((team, i) => {
            bo5PickSides[i].className = bo5PickSides[i].className.replace(/(team-a|team-b)/g, `${team}`)
        })
        // Sets map ban team names on map veto overlay
        const bo5BanNames = document.getElementsByClassName('bo5-ban-team')
        Array.from(bo5BanNames).forEach((element, i) => {
            element.className = element.className.replace(/(team-a|team-b)/g, `${overlaySetup.mapBansTeams[i]}`)
        })
        // Sets map pick team names on map veto overlay
        const bo5PickNames = document.getElementsByClassName('bo5-pick-team')
        overlaySetup.mapPicksTeams.forEach((pick, i) => {
            bo5PickNames[i].className = bo5PickNames[i].className.replace(/(team-a|team-b)/g, `${pick}`)
        })
        // Sets map names and images for each map ban on map veto overlay
        const bo5BanImgs = document.getElementsByClassName('bo5-ban-img')
        const bo5BanMapNames = document.getElementsByClassName('bo5-ban-mapname')
        overlaySetup.mapBans.forEach((ban, i) => {
            bo5BanImgs[i].src = `assets/Maps/${ban}_320x320.png`
            bo5BanMapNames[i].textContent = `${ban}`
        })
        // Sets map names and images for each map pick on map veto overlay
        const bo5PickImgs = document.getElementsByClassName('bo5-pick-img')
        const bo5PickMapNames = document.getElementsByClassName('bo5-pick-mapname')
        overlaySetup.mapPicks.forEach((pick, i) => {
            bo5PickImgs[i].src = `assets/Maps/${pick}_320x640.png`
            bo5PickMapNames[i].textContent = `${pick}`
        })
        // Shows/Hides map results for finished maps
        const mapResultOverlays = document.getElementsByClassName('bo5-map-result-overlay')
        Array.from(mapResultOverlays).forEach((element, i) => {
            if (Number(i)+1<=overlaySetup.mapNumber) {
                element.style.display = 'flex'
            }
            else {
                element.style.display = 'none'
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 0) {
        // Sets defense teams for map veto overlay 
        const bo1PickSides = document.getElementsByClassName('bo1-side-team')
        overlaySetup.mapPicksSides.forEach((team, i) => {
            bo1PickSides[i].className = bo1PickSides[i].className.replace(/(team-a|team-b)/g, `${team}`)
            if (team === 'team-a') {
                document.getElementById('bo1-def-logo').className = document.getElementById('bo1-def-logo').className.replace(/(team-a|team-b)/g, 'team-a')
                document.getElementById('bo1-def-name').className = document.getElementById('bo1-def-name').className.replace(/(team-a|team-b)/g, 'team-a')
                document.getElementById('bo1-atk-logo').className = document.getElementById('bo1-atk-logo').className.replace(/(team-a|team-b)/g, 'team-b')
                document.getElementById('bo1-atk-name').className = document.getElementById('bo1-atk-name').className.replace(/(team-a|team-b)/g, 'team-b')
            } else if (team === 'team-b') {
                document.getElementById('bo1-def-logo').className = document.getElementById('bo1-def-logo').className.replace(/(team-a|team-b)/g, 'team-b')
                document.getElementById('bo1-def-name').className = document.getElementById('bo1-def-name').className.replace(/(team-a|team-b)/g, 'team-b')
                document.getElementById('bo1-atk-logo').className = document.getElementById('bo1-atk-logo').className.replace(/(team-a|team-b)/g, 'team-a')
                document.getElementById('bo1-atk-name').className = document.getElementById('bo1-atk-name').className.replace(/(team-a|team-b)/g, 'team-a')
            }
        })
        // Sets map pick team names and logos on map veto overlay
        const bo1PickNames = document.getElementsByClassName('bo1-pick-team')
        overlaySetup.mapPicksTeams.forEach((pick, i) => {
            bo1PickNames[i].className = bo1PickNames[i].className.replace(/(team-a|team-b)/g, `${pick}`)
        })
        // Sets map names and images for each map pick on map veto overlay
        overlaySetup.mapPicks.forEach((pick, i) => {
            document.getElementById('bo1-map-img').style.backgroundImage = `url(assets/Maps/${pick}_1080p.png)`
            document.getElementById('bo1-pick-mapname').textContent = `${pick}`
        })
        // Sets and shows/hides BO1 result
        document.getElementById('bo1-map-result').textContent = `${overlaySetup.teamATri} ${overlaySetup.mapScores[0]} - ${overlaySetup.mapScores[1]} ${overlaySetup.teamBTri}`
        if (overlaySetup.mapNumber === 1) {
            document.getElementById('bo1-map-result').style.display = 'block'
        } else {
            document.getElementById('bo1-map-result').style.display = 'none'
        }
    }
    

    // Updates winning team details for every complete map
    overlaySetup.mapWinners.forEach((mapWinner, i) => {
        const applyWinnerName = document.getElementsByClassName(`apply-map-${Number(i)+1}-winner`)
        for (const element of applyWinnerName) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
        }
        const applyWinnerLogo = document.getElementsByClassName(`apply-map-${Number(i)+1}-logo`)
        for (const element of applyWinnerLogo) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
        }
        const applyWinnerScore = document.getElementsByClassName(`apply-map-${Number(i)+1}-score`)
        for (const element of applyWinnerScore) {
            if (Number(overlaySetup.mapScores[i*2])>Number(overlaySetup.mapScores[(i*2)+1])) {
                element.textContent = `${overlaySetup.mapScores[i*2]} - ${overlaySetup.mapScores[(i*2)+1]}`
            } else {
                element.textContent = `${overlaySetup.mapScores[(i*2)+1]} - ${overlaySetup.mapScores[i*2]}`
            }
        }
    })

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
}