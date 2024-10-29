let socket
let overlaySetup = {}
let currentGame = {
    gameState: "InProgress",
    roundPhase: "combat",
    spikeState: "SpikePlanted",
    observing: "",
    teamAScore: 0,
    teamBScore: 0,
    roundNumber: 0,
    gameHalf: 0,
    currentGamePlayers: [],
}
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
        // if (serverMessage.gameEvent) {
        //     let gameEvent = serverMessage.gameEvent
        //     console.log(gameEvent.event, gameEvent)
        //     processGameEvent(gameEvent)
        // }
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

function processGameEvent(gameEvent) {
    // Process Scoreboard
    if (gameEvent.event === "scoreboard" && currentGame.gameState !== "WaitingPostMatch") {
        gameEvent.data = JSON.parse(gameEvent.data)
        let playerData = currentGame.currentGamePlayers[Number(gameEvent.eventIndex)] 
        if (!playerData) {
            playerData = {
                name: gameEvent.data.name,
                playerID: gameEvent.data.player_id,
                agent: gameEvent.data.character,
                team: gameEvent.data.team === 1?"team-a":"team-b",
                buyPhaseToggle: 1,
                creditsBuyPhase: 800,
            }
            currentGame.currentGamePlayers[Number(gameEvent.eventIndex)] = playerData
        }
        playerData.alive = gameEvent.data.alive
        playerData.kills = gameEvent.data.kills
        playerData.deaths = gameEvent.data.deaths
        playerData.assists = gameEvent.data.assists
        playerData.ultMax = gameEvent.data.ult_max
        playerData.ultPoints = gameEvent.data.ult_points
        playerData.credits = gameEvent.data.money
        playerData.shield = gameEvent.data.shield
        playerData.weapon = gameEvent.data.weapon
        playerData.spike = gameEvent.data.spike

        if (playerData.buyPhaseToggle === 1) {
            playerData.creditsBuyPhase = gameEvent.data.money
            playerData.buyPhaseToggle = 0
        }
        
        console.log(`Processed ${playerData.team} player-${Number(gameEvent.eventIndex)} ${playerData.agent} | Events left to process: ${gameEventQueue.length-1}`, playerData)
    }

    // Process Round Phase
    if (gameEvent.event === "round_phase") {
        currentGame.roundPhase = gameEvent.data
        if (gameEvent.data === "game_start") {
            for (const player of currentGame.currentGamePlayers) {
                if (player) {
                    player.buyPhaseToggle = 1
                }
            }
            currentGame.spikeState = "SpikeNotPlanted"
        }
        console.log(`Processed ${gameEvent.event} - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }

    // Process Game State
    if (gameEvent.event === "scene") {
        if (gameEvent.data === "CharacterSelectPersistentLevel") {
            currentGame.gameState = "CharacterSelectPersistentLevel"
            currentGame.currentGamePlayers = []
            currentGame.gameHalf = 0
        }
        console.log(`Processed Game Phase - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }
    if (gameEvent.event === "state") {
        if (gameEvent.data === "WaitingToStart") {
            currentGame.gameState = "WaitingToStart"
            console.log(`Processed Game Phase - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
        }
        if (gameEvent.data === "InProgress") {
            currentGame.gameState = "InProgress"
            console.log(`Processed Game Phase - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
        }
        if (gameEvent.data === "WaitingPostMatch") {
            currentGame.gameState = "WaitingPostMatch"
            console.log(`Processed Game Phase - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
        }
    }

    // Process Game Score
    if (gameEvent.event === "match_score") {
        gameEvent.data = JSON.parse(gameEvent.data)
        currentGame.teamAScore = gameEvent.data.team_1
        currentGame.teamBScore = gameEvent.data.team_0
        console.log(`Processed Game Score - ${gameEvent.data.team_1}-${gameEvent.data.team_0} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }

    // Process Round Number
    if (gameEvent.event === "round_number") {
        currentGame.roundNumber = Number(gameEvent.data)
        console.log(`Processed Round Number - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }

    // Process Game Half
    if (gameEvent.event === "team") {
        currentGame.gameHalf++
        console.log(`Processed Team - Side Change | Events left to process: ${gameEventQueue.length-1}`, gameEvent)

    }

    // Process Spike Events
    if (gameEvent.event === "spike_planted") {
        currentGame.spikeState = "SpikePlanted"
        console.log(`Processed ${gameEvent.event} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }
    if (gameEvent.event === "spike_detonated") {
        currentGame.spikeState = "SpikeDetonated"
        console.log(`Processed ${gameEvent.event} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }
    if (gameEvent.event === "spike_defused") {
        currentGame.spikeState = "SpikeDefused"
        console.log(`Processed ${gameEvent.event} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }

    if (gameEvent.event === "observing") {
        currentGame.observing = gameEvent.data
        console.log(`Processed ${gameEvent.event} - ${gameEvent.data} | Events left to process: ${gameEventQueue.length-1}`, gameEvent)
    }

    gameEventQueue.splice(0, 1)
    setOverlay()
}

function setOverlay() {
    const teamAPlayers = []
    const teamBPlayers = []
    for (const player of currentGame.currentGamePlayers) {
        if (player && player.team === "team-a") {
            teamAPlayers.push(player)
        }
    }
    for (const player of currentGame.currentGamePlayers) {
        if (player && player.team === "team-b") {
            teamBPlayers.push(player)
        }
    }

    // ################
    // ##### Misc #####
    // ################
    // Team/Game Rounds
    document.getElementById('overlay-heading-team-a-score').textContent = currentGame.teamAScore
    document.getElementById('overlay-heading-team-b-score').textContent = currentGame.teamBScore
    document.getElementById('overlay-heading-round-number').textContent = `ROUND ${currentGame.roundNumber}`

    //Round Phase
    if (currentGame.roundPhase === 'shopping') {
        document.getElementById('overlay-heading-spike-icon').style.transform = 'translateY(63px) scale(0.83)'
        document.getElementById('overlay-heading-spike-icon-2').style.transform = 'translateY(63px) scale(0.83)'
        document.getElementById('overlay-heading-spike-icon-2').style.opacity = '1'
        document.getElementById('overlay-heading-timer-cover').style.height = '0px'
        document.getElementById('combat-overlay-team-a').style.transform = 'translateX(-330px)'
        document.getElementById('combat-overlay-team-a').style.opacity = '0'
        document.getElementById('combat-overlay-team-b').style.transform = 'translateX(330px)'
        document.getElementById('combat-overlay-team-b').style.opacity = '0'
        document.getElementById('scoreboard').style.transform = ''
        document.getElementById('scoreboard').style.opacity = '1'
    }
    if (currentGame.roundPhase === 'combat') {
        document.getElementById('combat-overlay-team-a').style.transform = ''
        document.getElementById('combat-overlay-team-a').style.opacity = '1'
        document.getElementById('combat-overlay-team-b').style.transform = ''
        document.getElementById('combat-overlay-team-b').style.opacity = '1'
        document.getElementById('scoreboard').style.transform = 'translateY(460px)'
        document.getElementById('scoreboard').style.opacity = '0'
    }
    if (currentGame.spikeState === 'SpikePlanted') {
        document.getElementById('overlay-heading-spike-icon').style.transform = ''
        document.getElementById('overlay-heading-spike-icon-2').style.transform = ''
        document.getElementById('overlay-heading-spike-icon-2').style.opacity = '0'
        document.getElementById('overlay-heading-timer-cover').style.height = '140px'
    }
    if (currentGame.spikeState === 'SpikeDefused' || currentGame.spikeState === 'SpikeDetonated') {
        document.getElementById('overlay-heading-spike-icon').style.transform = 'translateY(63px) scale(0.83)'
        document.getElementById('overlay-heading-spike-icon-2').style.transform = 'translateY(63px) scale(0.83)'
        document.getElementById('overlay-heading-spike-icon-2').style.opacity = '1'
        document.getElementById('overlay-heading-timer-cover').style.height = '0px'
    }

    // #############################
    // ##### Sets sides on IGO #####
    // #############################
    if (currentGame.gameHalf === 1) {
        document.documentElement.style.setProperty('--teamATrim', "#3CFECA")
        document.documentElement.style.setProperty('--teamBTrim', "#F64B5C")
        document.documentElement.style.setProperty('--teamABackground', "#157462")
        document.documentElement.style.setProperty('--teamBBackground', "#6E2B36")    
    } else if (currentGame.gameHalf === 2) {
        document.documentElement.style.setProperty('--teamATrim', "#F64B5C")
        document.documentElement.style.setProperty('--teamBTrim', "#3CFECA")
        document.documentElement.style.setProperty('--teamABackground', "#6E2B36")
        document.documentElement.style.setProperty('--teamBBackground', "#157462")

    }
    function setNameLogoSides() {
        if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-a') {
            document.querySelector("#scoreboard-team-a-heading-name").setAttribute("class", "scoreboard-team-name apply-team-a-name")
            document.querySelector("#scoreboard-team-b-heading-name").setAttribute("class", "scoreboard-team-name apply-team-b-name")
            document.querySelector("#scoreboard-team-a-heading-logo").setAttribute("class", "apply-team-a-logo")
            document.querySelector("#scoreboard-team-b-heading-logo").setAttribute("class", "apply-team-b-logo")
            document.querySelector("#overlay-heading-team-a-tri").setAttribute("class", "overlay-heading-tri apply-team-a-tri")
            document.querySelector("#overlay-heading-team-b-tri").setAttribute("class", "overlay-heading-tri apply-team-b-tri")
            document.querySelector("#overlay-heading-team-a-logo").setAttribute("class", "apply-team-a-logo")
            document.querySelector("#overlay-heading-team-b-logo").setAttribute("class", "apply-team-b-logo")
        } else if (overlaySetup.mapPicksSides[overlaySetup.mapNumber] === 'team-b') {
            document.querySelector("#scoreboard-team-a-heading-name").setAttribute("class", "scoreboard-team-name apply-team-b-name")
            document.querySelector("#scoreboard-team-b-heading-name").setAttribute("class", "scoreboard-team-name apply-team-a-name")
            document.querySelector("#scoreboard-team-a-heading-logo").setAttribute("class", "apply-team-b-logo")
            document.querySelector("#scoreboard-team-b-heading-logo").setAttribute("class", "apply-team-a-logo")
            document.querySelector("#overlay-heading-team-a-tri").setAttribute("class", "overlay-heading-tri apply-team-b-tri")
            document.querySelector("#overlay-heading-team-b-tri").setAttribute("class", "overlay-heading-tri apply-team-a-tri")
            document.querySelector("#overlay-heading-team-a-logo").setAttribute("class", "apply-team-b-logo")
            document.querySelector("#overlay-heading-team-b-logo").setAttribute("class", "apply-team-a-logo")
        }
    }
    if ((overlaySetup.seriesLengthSelection === 0)) {
        setNameLogoSides()
    } else if ((overlaySetup.seriesLengthSelection === 1) && (overlaySetup.teamASeriesScore<2 && overlaySetup.teamBSeriesScore<2)) {
        setNameLogoSides()
    } else if  ((overlaySetup.seriesLengthSelection === 2) && (overlaySetup.teamASeriesScore<3 && overlaySetup.teamBSeriesScore<3)) {
        setNameLogoSides()
    }


    // ##########################
    // ##### Set Scoreboard #####
    // ##########################
    if (teamAPlayers.length !==0) {
        let teamAPlayersScoreboard = teamAPlayers
        teamAPlayersScoreboard.sort((a,b) => {
            if (b.kills-a.kills < 0) {return -1}
            if (b.kills-a.kills > 0) {return 1}
            if (a.deaths-b.deaths < 0) {return -1}
            if (a.deaths-b.deaths > 0) {return 1}
            if (b.assists-a.assists < 0) {return -1}
            if (b.assists-a.assists > 0) {return 1}
            return 0
        })

        teamAPlayersScoreboard.forEach((player, i) => {
            document.getElementById(`scoreboard-team-a-player-${i+1}-name`).textContent = player.name
            document.getElementById(`scoreboard-team-a-player-${i+1}-agent-icon`).src = `assets/Agents/${player.agent}_Icon.png`
            document.getElementById(`scoreboard-team-a-player-${i+1}-kills`).textContent = player.kills
            document.getElementById(`scoreboard-team-a-player-${i+1}-deaths`).textContent = player.deaths
            document.getElementById(`scoreboard-team-a-player-${i+1}-assists`).textContent = player.assists
            document.getElementById(`scoreboard-team-a-player-${i+1}-ability-1`).src = `assets/Agents/${player.agent}_Ability_1.png`
            document.getElementById(`scoreboard-team-a-player-${i+1}-ability-2`).src = `assets/Agents/${player.agent}_Ability_2.png`
            document.getElementById(`scoreboard-team-a-player-${i+1}-ability-3`).src = `assets/Agents/${player.agent}_Ability_3.png`
            Array.from(document.getElementsByClassName(`scoreboard-team-a-player-${i+1}-ult-icon`)).forEach(element => {
                element.src = `assets/Agents/${player.agent}_Ability_Ult.png`
            })
            if (player.ultMax > 5) {
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-dots`).src = `assets/ult_dots/Ult_Dots_${player.ultPoints}_${player.ultMax}.png`        
            }
            if (player.ultMax < 6) {
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active-background`).style.display = 'none'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-inactive`).style.display = 'flex'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-dots`).style.display = 'none'
            } else if (player.ultPoints === player.ultMax) {
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active-background`).style.display = 'flex'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active`).style.display = 'grid'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-inactive`).style.display = 'none'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-dots`).style.display = 'block'
            } else {
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active-background`).style.display = 'none'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-inactive`).style.display = 'flex'
                document.getElementById(`scoreboard-team-a-player-${i+1}-ult-dots`).style.display = 'block'
            }
            if (player.shield === 0 || player.shield > 2) {
                document.getElementById(`scoreboard-team-a-player-${i+1}-shields`).style.display = 'none'
            } else {
                document.getElementById(`scoreboard-team-a-player-${i+1}-shields`).style.display = 'block'
                document.getElementById(`scoreboard-team-a-player-${i+1}-shields`).src = `assets/Shop/Shields_${player.shield}.png`
            }
            if (player.weapon === "") {
                document.getElementById(`scoreboard-team-a-player-${i+1}-weapon`).src = `assets/Shop/knife.png`
            } else {
                document.getElementById(`scoreboard-team-a-player-${i+1}-weapon`).src = `assets/Shop/${player.weapon}.png`
            }
            document.getElementById(`scoreboard-team-a-player-${i+1}-credits`).textContent = player.credits
            if (player.creditsBuyPhase-player.credits === 0) {
                document.getElementById(`scoreboard-team-a-player-${i+1}-spent-credits`).parentElement.style.display = 'none'
            } else {
                document.getElementById(`scoreboard-team-a-player-${i+1}-spent-credits`).parentElement.style.display = 'flex'
                document.getElementById(`scoreboard-team-a-player-${i+1}-spent-credits`).textContent = player.creditsBuyPhase-player.credits
            }
        });
    }

    if (teamBPlayers.length !==0) {
        let teamBPlayersScoreboard = teamBPlayers
        teamBPlayersScoreboard.sort((a,b) => {
            if (b.kills-a.kills < 0) {return -1}
            if (b.kills-a.kills > 0) {return 1}
            if (a.deaths-b.deaths < 0) {return -1}
            if (a.deaths-b.deaths > 0) {return 1}
            if (b.assists-a.assists < 0) {return -1}
            if (b.assists-a.assists > 0) {return 1}
            return 0
        })

        teamBPlayersScoreboard.forEach((player, i) => {
            document.getElementById(`scoreboard-team-b-player-${i+1}-name`).textContent = player.name
            document.getElementById(`scoreboard-team-b-player-${i+1}-agent-icon`).src = `assets/Agents/${player.agent}_Icon.png`
            document.getElementById(`scoreboard-team-b-player-${i+1}-kills`).textContent = player.kills
            document.getElementById(`scoreboard-team-b-player-${i+1}-deaths`).textContent = player.deaths
            document.getElementById(`scoreboard-team-b-player-${i+1}-assists`).textContent = player.assists
            document.getElementById(`scoreboard-team-b-player-${i+1}-ability-1`).src = `assets/Agents/${player.agent}_Ability_1.png`
            document.getElementById(`scoreboard-team-b-player-${i+1}-ability-2`).src = `assets/Agents/${player.agent}_Ability_2.png`
            document.getElementById(`scoreboard-team-b-player-${i+1}-ability-3`).src = `assets/Agents/${player.agent}_Ability_3.png`
            Array.from(document.getElementsByClassName(`scoreboard-team-b-player-${i+1}-ult-icon`)).forEach(element => {
                element.src = `assets/Agents/${player.agent}_Ability_Ult.png`
            })
            if (player.ultMax > 5) {
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-dots`).src = `assets/ult_dots/Ult_Dots_${player.ultPoints}_${player.ultMax}.png`        
            }
            if (player.ultMax < 6) {
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active-background`).style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-inactive`).style.display = 'flex'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-dots`).style.display = 'none'
            } else if (player.ultPoints === player.ultMax) {
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active-background`).style.display = 'flex'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active`).style.display = 'grid'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-inactive`).style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-dots`).style.display = 'block'
            } else {
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active-background`).style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-inactive`).style.display = 'flex'
                document.getElementById(`scoreboard-team-b-player-${i+1}-ult-dots`).style.display = 'block'
            }
            if (player.shield === 0 || player.shield > 2) {
                document.getElementById(`scoreboard-team-b-player-${i+1}-shields`).style.display = 'none'
            } else {
                document.getElementById(`scoreboard-team-b-player-${i+1}-shields`).style.display = 'block'
                document.getElementById(`scoreboard-team-b-player-${i+1}-shields`).src = `assets/Shop/Shields_${player.shield}.png`
            }
            if (player.weapon === "") {
                document.getElementById(`scoreboard-team-b-player-${i+1}-weapon`).src = `assets/Shop/knife.png`
            } else {
                document.getElementById(`scoreboard-team-b-player-${i+1}-weapon`).src = `assets/Shop/${player.weapon}.png`
            }
            document.getElementById(`scoreboard-team-b-player-${i+1}-credits`).textContent = player.credits
            if (player.creditsBuyPhase-player.credits === 0) {
                document.getElementById(`scoreboard-team-b-player-${i+1}-spent-credits`).parentElement.style.display = 'none'
                document.getElementById(`scoreboard-team-b-player-${i+1}-credits-spacer`).style.display = 'none'
            } else {
                document.getElementById(`scoreboard-team-b-player-${i+1}-spent-credits`).parentElement.style.display = 'flex'
                document.getElementById(`scoreboard-team-b-player-${i+1}-spent-credits`).textContent = player.creditsBuyPhase-player.credits
                document.getElementById(`scoreboard-team-b-player-${i+1}-credits-spacer`).style.display = 'block'
            }
        });
    }


    // ##############################
    // ##### Set Combat Overlay #####
    // ##############################
    if (teamAPlayers.length !==0) {
        teamAPlayers.forEach((player, i) => {
            // Sets Player Content
            document.getElementById(`combat-overlay-team-a-player-${i+1}-name`).textContent = player.agent
            document.getElementById(`combat-overlay-team-a-player-${i+1}-agent-icon`).src = `assets/Agents/${player.agent}_Icon.png`
            // document.getElementById(`combat-overlay-team-a-player-${i+1}-kills`).textContent = player.kills
            // document.getElementById(`combat-overlay-team-a-player-${i+1}-deaths`).textContent = player.deaths
            // document.getElementById(`combat-overlay-team-a-player-${i+1}-assists`).textContent = player.assists
            document.getElementById(`combat-overlay-team-a-player-${i+1}-ability-1`).src = `assets/Agents/${player.agent}_Ability_1.png`
            document.getElementById(`combat-overlay-team-a-player-${i+1}-ability-2`).src = `assets/Agents/${player.agent}_Ability_2.png`
            document.getElementById(`combat-overlay-team-a-player-${i+1}-ability-3`).src = `assets/Agents/${player.agent}_Ability_3.png`
            document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-icon`).src = `assets/Agents/${player.agent}_Ability_Ult.png`
            Array.from(document.getElementsByClassName(`combat-overlay-team-a-player-${i+1}-credits`)).forEach(element => {
                element.textContent = player.credits
            })

            if (player.ultMax > 5) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-dots`).src = `assets/ult_dots/Ult_Dots_${player.ultPoints}_${player.ultMax}.png`        
            }
            if (player.ultMax < 6) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-dots`).style.display = 'none'
            } else if (player.ultPoints === player.ultMax) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-active`).style.display = 'grid'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-dots`).style.display = 'none'
            } else {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-ult-dots`).style.display = 'block'
            }
            if (player.shield === 0 || player.shield > 2) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-shield`).style.display = 'none'
            } else {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-shield`).style.display = 'block'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-shield`).src = `assets/Shop/Shields_${player.shield}.png`
            }
            if (player.weapon === "") {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-weapon`).src = `assets/Shop/knife.png`
            } else {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-weapon`).src = `assets/Shop/${player.weapon}.png`
            }

            // Sets Alive/Dead
            if (player.alive === false) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.background = '#0D1821'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.opacity = '0.3'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top`).style.transform = 'translateX(-315px)'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-trim`).style.display = 'none'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-alive`).style.display = 'none'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-dead`).style.display = 'flex' 
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-dead`).style.width = '70%' 
                document.getElementById(`combat-overlay-team-a-player-${i+1}-agent-icon`).style.filter = 'grayscale(1)'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-agent-icon`).style.opacity = '0.9'
            } else if (player.alive) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.background = '#0D1821'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top`).style.opacity = '1'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top`).style.transform = ''
                document.getElementById(`combat-overlay-team-a-player-${i+1}-trim`).style.display = 'block'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-alive`).style.display = 'grid'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-dead`).style.display = 'none' 
                document.getElementById(`combat-overlay-team-a-player-${i+1}-bottom-dead`).style.width = '' 
                document.getElementById(`combat-overlay-team-a-player-${i+1}-agent-icon`).style.filter = ''
                document.getElementById(`combat-overlay-team-a-player-${i+1}-agent-icon`).style.opacity = ''
            }

            if (player.name === currentGame.observing) {
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.background = 'linear-gradient(to right, rgba(255, 233, 157, 0.7), rgba(13, 24, 33, 0.3))'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.opacity = '1'
            }
        });
    }

    if (teamBPlayers.length !==0) {
        teamBPlayers.forEach((player, i) => {
            // Sets Player Content
            document.getElementById(`combat-overlay-team-b-player-${i+1}-name`).textContent = player.agent
            document.getElementById(`combat-overlay-team-b-player-${i+1}-agent-icon`).src = `assets/Agents/${player.agent}_Icon.png`
            // document.getElementById(`combat-overlay-team-b-player-${i+1}-kills`).textContent = player.kills
            // document.getElementById(`combat-overlay-team-b-player-${i+1}-deaths`).textContent = player.deaths
            // document.getElementById(`combat-overlay-team-b-player-${i+1}-assists`).textContent = player.assists
            document.getElementById(`combat-overlay-team-b-player-${i+1}-ability-1`).src = `assets/Agents/${player.agent}_Ability_1.png`
            document.getElementById(`combat-overlay-team-b-player-${i+1}-ability-2`).src = `assets/Agents/${player.agent}_Ability_2.png`
            document.getElementById(`combat-overlay-team-b-player-${i+1}-ability-3`).src = `assets/Agents/${player.agent}_Ability_3.png`
            document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-icon`).src = `assets/Agents/${player.agent}_Ability_Ult.png`
            Array.from(document.getElementsByClassName(`combat-overlay-team-b-player-${i+1}-credits`)).forEach(element => {
                element.textContent = player.credits
            })

            if (player.ultMax > 5) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-dots`).src = `assets/ult_dots/Ult_Dots_${player.ultPoints}_${player.ultMax}.png`        
            }
            if (player.ultMax < 6) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-dots`).style.display = 'none'
            } else if (player.ultPoints === player.ultMax) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-active`).style.display = 'grid'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-dots`).style.display = 'none'
            } else {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-active`).style.display = 'none'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-ult-dots`).style.display = 'block'
            }
            if (player.shield === 0 || player.shield > 2) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-shield`).style.display = 'none'
            } else {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-shield`).style.display = 'block'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-shield`).src = `assets/Shop/Shields_${player.shield}.png`
            }
            if (player.weapon === "") {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-weapon`).src = `assets/Shop/knife.png`
            } else {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-weapon`).src = `assets/Shop/${player.weapon}.png`
            }

            // Sets Alive/Dead
            if (player.alive === false) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top-background`).style.background = '#0D1821'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.opacity = '0.3'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top`).style.opacity = '0'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top`).style.transform = 'translateX(315px)'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-trim`).style.display = 'none'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-alive`).style.display = 'none'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-dead`).style.display = 'flex' 
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-dead`).style.width = '70%' 
                document.getElementById(`combat-overlay-team-b-player-${i+1}-agent-icon`).style.filter = 'grayscale(1)'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-agent-icon`).style.opacity = '0.9'
            } else if (player.alive) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top-background`).style.background = '#0D1821'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top`).style.opacity = '1'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top`).style.transform = ''
                document.getElementById(`combat-overlay-team-b-player-${i+1}-trim`).style.display = 'block'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-alive`).style.display = 'grid'
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-dead`).style.display = 'none' 
                document.getElementById(`combat-overlay-team-b-player-${i+1}-bottom-dead`).style.width = '' 
                document.getElementById(`combat-overlay-team-b-player-${i+1}-agent-icon`).style.filter = ''
                document.getElementById(`combat-overlay-team-b-player-${i+1}-agent-icon`).style.opacity = ''
            }

            if (player.name === currentGame.observing) {
                document.getElementById(`combat-overlay-team-b-player-${i+1}-top-background`).style.background = 'linear-gradient(to right, rgba(255, 233, 157, 0.7), rgba(13, 24, 33, 0.3))'
                document.getElementById(`combat-overlay-team-a-player-${i+1}-top-background`).style.opacity = '1'
            }
        });
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

    // Overlay Theme
    document.documentElement.style.setProperty('--bg1', `${overlaySetup.bg1}`)
    document.documentElement.style.setProperty('--bg2', `${overlaySetup.bg2}`)
    document.documentElement.style.setProperty('--bg3', `${overlaySetup.bg3}`)
    document.documentElement.style.setProperty('--bg4', `${overlaySetup.bg4}`)
    document.documentElement.style.setProperty('--bga1', `${overlaySetup.bga1}`)
    document.documentElement.style.setProperty('--bga2', `${overlaySetup.bga2}`)
    document.documentElement.style.setProperty('--frames', `${overlaySetup.frames}`)
}

let checkGameEventLog = null
let fileHandle = null
let gameEventLogLastModified = null
let gameEventLogLastLength = 0
let gameEventQueue = []
let gameEventQueueTimeout = null


async function getGameEventLog() {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: '.txt files',
                accept: {"game-event-log/*": ['.txt']},
            }],
            excludeAcceptAllOption: true,
            multiple: false,
        })
        clearGameEventLog(fileHandle, "")
        checkGameEventLog = setInterval(readGameEventLog, 200)
        console.log('Game event log loaded successfully')
    } catch (error) {
        console.log(error)       
    }
}

async function clearGameEventLog(fileHandle, contents) {
    const writable = await fileHandle.createWritable();
  
    await writable.write(contents);
  
    await writable.close();
}

async function readGameEventLog() {
    try {
        const fileData = await fileHandle.getFile();
        if (gameEventLogLastModified !== fileData.lastModified) {
            gameEventLogLastModified = fileData.lastModified
            const fileText = await fileData.text()
            const fileTextString = fileText
            const newEvents = fileTextString.slice(gameEventLogLastLength, fileTextString.length)
            gameEventLogLastLength = fileTextString.length
            if (newEvents.includes('\n')) {
                Array.from(newEvents.split("\n")).forEach((event) => {
                    if (event !== "") {
                        gameEventQueue.push(event)
                    }
                })
            } else if (newEvents!=="") {
                gameEventQueue.push(newEvents)
            }
            if (gameEventQueueTimeout === null) {
                processGameEventQueue()
            }
        } 
    } catch (error) {
        console.error('Read Fail', error)
    }
    
}

function processGameEventQueue() {
    if (gameEventQueue.length !== 0) {
        console.log(gameEventQueue[0])
        try {
            gameEventQueue[0] = JSON.parse(gameEventQueue[0].split("] ")[1])
        } catch (error) {
            console.log(error)
            gameEventQueueTimeout = null
            checkGameEventLog = null
        }
        
        processGameEvent(gameEventQueue[0])
        gameEventQueueTimeout = setInterval(processGameEventQueue, 100)
    } else {
        gameEventQueueTimeout = null
    }
}


document.getElementById('load-game-event-log').addEventListener('click', getGameEventLog)