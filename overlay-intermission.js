let socket
let overlaySetup = {}
let gameEvent = {}
let timer = null
let deadline = null
let countdown = null
const intermissionHeading = document.getElementById('intermission-heading')

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

    // Schedule
    document.documentElement.style.setProperty('--numberOfMatches', overlaySetup.numberOfMatches)
    document.documentElement.style.setProperty('--sbg1', overlaySetup.sbg1)
    document.documentElement.style.setProperty('--sbg2', overlaySetup.sbg2)

    function setMatchScheduleContent(matchNumber) {
        let matchLength = ''
        if (overlaySetup.matchSchedule[matchNumber].seriesLengthSelection === 0) {
            matchLength = 'BO1'
        } else if (overlaySetup.matchSchedule[matchNumber].seriesLengthSelection === 1) {
            matchLength = 'BO3'
        } else if (overlaySetup.matchSchedule[matchNumber].seriesLengthSelection === 2) {
            matchLength = 'BO5'
        }

        document.getElementById(`match-${matchNumber+1}-schedule-heading-top`).textContent = `Match ${matchNumber+1} - ${matchLength}`
        document.getElementById(`match-${matchNumber+1}-schedule-heading-bottom`).textContent = `${overlaySetup.matchSchedule[matchNumber].matchHeading}`

        if (overlaySetup.matchSchedule[matchNumber].teamAScore === 0 && overlaySetup.matchSchedule[matchNumber].teamBScore === 0) {
            document.getElementById(`match-${matchNumber+1}-schedule-score-vs`).textContent = 'VS'
            document.getElementById(`match-${matchNumber+1}-schedule-score-vs`).style.width = '150px'
        } else if (overlaySetup.matchSchedule[matchNumber].teamAScore !== 0 || overlaySetup.matchSchedule[matchNumber].teamBScore !== 0) {
            document.getElementById(`match-${matchNumber+1}-schedule-score-vs`).textContent = `${overlaySetup.matchSchedule[matchNumber].teamAScore} - ${overlaySetup.matchSchedule[matchNumber].teamBScore}`
            document.getElementById(`match-${matchNumber+1}-schedule-score-vs`).style.width = 'fit-content'
        }
        
        if (overlaySetup.matchSchedule[matchNumber].teamASelection === 0) {
            document.getElementById(`match-${matchNumber+1}-schedule-team-a-tbd`).style.display = 'flex'
            document.getElementById(`match-${matchNumber+1}-schedule-team-a`).style.display = 'none'
        } else {
            document.getElementById(`match-${matchNumber+1}-schedule-team-a-tbd`).style.display = 'none'
            document.getElementById(`match-${matchNumber+1}-schedule-team-a`).style.display = 'flex'
        }
        if (overlaySetup.matchSchedule[matchNumber].teamBSelection === 0) {
            document.getElementById(`match-${matchNumber+1}-schedule-team-b-tbd`).style.display = 'flex'
            document.getElementById(`match-${matchNumber+1}-schedule-team-b`).style.display = 'none'
        } else {
            document.getElementById(`match-${matchNumber+1}-schedule-team-b-tbd`).style.display = 'none'
            document.getElementById(`match-${matchNumber+1}-schedule-team-b`).style.display = 'flex'
        }

        for (instance of document.getElementsByClassName(`apply-match-${matchNumber+1}-team-a-logo`)) {
            instance.src = overlaySetup.matchSchedule[matchNumber].teamALogo
        }
        for (instance of document.getElementsByClassName(`apply-match-${matchNumber+1}-team-b-logo`)) {
            instance.src = overlaySetup.matchSchedule[matchNumber].teamBLogo
        }
        for (instance of document.getElementsByClassName(`apply-match-${matchNumber+1}-team-a-tri`)) {
            instance.textContent = overlaySetup.matchSchedule[matchNumber].teamATri
        }
        for (instance of document.getElementsByClassName(`apply-match-${matchNumber+1}-team-b-tri`)) {
            instance.textContent = overlaySetup.matchSchedule[matchNumber].teamBTri
        }
    }

    setMatchScheduleContent(0)
    setMatchScheduleContent(1)
    setMatchScheduleContent(2)
    setMatchScheduleContent(3)
    setMatchScheduleContent(4)
    setMatchScheduleContent(5)

    if (overlaySetup.numberOfMatches === 1) {
        document.documentElement.style.setProperty('--logoMaxSize', '130px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'block')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '30pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '17pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '50pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '270px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '272px')

        document.getElementById('match-2-schedule-content').style.display = 'none'
        document.getElementById('match-3-schedule-content').style.display = 'none'
        document.getElementById('match-4-schedule-content').style.display = 'none'
        document.getElementById('match-5-schedule-content').style.display = 'none'
        document.getElementById('match-6-schedule-content').style.display = 'none'
    } else if (overlaySetup.numberOfMatches === 2) {
        document.documentElement.style.setProperty('--logoMaxSize', '130px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'block')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '30pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '17pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '50pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '105px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '110px')

        document.getElementById('match-2-schedule-content').style.display = 'grid'
        document.getElementById('match-3-schedule-content').style.display = 'none'
        document.getElementById('match-4-schedule-content').style.display = 'none'
        document.getElementById('match-5-schedule-content').style.display = 'none'
        document.getElementById('match-6-schedule-content').style.display = 'none'
    } else if (overlaySetup.numberOfMatches === 3) {
        document.documentElement.style.setProperty('--logoMaxSize', '120px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'block')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '24pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '13pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '50pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '57px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '59px')

        document.getElementById('match-2-schedule-content').style.display = 'grid'
        document.getElementById('match-3-schedule-content').style.display = 'grid'
        document.getElementById('match-4-schedule-content').style.display = 'none'
        document.getElementById('match-5-schedule-content').style.display = 'none'
        document.getElementById('match-6-schedule-content').style.display = 'none'
    } else if (overlaySetup.numberOfMatches === 4) {
        document.documentElement.style.setProperty('--logoMaxSize', '100px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'block')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '20pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '13pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '50pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '33px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '36px')

        document.getElementById('match-2-schedule-content').style.display = 'grid'
        document.getElementById('match-3-schedule-content').style.display = 'grid'
        document.getElementById('match-4-schedule-content').style.display = 'grid'
        document.getElementById('match-5-schedule-content').style.display = 'none'
        document.getElementById('match-6-schedule-content').style.display = 'none'
    } else if (overlaySetup.numberOfMatches === 5) {
        document.documentElement.style.setProperty('--logoMaxSize', '100px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'none')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '20pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '10pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '30pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '26px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '30px')

        document.getElementById('match-2-schedule-content').style.display = 'grid'
        document.getElementById('match-3-schedule-content').style.display = 'grid'
        document.getElementById('match-4-schedule-content').style.display = 'grid'
        document.getElementById('match-5-schedule-content').style.display = 'grid'
        document.getElementById('match-6-schedule-content').style.display = 'none'
    } else if (overlaySetup.numberOfMatches === 6) {
        document.documentElement.style.setProperty('--logoMaxSize', '80px')
        document.documentElement.style.setProperty('--matchScheduleDisplay', 'none')
        document.documentElement.style.setProperty('--matchScheduleTeamsFontSize', '20pt')
        document.documentElement.style.setProperty('--matchScheduleInfoFontSize', '10pt')
        document.documentElement.style.setProperty('--matchScheduleScoresFontSize', '30pt')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginTop', '16px')
        document.documentElement.style.setProperty('--matchScheduleHeadingMarginBottom', '20px')

        document.getElementById('match-2-schedule-content').style.display = 'grid'
        document.getElementById('match-3-schedule-content').style.display = 'grid'
        document.getElementById('match-4-schedule-content').style.display = 'grid'
        document.getElementById('match-5-schedule-content').style.display = 'grid'
        document.getElementById('match-6-schedule-content').style.display = 'grid'
    }

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

    // Shows intermission schedule for BO1/BO3/BO5
    if (overlaySetup.scheduleSelection === 0) {
        if (overlaySetup.seriesLengthSelection === 0) {
            document.getElementById('broadcast-schedule-intermission').style.display = 'none'
            document.getElementById('bo1-intermission').style.display = 'grid'
            document.getElementById('bo1-bg-videos').style.display = 'grid'
            document.getElementById('bo3-intermission').style.display = 'none'
            document.getElementById('bo3-bg-videos').style.display = 'none'
            document.getElementById('bo5-intermission').style.display = 'none'
            document.getElementById('bo5-bg-videos').style.display = 'none'
        } else if (overlaySetup.seriesLengthSelection === 1) {
            document.getElementById('broadcast-schedule-intermission').style.display = 'none'
            document.getElementById('bo1-intermission').style.display = 'none'
            document.getElementById('bo1-bg-videos').style.display = 'none'
            document.getElementById('bo3-intermission').style.display = 'grid'
            document.getElementById('bo3-bg-videos').style.display = 'grid'
            document.getElementById('bo5-intermission').style.display = 'none'
            document.getElementById('bo5-bg-videos').style.display = 'none'
        } else if (overlaySetup.seriesLengthSelection === 2) {
            document.getElementById('broadcast-schedule-intermission').style.display = 'none'
            document.getElementById('bo1-intermission').style.display = 'none'
            document.getElementById('bo1-bg-videos').style.display = 'none'
            document.getElementById('bo3-intermission').style.display = 'none'
            document.getElementById('bo3-bg-videos').style.display = 'none'
            document.getElementById('bo5-intermission').style.display = 'grid'
            document.getElementById('bo5-bg-videos').style.display = 'grid'
        }

        document.getElementById('intermission-heading-bottom-left').style.display = 'flex'
    } else if (overlaySetup.scheduleSelection === 1) {
        document.getElementById('broadcast-schedule-intermission').style.display = 'grid'
        document.getElementById('bo1-intermission').style.display = 'none'
        document.getElementById('bo3-intermission').style.display = 'none'
        document.getElementById('bo5-intermission').style.display = 'none'
        if (overlaySetup.seriesLengthSelection === 0) {
            document.getElementById('bo1-bg-videos').style.display = 'grid'
            document.getElementById('bo3-bg-videos').style.display = 'none'
            document.getElementById('bo5-bg-videos').style.display = 'none'
        } else if (overlaySetup.seriesLengthSelection === 1) {
            document.getElementById('bo1-bg-videos').style.display = 'none'
            document.getElementById('bo3-bg-videos').style.display = 'grid'
            document.getElementById('bo5-bg-videos').style.display = 'none'
        } else if (overlaySetup.seriesLengthSelection === 2) {
            document.getElementById('bo1-bg-videos').style.display = 'none'
            document.getElementById('bo3-bg-videos').style.display = 'none'
            document.getElementById('bo5-bg-videos').style.display = 'grid'
        }

        document.getElementById('intermission-heading-bottom-left').style.display = 'none'
    }

    // Sets logos on intermission screen
    if (overlaySetup.seriesLengthSelection === 0) {
        overlaySetup.mapPicksSides.forEach((team, i) => {
            if (team === 'team-a') {
                document.getElementsByClassName('bo1-def-logo')[i].className = document.getElementsByClassName('bo1-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo1-atk-logo')[i].className = document.getElementsByClassName('bo1-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo1-def-name')[i].className = document.getElementsByClassName('bo1-def-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo1-atk-name')[i].className = document.getElementsByClassName('bo1-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
    
            } else {
                document.getElementsByClassName('bo1-def-logo')[i].className = document.getElementsByClassName('bo1-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo1-atk-logo')[i].className = document.getElementsByClassName('bo1-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo1-def-name')[i].className = document.getElementsByClassName('bo1-def-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo1-atk-name')[i].className = document.getElementsByClassName('bo1-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 1) {
        overlaySetup.mapPicksSides.forEach((team, i) => {
            if (team === 'team-a') {
                document.getElementsByClassName('bo3-def-logo')[i].className = document.getElementsByClassName('bo3-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo3-atk-logo')[i].className = document.getElementsByClassName('bo3-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo3-def-name')[i].className = document.getElementsByClassName('bo3-def-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo3-atk-name')[i].className = document.getElementsByClassName('bo3-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
    
            } else {
                document.getElementsByClassName('bo3-def-logo')[i].className = document.getElementsByClassName('bo3-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo3-atk-logo')[i].className = document.getElementsByClassName('bo3-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo3-def-name')[i].className = document.getElementsByClassName('bo3-def-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo3-atk-name')[i].className = document.getElementsByClassName('bo3-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 2) {
        overlaySetup.mapPicksSides.forEach((team, i) => {
            if (team === 'team-a') {
                document.getElementsByClassName('bo5-def-logo')[i].className = document.getElementsByClassName('bo5-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo5-atk-logo')[i].className = document.getElementsByClassName('bo5-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo5-def-name')[i].className = document.getElementsByClassName('bo5-def-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo5-atk-name')[i].className = document.getElementsByClassName('bo5-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
    
            } else {
                document.getElementsByClassName('bo5-def-logo')[i].className = document.getElementsByClassName('bo5-def-logo')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo5-atk-logo')[i].className = document.getElementsByClassName('bo5-atk-logo')[i].className.replace(/(team-a|team-b)/g, `team-a`)
                document.getElementsByClassName('bo5-def-name')[i].className = document.getElementsByClassName('bo5-def-name')[i].className.replace(/(team-a|team-b)/g, `team-b`)
                document.getElementsByClassName('bo5-atk-name')[i].className = document.getElementsByClassName('bo5-atk-name')[i].className.replace(/(team-a|team-b)/g, `team-a`)
            }
        })
    }

    // Updates scores for every complete map on intermission overlay
    if (overlaySetup.seriesLengthSelection === 0) {
        for (element of document.getElementsByClassName('apply-map-1-score-intermission')) {
            const triCodesCount = overlaySetup.teamATri + overlaySetup.teamBTri
            if (triCodesCount.length>6 || triCodesCount.includes('W') || triCodesCount.includes('M  ')) {
                document.getElementById('bo1-schedule-score').style.fontSize = '12pt'
            } else {
                document.getElementById('bo1-schedule-score').style.fontSize = '15pt'
            }
            element.textContent = `${overlaySetup.mapScores[0]} - ${overlaySetup.mapScores[1]}`
        }
    } else if (overlaySetup.seriesLengthSelection === 1) {
        overlaySetup.mapPicks.forEach((map, i) => {
            const bo3MapResultOverlays = document.getElementsByClassName('bo3-schedule-result-overlay')
            if (overlaySetup.mapScores[(i*2)+1] + overlaySetup.mapScores[i*2] === 0) {
                bo3MapResultOverlays[i].textContent = ""
            } else if (document.getElementsByClassName('bo3-def-logo')[i].classList.contains('apply-team-a-logo')) {
                bo3MapResultOverlays[i].textContent = `${overlaySetup.mapScores[(i*2)+1]} - ${overlaySetup.mapScores[i*2]}`
            } else {
                bo3MapResultOverlays[i].textContent = `${overlaySetup.mapScores[i*2]} - ${overlaySetup.mapScores[(i*2)+1]}`
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 2) {
        overlaySetup.mapPicks.forEach((map, i) => {
            const bo5MapResultOverlays = document.getElementsByClassName('bo5-schedule-result-overlay')
            if (overlaySetup.mapScores[(i*2)+1] + overlaySetup.mapScores[i*2] === 0) {
                bo5MapResultOverlays[i].textContent = ""
            } else if (document.getElementsByClassName('bo5-def-logo')[i].classList.contains('apply-team-a-logo')) {
                bo5MapResultOverlays[i].textContent = `${overlaySetup.mapScores[(i*2)+1]} - ${overlaySetup.mapScores[i*2]}`
            } else {
                bo5MapResultOverlays[i].textContent = `${overlaySetup.mapScores[i*2]} - ${overlaySetup.mapScores[(i*2)+1]}`
            }
        })
    }

    // Updates current map on intermission overlay
    const currentMap = document.getElementById('current-map')
    const bo3IntermissionBackgroundMap = document.getElementsByClassName('bo3-intermission-background-video')
    const bo5IntermissionBackgroundMap = document.getElementsByClassName('bo5-intermission-background-video')
    if (overlaySetup.seriesLengthSelection === 0) {
        document.getElementById('bo1-intermission-schedule-map-pick').textContent = `${overlaySetup.mapPicks[0]}`
        if (overlaySetup.teamASeriesScore !== 1 && overlaySetup.teamBSeriesScore !== 1) {
            currentMap.textContent = `BO1 - ${overlaySetup.mapPicks[overlaySetup.mapNumber]}`
        } else if (overlaySetup.teamASeriesScore>overlaySetup.teamBSeriesScore) {
            currentMap.textContent = `${overlaySetup.teamATri} ${overlaySetup.mapScores[0]} - ${overlaySetup.mapScores[1]} ${overlaySetup.teamBTri}`
        } else {
            currentMap.textContent = `${overlaySetup.teamBTri} ${overlaySetup.mapScores[1]} - ${overlaySetup.mapScores[0]} ${overlaySetup.teamATri}`
        }
    } else if (overlaySetup.seriesLengthSelection === 1) {        
        if (overlaySetup.teamASeriesScore !== 2 && overlaySetup.teamBSeriesScore !== 2) {
            currentMap.textContent = `Map ${overlaySetup.mapNumber+1} - ${overlaySetup.mapPicks[overlaySetup.mapNumber]}`
        } else if (overlaySetup.teamASeriesScore>overlaySetup.teamBSeriesScore) {
            currentMap.textContent = `${overlaySetup.teamATri} ${overlaySetup.teamASeriesScore} - ${overlaySetup.teamBSeriesScore} ${overlaySetup.teamBTri}`
        } else {
            currentMap.textContent = `${overlaySetup.teamBTri} ${overlaySetup.teamBSeriesScore} - ${overlaySetup.teamASeriesScore} ${overlaySetup.teamATri}`
        }
        Array.from(bo3IntermissionBackgroundMap).forEach((element, i) => {
            if (i === overlaySetup.mapNumber) {
                element.style.opacity = 100
            } else {
                element.style.opacity = 0
            }
        })
        if (overlaySetup.mapNumber === 3) {
            bo3IntermissionBackgroundMap[2].style.opacity = 100
        }
    } else if (overlaySetup.seriesLengthSelection === 2) {
        if (overlaySetup.teamASeriesScore !== 3 && overlaySetup.teamBSeriesScore !== 3) {
            currentMap.textContent = `Map ${overlaySetup.mapNumber+1} - ${overlaySetup.mapPicks[overlaySetup.mapNumber]}`
        } else if (overlaySetup.teamASeriesScore>overlaySetup.teamBSeriesScore) {
            currentMap.textContent = `${overlaySetup.teamATri} ${overlaySetup.teamASeriesScore} - ${overlaySetup.teamBSeriesScore} ${overlaySetup.teamBTri}`
        } else {
            currentMap.textContent = `${overlaySetup.teamBTri} ${overlaySetup.teamBSeriesScore} - ${overlaySetup.teamASeriesScore} ${overlaySetup.teamATri}`
        }
        Array.from(bo5IntermissionBackgroundMap).forEach((element, i) => {
            if (i === overlaySetup.mapNumber) {
                element.style.opacity = 100
            } else {
                element.style.opacity = 0
            }
        })
        if (overlaySetup.mapNumber === 5) {
            bo5IntermissionBackgroundMap[4].style.opacity = 100
        }
    }

    // Sets map pick team names on intermission overlay
    if (overlaySetup.seriesLengthSelection === 1) {
        const bo3pickNamesIntermission = document.getElementsByClassName('bo3-pick-team-intermission')
        overlaySetup.mapPicksTeams.forEach((pick, i) => {
            bo3pickNamesIntermission[i].className = bo3pickNamesIntermission[i].className.replace(/(team-a|team-b)/g, `${pick}`)
        })
    } else if (overlaySetup.seriesLengthSelection === 2) {
        const bo5pickNamesIntermission = document.getElementsByClassName('bo5-pick-team-intermission')
        overlaySetup.mapPicksTeams.forEach((pick, i) => {
            bo5pickNamesIntermission[i].className = bo5pickNamesIntermission[i].className.replace(/(team-a|team-b)/g, `${pick}`)
        })
    }
    
    // Sets map names and images for each map pick on map veto overlay and intermission overlay
    if (overlaySetup.seriesLengthSelection === 0) {
        overlaySetup.mapPicks.forEach((pick, i) => {
            document.getElementById('bo1-pick-img-intermission').style.backgroundImage = `url(assets/Maps/${pick}_1080p.png)`
            if (document.getElementById('bo1-intermission-background-video').src !== `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`) {
                document.getElementById('bo1-intermission-background-video').src = `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 1) {
        overlaySetup.mapPicks.forEach((pick, i) => {
            document.getElementsByClassName('bo3-pick-img-intermission')[i].src = `assets/Maps/${pick}_524x214.png`
            if (bo3IntermissionBackgroundMap[i].src !== `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`) {
                bo3IntermissionBackgroundMap[i].src = `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`
            }
        })
    } else if (overlaySetup.seriesLengthSelection === 2) {
        overlaySetup.mapPicks.forEach((pick, i) => {
            document.getElementsByClassName('bo5-pick-img-intermission')[i].src = `assets/Maps/${pick}_524x214.png`
            if (bo5IntermissionBackgroundMap[i].src !== `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`) {
                bo5IntermissionBackgroundMap[i].src = `https://github.com/caleb-cb/community-caster-overlay-videos/blob/main/${pick}_Cinematic.webm?raw=true`
            }
        })
    }

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

    // Intermission Heading
    if (overlaySetup.intermissionState === 0) {
        intermissionDefault()
    } else if (overlaySetup.intermissionState === 1) {
        intermissionTech()
    } else {
        if (timer !=null) {
            clearTimeout(timer)
            timer = null
        }
        if (countdown !=null) {
            clearInterval(countdown)
            countdown = null
        }
        deadline = overlaySetup.deadline
        countdownTimer()
        countdown = setInterval(countdownTimer, 1000)
    }
}

function intermissionDefault() {
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    if (overlaySetup.mapNumber === 0) {
        if (intermissionHeading.innerHTML.includes('Starting Soon') === false) {
            intermissionHeading.innerHTML = 'Starting Soon'
            intermissionHeading.style.width = '253px'
        } else if (intermissionHeading.innerHTML.length > 15) {
            intermissionHeading.innerHTML = 'Starting Soon'
            intermissionHeading.style.width = '253px'
        } else {
            intermissionHeading.innerHTML += '.'
            intermissionHeading.style.width = '253px'
        }
        timer = setTimeout(intermissionDefault, 500)
    } else if ((((overlaySetup.seriesLengthSelection === 0) && (overlaySetup.teamASeriesScore === 1 || overlaySetup.teamBSeriesScore === 1)) || ((overlaySetup.seriesLengthSelection === 1) && (overlaySetup.teamASeriesScore === 2 || overlaySetup.teamBSeriesScore === 2)) || ((overlaySetup.seriesLengthSelection === 2) && (overlaySetup.teamASeriesScore === 3 || overlaySetup.teamBSeriesScore === 3)))
    && (((overlaySetup.numberOfMatches !== 1) && (overlaySetup.matchSchedule[overlaySetup.numberOfMatches-1].teamAScore + overlaySetup.matchSchedule[overlaySetup.numberOfMatches-1].teamBScore === 0)))) {
        if (intermissionHeading.innerHTML.includes('Setting Up Next Match') === false) {
            intermissionHeading.innerHTML = `Setting Up Next Match`
            intermissionHeading.style.width = '375px'
        } else if (intermissionHeading.innerHTML.includes('...')) {
            intermissionHeading.innerHTML = `Setting Up Next Match`
            intermissionHeading.style.width = '375px'
        } else {
            intermissionHeading.innerHTML += '.'
            intermissionHeading.style.width = '375px'
        }
        timer = setTimeout(intermissionDefault, 500)
    } else if (((overlaySetup.seriesLengthSelection === 0) && (overlaySetup.teamASeriesScore === 1 || overlaySetup.teamBSeriesScore === 1)) || ((overlaySetup.seriesLengthSelection === 1) && (overlaySetup.teamASeriesScore === 2 || overlaySetup.teamBSeriesScore === 2)) || ((overlaySetup.seriesLengthSelection === 2) && (overlaySetup.teamASeriesScore === 3 || overlaySetup.teamBSeriesScore === 3))
    ) {
        if (intermissionHeading.innerHTML.includes('Ending Soon') === false) {
            intermissionHeading.innerHTML = 'Ending Soon'
            intermissionHeading.style.width = '222px'
        } else if (intermissionHeading.innerHTML.includes('...')) {
            intermissionHeading.innerHTML = 'Ending Soon'
            intermissionHeading.style.width = '222px'
        } else {
            intermissionHeading.innerHTML += '.'
            intermissionHeading.style.width = '222px'
        }
        timer = setTimeout(intermissionDefault, 500)
    } else {
        if (intermissionHeading.innerHTML.includes('Waiting For Players') === false) {
            intermissionHeading.innerHTML = 'Waiting For Players'
            intermissionHeading.style.width = '350px'
        } else if (intermissionHeading.innerHTML.length > 21) {
            intermissionHeading.innerHTML = 'Waiting For Players'
            intermissionHeading.style.width = '350px'
        } else {
            intermissionHeading.innerHTML += '.'
            intermissionHeading.style.width = '350px'
        }
        timer = setTimeout(intermissionDefault, 500)
    }

    // Sponsor Logo
    if (overlaySetup.sponsorLogo) {
      document.getElementById('sponsor-logo-intermission').src = overlaySetup.sponsorLogo
      if (sponsorLogoTimer === null) {
        sponsorLogoTimer = setTimeout(setSponsorLogo, 10000)
      }
    } else {
      sponsorLogoTimer = null
      document.getElementById('event-logo-intermission').style.opacity = 1
      document.getElementById('sponsor-logo-intermission').style.opacity = 0
    }
}

function intermissionTech() {
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    if (intermissionHeading.innerHTML.includes('Tech Pause') === false) {
        intermissionHeading.innerHTML = 'Tech Pause'
        intermissionHeading.style.width = '198px'
    } else if (intermissionHeading.innerHTML.length > 12) {
        intermissionHeading.innerHTML = 'Tech Pause'
        intermissionHeading.style.width = '198px'

    } else {
        intermissionHeading.innerHTML += '.'
        intermissionHeading.style.width = '198px'
    }
    timer = setTimeout(intermissionTech, 500)
}



function countdownTimer() {
    intermissionHeading.style.width = '321px'
    let t = deadline - Date.now() + 500
    // console.log(t)
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
    let seconds = Math.floor((t % (1000 * 60)) / 1000).toString().padStart(2, '0')

    // minutes = `${minutes}`
    // seconds = `${seconds}`
    // minutes = minutes.padStart(2, '0')
    // seconds = seconds.padStart(2, '0')

    // if (Number(t)<0) {
    //     clearInterval(countdown)
    //     countdown = null
    //     intermissionDefault()
    // }

    intermissionHeading.innerHTML = "Intermission - " + minutes + ":" + seconds

    if (minutes === '-1' && seconds === '-1') {
        clearInterval(countdown)
        countdown = null
        intermissionDefault()
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

let sponsorLogoTimer = null
let sponsorLogoState = 0

function setSponsorLogo() {
  if (sponsorLogoState === 0) {
    document.getElementById('event-logo-intermission').style.opacity = 0
    document.getElementById('sponsor-logo-intermission').style.opacity = 1

    sponsorLogoState = 1
  } else {
    document.getElementById('event-logo-intermission').style.opacity = 1
    document.getElementById('sponsor-logo-intermission').style.opacity = 0
    sponsorLogoState = 0
  }

  sponsorLogoTimer = setTimeout(setSponsorLogo, 10000)
}