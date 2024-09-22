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
        setOverlay()
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
    let urlParams = new URLSearchParams(document.location.search)
    let token = urlParams.get('token')
    socket = new WebSocket(`wss://7o4cyso8n2.execute-api.ap-southeast-2.amazonaws.com/production/?token=${token}`); // Replace Token with URL Query/known token
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
    let overlaySelection = 'VCL'
    if (overlaySetup.overlaySelection === 0) {
        overlaySelection = 'VCL'
    } else if (overlaySetup.overlaySelection === 1) {
        overlaySelection = 'GC'
    }

    const overlayElements = document.getElementsByClassName('overlay-element')
    if (overlaySelection === "GC") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|LPL)/g, "GC")
        }
    } else if (overlaySelection === "VCL") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(GC|LPL)/g, "VCL")
        }
    }

    // Bottom Bar
    const bottomBarAll = document.getElementsByClassName('bottom-bar')
    const chatCommandsAll = document.getElementsByClassName('chat-commands')
    if (overlaySetup.bottomBarSelection === 0) {
        for (const instance of bottomBarAll) {
            instance.style.display = 'none'
        }
    } else {
        for (const instance of bottomBarAll) {
            instance.style.display = 'grid'
        }
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
        for (const instance of bottomBarAll) {
            instance.style.fontSize = '25pt'
        }
    } else {
        for (const instance of bottomBarAll) {
            instance.style.fontSize = '20pt'
        }
    }

    // Updates winning team details for every complete map on intermission overlay
    const scheduleResultOverlays = document.getElementsByClassName('schedule-result-overlay')
    overlaySetup.mapWinners.forEach((mapWinner, i) => {
        const applyWinnerName = document.getElementsByClassName(`apply-map-${Number(i)+1}-winner`)
        for (const element of applyWinnerName) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
        }
        const applyWinnerLogo = document.getElementsByClassName(`apply-map-${Number(i)+1}-logo`)
        for (const element of applyWinnerLogo) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
        }
        const applyWinnerScoreIntermission = document.getElementsByClassName(`apply-map-${Number(i)+1}-score-intermission`)
        if (overlaySetup.seriesLengthSelection === 1) {
            const defTeamIntermission = document.getElementsByClassName('bo3-def-logo')
            if (defTeamIntermission[i].classList.contains('apply-team-a-logo')) {
                applyWinnerScoreIntermission[0].textContent = `${overlaySetup.mapScores[(i*2)+1]} - ${overlaySetup.mapScores[i*2]}`
            } else {
                applyWinnerScoreIntermission[0].textContent = `${overlaySetup.mapScores[i*2]} - ${overlaySetup.mapScores[(i*2)+1]}`
            }
        }
    })
    // Updates current map on intermission overlay
    const currentMap = document.getElementsByClassName('current-map')
    const bo3IntermissionBackgroundMap = document.getElementsByClassName('bo3-intermission-background-video')
    if (overlaySetup.seriesLengthSelection === 1) {        
        if (overlaySetup.teamASeriesScore !== 2 && overlaySetup.teamBSeriesScore !== 2) {
            for (const element of currentMap) {
                element.textContent = `Map ${overlaySetup.mapNumber+1} - ${overlaySetup.mapPicks[overlaySetup.mapNumber]}`
            }
        } else if (overlaySetup.teamASeriesScore>overlaySetup.teamBSeriesScore) {
            for (const element of currentMap) {
                element.textContent = `${overlaySetup.teamATri} ${overlaySetup.teamASeriesScore} - ${overlaySetup.teamBSeriesScore} ${overlaySetup.teamBTri}`
            }
        } else {
            for (const element of currentMap) {
                element.textContent = `${overlaySetup.teamBTri} ${overlaySetup.teamBSeriesScore} - ${overlaySetup.teamASeriesScore} ${overlaySetup.teamBTri}`
            }
        }
        if (overlaySetup.mapNumber<3) {
            Array.from(bo3IntermissionBackgroundMap).forEach((element, i) => {
                if (i === overlaySetup.mapNumber) {
                    element.style.opacity = 100
                } else {
                    element.style.opacity = 0
                }
            })
        }    
    }
    // Shows/Hides map results for finished maps on map veto and intermission overlay
    Array.from(scheduleResultOverlays).forEach((element, i) => {
        if (Number(i)+1<=overlaySetup.mapNumber) {
            element.style.display = 'flex'
        }
        else {
            element.style.display = 'none'
        }
    })
    // Sets logos on intermission screen 
    const intermissionDefTeams = document.getElementsByClassName('bo3-def-logo')
    const intermissionAttackTeams = document.getElementsByClassName('bo3-attack-logo')
    overlaySetup.mapPicksSides.forEach((team, i) => {
        if (team === 'team-a') {
            intermissionDefTeams[i].className = intermissionDefTeams[i].className.replace(/(team-a|team-b)/g, `team-a`)
            intermissionAttackTeams[i].className = intermissionAttackTeams[i].className.replace(/(team-a|team-b)/g, `team-b`)
        } else {
            intermissionDefTeams[i].className = intermissionDefTeams[i].className.replace(/(team-a|team-b)/g, `team-b`)
            intermissionAttackTeams[i].className = intermissionAttackTeams[i].className.replace(/(team-a|team-b)/g, `team-a`)
        }
    })
    // Sets map pick team names on intermission overlay
    const pickNamesIntermission = document.getElementsByClassName('bo3-pick-team-intermission')
    overlaySetup.mapPicksTeams.forEach((pick, i) => {
        pickNamesIntermission[i].className = pickNamesIntermission[i].className.replace(/(team-a|team-b)/g, `${pick}`)
    })
    // Sets map names and images for each map pick on map veto overlay and intermission overlay
    const pickImgsIntermission = document.getElementsByClassName('bo3-pick-img-intermission')
    overlaySetup.mapPicks.forEach((pick, i) => {
        pickImgsIntermission[i].src = `assets/Maps/${pick}_524x214.png`
        bo3IntermissionBackgroundMap[i].src = `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`
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

function playAllVideo() {
    const AllVideos = document.getElementsByClassName('video')
    for (const element of AllVideos) {
        element.play()
    }
}
function pauseAllVideo() {
    const AllVideos = document.getElementsByClassName('video')
    for (const element of AllVideos) {
        element.pause()
    }
}