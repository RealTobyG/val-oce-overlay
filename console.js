let menuSelection = 1

function menuSelectionUpdate() {
    document.getElementsByName('menu-selection').forEach((menu) => {
        if (menu.checked) {
            menuSelection = `${menu.value}`
        }
    })
}

document.getElementsByName('menu-selection').forEach((menu) => {
    menu.addEventListener('change', menuSelectionUpdate)
})



// ##########################################################################
// #################### Team/Event/Casters Name Changing ####################
// ##########################################################################
const teamAName = document.getElementById('team-a-name')
const teamBName = document.getElementById('team-b-name')
const teamATri = document.getElementById('team-a-tri')
const teamBTri = document.getElementById('team-b-tri')
const eventName = document.getElementById('event-name')
const caster1Name = document.getElementById('caster-1-name')
const caster2Name = document.getElementById('caster-2-name')

function setAllNames() {
    const teamANameAll = document.getElementsByClassName('apply-team-a-name')
    const teamBNameAll = document.getElementsByClassName('apply-team-b-name')
    const teamATriAll = document.getElementsByClassName('apply-team-a-tri')
    const teamBTriAll = document.getElementsByClassName('apply-team-b-tri')
    const eventNameAll = document.getElementsByClassName('apply-event-name')
    const caster1NameAll = document.getElementsByClassName('apply-caster-1-name')
    const caster2NameAll = document.getElementsByClassName('apply-caster-2-name')
    for (const instance of teamANameAll) {
        instance.textContent = `${teamAName.value}`
    }
    for (const instance of teamBNameAll) {
        instance.textContent = `${teamBName.value}`
    }
    for (const instance of teamATriAll) {
        instance.textContent = `${teamATri.value}`
    }
    for (const instance of teamBTriAll) {
        instance.textContent = `${teamBTri.value}`
    }
    for (const instance of eventNameAll) {
        instance.textContent = `${eventName.value}`
    }
    for (const instance of caster1NameAll) {
        instance.textContent = `@${caster1Name.value}`
    }
    for (const instance of caster2NameAll) {
        instance.textContent = `@${caster2Name.value}`
    }
}

document.getElementById('team-a-name').addEventListener('keyup', setAllNames)
document.getElementById('team-b-name').addEventListener('keyup', setAllNames)
document.getElementById('team-a-tri').addEventListener('keyup', setAllNames)
document.getElementById('team-b-tri').addEventListener('keyup', setAllNames)
document.getElementById('event-name').addEventListener('keyup', setAllNames)
document.getElementById('caster-1-name').addEventListener('keyup', setAllNames)
document.getElementById('caster-2-name').addEventListener('keyup', setAllNames)



// ##################################################################
// #################### Team/Event Logo Changing ####################
// ##################################################################
let teamALogo = 'assets/200x200_No_Logo.png'
let teamBLogo = 'assets/200x200_No_Logo.png'
let eventLogo = 'n/a'

function setAllLogos() {
    const teamALogoAll = document.getElementsByClassName('apply-team-a-logo')
    const teamBLogoAll = document.getElementsByClassName('apply-team-b-logo')
    const teamALogoUpload = document.getElementById('team-a-logo-upload')
    const teamBLogoUpload = document.getElementById('team-b-logo-upload')
    const teamANoLogo = document.getElementById('team-a-no-logo')
    const teamBNoLogo = document.getElementById('team-b-no-logo')
    const eventLogoAll = document.getElementsByClassName('apply-event-logo')
    const eventLogoUpload = document.getElementById('event-logo-upload')
    if (teamANoLogo.checked) {
        teamALogoUpload.value = ''
        for (const element of teamALogoAll) {
            URL.revokeObjectURL(teamALogo)
            teamALogo = 'assets/200x200_No_Logo.png'
            element.src = teamALogo
        }
    }
    if (teamBNoLogo.checked) {
        teamBLogoUpload.value = ''
        for (const element of teamBLogoAll) {
            URL.revokeObjectURL(teamBLogo)
            teamBLogo = 'assets/200x200_No_Logo.png'
            element.src = teamBLogo
        }
    }
    if (teamANoLogo.checked === false) {
        for (const element of teamALogoAll) {
            element.src = teamALogo
        }
    }
    if (teamBNoLogo.checked === false) {
        for (const element of teamBLogoAll) {
            element.src = teamBLogo
        }
    }
    if (eventLogoUpload.value !== '') {
        for (const element of eventLogoAll) {
            element.src = eventLogo
        }
    }
}

function uploadTeamALogo() {
    document.getElementById('team-a-no-logo').checked = false
    const teamALogoUpload = document.getElementById('team-a-logo-upload')
    URL.revokeObjectURL(teamALogo)
    teamALogo = URL.createObjectURL(teamALogoUpload.files[0])
    setAllLogos()
}

function uploadTeamBLogo() {
    document.getElementById('team-b-no-logo').checked = false
    const teamBLogoUpload = document.getElementById('team-b-logo-upload')
    URL.revokeObjectURL(teamBLogo)
    teamBLogo = URL.createObjectURL(teamBLogoUpload.files[0])
    setAllLogos()
}

function uploadEventLogo() {
    const eventLogoUpload = document.getElementById('event-logo-upload')
    URL.revokeObjectURL(eventLogo)
    eventLogo = URL.createObjectURL(eventLogoUpload.files[0])
    setAllLogos()
}

document.getElementById('team-a-no-logo').addEventListener('change', setAllLogos)
document.getElementById('team-b-no-logo').addEventListener('change', setAllLogos)
document.getElementById('team-a-logo-upload').addEventListener('change', uploadTeamALogo)
document.getElementById('team-b-logo-upload').addEventListener('change', uploadTeamBLogo)
document.getElementById('event-logo-upload').addEventListener('change', uploadEventLogo)



// #####################################################################
// #################### Map Series Length Selection ####################
// #####################################################################
let seriesLengthSelection = 1

function seriesLengthUpdate() {
    document.getElementsByName('series-length-selection').forEach((option) => {
        if (option.checked) {
            seriesLengthSelection = `${option.value}`
            mapPoolUpdate()
        }
    })
}

document.getElementsByName('series-length-selection').forEach((option) => {
    option.addEventListener('change', seriesLengthUpdate)
})




// ############################################################
// #################### Map Pool Selection ####################
// ############################################################
const mapData = [
    {mapName: "Abyss", mapPool: true},
    {mapName: "Ascent", mapPool: true},
    {mapName: "Bind", mapPool: true},
    {mapName: "Breeze", mapPool: false},
    {mapName: "Fracture", mapPool: false},
    {mapName: "Haven", mapPool: true},
    {mapName: "Icebox", mapPool: true},
    {mapName: "Lotus", mapPool: true},
    {mapName: "Pearl", mapPool: false},
    {mapName: "Split", mapPool: false},
    {mapName: "Sunset", mapPool: true},
]
let mapPoolSelection = 0

function mapPoolUpdate() {
    document.getElementsByName('map-pool-selection').forEach((option) => {
        if (option.checked) {
            mapPoolSelection = `${option.value}`
            setMapPool()
        }
    })
}

document.getElementsByName('map-pool-selection').forEach((option) => {
    option.addEventListener('change', mapPoolUpdate)
})

let teamIdentifierSelection = 0

function teamIdentifierUpdate() {
    document.getElementsByName('team-identifier-selection').forEach((option) => {
        if (option.checked) {
            teamIdentifierSelection = `${option.value}`
            const teamIdentifierMenus = document.getElementsByClassName('team-input-contents')
            Array.from(teamIdentifierMenus).forEach((menu) => {
                if (Number(teamIdentifierSelection) === 0) {
                    const teamLogo = document.createElement('img')
                        teamLogo.src = "assets/200x200_No_Logo.png"
                        if(menu.parentElement.children[0].checked) {
                            teamLogo.className = "apply-team-b-logo"
                        } else {
                            teamLogo.className = "apply-team-a-logo"
                        }
                    menu.children[1].replaceWith(teamLogo)
                    setAllLogos()
                } else {
                    const teamTri = document.createElement('span')
                        teamTri.style.fontSize = "10pt"
                        if(menu.parentElement.children[0].checked) {
                            teamTri.className = "apply-team-b-tri"
                        } else {
                            teamTri.className = "apply-team-a-tri"
                        }
                    menu.children[1].replaceWith(teamTri)
                    setAllNames()
                }
            })

        }
    })
}

document.getElementsByName('team-identifier-selection').forEach((option) => {
    option.addEventListener('change', teamIdentifierUpdate)
})

function setMapPool() {
    const mapVeto = document.getElementById('veto-config-body')
    while (mapVeto.firstChild) {
        mapVeto.removeChild(mapVeto.firstChild)
    }
    if (Number(seriesLengthSelection) === 0) {
        createMapPickBan('map', 1, 'pick', false, 0)
        mapTeamDefActivate()
        teamIdentifierToggle()
        mapVetoActivate()
        mapVetoUpdate()
    } else if (Number(seriesLengthSelection) === 1) {
        createMapPickBan('1st', 1, 'ban', false, 0)
        createMapPickBan('2nd', 4, 'ban', false, 1)
        createMapPickBan('1st', 7, 'pick', false, 0)
        createMapPickBan('2nd', 10, 'pick', false, 1)
        createMapPickBan('3rd', 13, 'ban', false, 0)
        createMapPickBan('4th', 16, 'ban', false, 1)
        createMapPickBan('3rd', 19, 'pick', true, 0)
        mapTeamDefActivate()
        teamIdentifierToggle()
        mapVetoActivate()
        mapVetoUpdate()
    } else if (Number(seriesLengthSelection) === 2) {
        createMapPickBan('1st', 1, 'ban', false, 0)
        createMapPickBan('2nd', 4, 'ban', false, 1)
        createMapPickBan('1st', 7, 'pick', false, 0)
        createMapPickBan('2nd', 10, 'pick', false, 1)
        createMapPickBan('3rd', 13, 'pick', false, 0)
        createMapPickBan('4th', 16, 'pick', false, 1)
        createMapPickBan('5th', 19, 'pick', true, 0)
        mapTeamDefActivate()
        teamIdentifierToggle()
        mapVetoActivate()
        mapVetoUpdate()
    }
}

function createMapPickBan(nth, clmn, pickBan, decider, teamAB) {
    const mapVeto = document.getElementById('veto-config-body')
    const background = document.createElement('div')
        background.className = "map-veto-background"
        background.style.gridArea = `1/${clmn}/12/${clmn+2}`
        mapVeto.appendChild(background)
    const heading = document.createElement('span')
        heading.className = "map-veto-heading"
        heading.style.gridArea = `1/${clmn}/2/${clmn+2}`
        if (decider) {
            heading.textContent = "Decider"
            mapVeto.appendChild(heading)
        } else {
            heading.textContent = `${nth} ${pickBan}`
            mapVeto.appendChild(heading)
        }
    function createMapSelect(mapName, row, trueFalse, imgDimension, mapNum) {
        const mapSelect = document.createElement('label')
            mapSelect.for = `${nth}-${pickBan}-${mapName}`
            if (imgDimension === '300x210') {
                if (mapNum % 2 === 0) {
                    mapSelect.style.gridArea = `${row}/${clmn}/${row+1}/${clmn+1}`
                } else {
                    mapSelect.style.gridArea = `${row}/${clmn+1}/${row+1}/${clmn+2}`
                }
            } else {
                mapSelect.style.gridArea = `${row}/${clmn}/${row+1}/${clmn+2}`
            }
            mapSelect.style.zIndex = "1"
            if (imgDimension === '300x210' && mapNum === 10) {
                mapSelect.style.marginLeft = "50px"
            }
                const mapSelectInput = document.createElement('input')
                    mapSelectInput.type = "radio"
                    mapSelectInput.id = `${nth}-${pickBan}-${mapName}`
                    mapSelectInput.value = `${mapName}`
                    mapSelectInput.name = `${nth}-${pickBan}-map`
                    mapSelectInput.checked = trueFalse
                    mapSelectInput.className = `map-${pickBan}-selection menu`
                const mapSelectInputContents = document.createElement('div')
                    mapSelectInputContents.className = `map-option-${imgDimension}`
                        const mapSelectImg = document.createElement('img')
                            mapSelectImg.src = `assets/Maps/${mapName}_${imgDimension}.png`
                        const mapSelectImgOverlay = document.createElement('div')
                            mapSelectImgOverlay.className = "map-option-overlay"
                        const mapSelectName = document.createElement('span')
                            mapSelectName.className = "map-option-text"
                            mapSelectName.textContent = `${mapName}`
                        const mapSelectHelp = document.createElement('div')
                            mapSelectHelp.className = "help"
                                const mapSelectHelpDiv = document.createElement('div')
                                    mapSelectHelpDiv.className = "flex-row"
                                        const mapSelectHelpText = document.createElement('span')
                                            if (decider) {
                                                mapSelectHelpText.textContent = `Sets the Decider map to ${mapName}`
                                            } else {
                                                mapSelectHelpText.textContent = `Sets the ${nth} map ${pickBan} to ${mapName}`
                                            }
                                mapSelectHelpDiv.appendChild(mapSelectHelpText)
                        mapSelectHelp.appendChild(mapSelectHelpDiv)
                mapSelectInputContents.appendChild(mapSelectImg)
                mapSelectInputContents.appendChild(mapSelectImgOverlay)
                mapSelectInputContents.appendChild(mapSelectName)
                mapSelectInputContents.appendChild(mapSelectHelp)
        mapSelect.appendChild(mapSelectInput)
        mapSelect.appendChild(mapSelectInputContents)
        mapVeto.appendChild(mapSelect)
    }
    
    if (Number(mapPoolSelection) === 1) {
        let mapSelectsCreated = 0
        mapData.forEach((map, i) => {
            if (i===0) {
                createMapSelect(map.mapName, mapSelectsCreated+2, true, '300x210', i)
            } else if (i % 2 !==0) {
                createMapSelect(map.mapName, mapSelectsCreated+2, false, '300x210', i)
                mapSelectsCreated++
            } else {
                createMapSelect(map.mapName, mapSelectsCreated+2, false, '300x210', i)
            }
        })
    } else {
        let mapSelectsCreated = 0
        mapData.forEach((map, i) => {
            if (map.mapPool) {
                if (i===0) {
                    createMapSelect(map.mapName, mapSelectsCreated+2, true, '600x210', i)
                    mapSelectsCreated++
                } else {
                    createMapSelect(map.mapName, mapSelectsCreated+2, false, '600x210', i)
                    mapSelectsCreated++
                }
            }
        })
    }

    function createTeamSelect(team, row, trueFalse, teamDef) {
        const teamSelect = document.createElement('label')
            teamSelect.for = `${nth}-${pickBan}-${teamDef}`
            if (Number(mapPoolSelection) === 0) {
                teamSelect.style.gridArea = `${row}/${clmn}/${row+1}/${clmn+2}`
            } else {
                teamSelect.style.gridArea = `${row-1}/${clmn}/${row}/${clmn+2}`
            }
            teamSelect.style.zIndex = "1"
            teamSelect.style.marginTop = "10px"
                const teamSelectInput = document.createElement('input')
                    teamSelectInput.type = "checkbox"
                    teamSelectInput.id = `${nth}-${pickBan}-${teamDef}`
                    teamSelectInput.name = `${nth}-${pickBan}-${teamDef}`
                    teamSelectInput.checked = trueFalse
                    teamSelectInput.className = `map-${pickBan}-${teamDef} menu`
                const teamSelectInputContents = document.createElement('div')
                    teamSelectInputContents.className = "team-input-contents"
                        const teamSelectDescription = document.createElement('span')
                            if (teamDef === 'team' && pickBan === 'pick') {
                                teamSelectDescription.textContent = "Toggle Team Picking"
                            } else if (teamDef === 'team' && pickBan === 'ban') {
                                teamSelectDescription.textContent = "Toggle Team Banning"
                            } else {
                                teamSelectDescription.textContent = "Toggle Team Starting Def"
                            }
                        const teamSelectLogo = document.createElement('img')
                            teamSelectLogo.src = "assets/200x200_No_Logo.png"
                            teamSelectLogo.className = `apply-${team}-logo`
                        const teamSelectTri = document.createElement('span')
                            teamSelectTri.className = `apply-${team}-tri`
                            teamSelectTri.style.fontSize = "10pt"
                        const teamSelectHelp = document.createElement('div')
                            teamSelectHelp.className = "help"
                                const teamSelectHelpDiv1 = document.createElement('div')
                                    teamSelectHelpDiv1.style.display = "flex"
                                    teamSelectHelpDiv1.style.flexDirection = "column"
                                    teamSelectHelpDiv1.style.alignItems = "center"
                                        const teamSelectHelpLine1 = document.createElement('span')
                                            if (teamDef === 'team' && pickBan === 'pick') {
                                                teamSelectHelpLine1.textContent = `Toggle the team picking between`
                                            } else if (teamDef === 'team' && pickBan === 'ban') {
                                                teamSelectHelpLine1.textContent = `Toggle the team banning between`
                                            } else {
                                                teamSelectHelpLine1.textContent = `Toggle the team starting defense between`
                                            }  
                                        const teamSelectHelpDiv2 = document.createElement('div')
                                            teamSelectHelpDiv2.className = "flex-row"  
                                                const teamSelectHelpLine2 = document.createElement('span')
                                                    teamSelectHelpLine2.style.marginRight = "5px"
                                                    teamSelectHelpLine2.className = `apply-team-a-tri`
                                                const teamSelectHelpLine3 = document.createElement('span')
                                                    teamSelectHelpLine3.style.marginRight = "5px"
                                                    teamSelectHelpLine3.textContent = `and`
                                                const teamSelectHelpLine4 = document.createElement('span')
                                                    teamSelectHelpLine4.className = `apply-team-b-tri`
                                        teamSelectHelpDiv2.appendChild(teamSelectHelpLine2)
                                        teamSelectHelpDiv2.appendChild(teamSelectHelpLine3)
                                        teamSelectHelpDiv2.appendChild(teamSelectHelpLine4)
                                teamSelectHelpDiv1.appendChild(teamSelectHelpLine1)
                                teamSelectHelpDiv1.appendChild(teamSelectHelpDiv2)
                        teamSelectHelp.appendChild(teamSelectHelpDiv1)
                teamSelectInputContents.appendChild(teamSelectDescription)
                if (Number(teamIdentifierSelection) === 0) {
                    teamSelectInputContents.appendChild(teamSelectLogo)
                } else {
                    teamSelectInputContents.appendChild(teamSelectTri)
                }
                teamSelectInputContents.appendChild(teamSelectHelp)
        teamSelect.appendChild(teamSelectInput)
        teamSelect.appendChild(teamSelectInputContents)
        mapVeto.appendChild(teamSelect)
    }

    if (decider) {
        const deciderFiller = document.createElement('div')
            deciderFiller.className = "decider-filler"
            if (Number(mapPoolSelection) === 0) {
                deciderFiller.style.gridArea = `9/${clmn}/10/${clmn+2}`
            } else {
                deciderFiller.style.gridArea = `8/${clmn}/11/${clmn+2}`
            }
            deciderFiller.style.zIndex = "1"
            deciderFiller.style.marginTop = "10px"
                const deciderFillerText = document.createElement('span')
                    deciderFillerText.textContent = "Team select is disabled for decider"
                const deciderFillerHelp = document.createElement('div')
                    deciderFillerHelp.className = "help"
                    deciderFillerHelp.style.fontSize = "10pt"
                        const deciderFillerHelpText1 = document.createElement('span')
                            deciderFillerHelpText1.textContent = "Decider map is based on the remaining map after picks and bans. If you are using an alternate map pool with more than 7 maps teams must agree on a decider map. This will have no effect on overlay displays."
                        const deciderFillerHelpText2 = document.createElement('span')
                            deciderFillerHelpText2.textContent = "If you are using an alternate map pool with more than 7 maps, teams must agree on a decider map. This will have no effect on overlay displays."
                deciderFillerHelp.appendChild(deciderFillerHelpText1)
                // deciderFillerHelp.appendChild(deciderFillerHelpText2)
        deciderFiller.appendChild(deciderFillerText)
        deciderFiller.appendChild(deciderFillerHelp)
        mapVeto.appendChild(deciderFiller)

        createTeamSelect('team-a', 10, false, 'def')
    } else {
        if (teamAB === 0) {
            createTeamSelect('team-a', 9, false, 'team')
        } else {
            createTeamSelect('team-b', 9, true, 'team')
        }
        if (pickBan === 'pick') {
            createTeamSelect('team-b', 10, false, 'def')
        }
    }
    setAllNames()
    setAllLogos()
}

// ########################################################
// #################### Map Veto Logic ####################
// ########################################################
let mapPicks = []
let mapBans = []
let mapPicksTeams = []
let mapBansTeams = []
let mapPicksSides = []

function teamIdentifierToggle() {
    Array.from(document.getElementsByClassName('team-input-contents')).forEach((menu) => {
        if(menu.parentElement.children[0].checked) {
            menu.children[1].className = menu.children[1].className.replace(/(team-a|team-b)/g, "team-b")
            setAllNames()
            setAllLogos()
        } else {
            menu.children[1].className = menu.children[1].className.replace(/(team-a|team-b)/g, "team-a")
            setAllNames()
            setAllLogos()
        }
    })
}

function mapTeamDefActivate() {
    Array.from(document.getElementsByClassName('team-input-contents')).forEach((menu) => {
        menu.parentElement.children[0].addEventListener('change', teamIdentifierToggle);
    })
}

function mapVetoUpdate() {
    mapPicks = []
    mapBans = []
    mapPicksTeams = []
    mapBansTeams = []
    mapPicksSides = []
    for (const map of document.getElementsByClassName('map-pick-selection')) {
        if (map.checked) {
            mapPicks.push(map.value)
        }
    }
    for (const map of document.getElementsByClassName('map-ban-selection')) {
        if (map.checked) {
            mapBans.push(map.value)
        }
    }
    for (const team of document.getElementsByClassName('map-pick-team')) {
        if (team.checked) {
            mapPicksTeams.push('team-b')
        } else {
            mapPicksTeams.push('team-a')
        }
    }
    for (const team of document.getElementsByClassName('map-ban-team')) {
        if (team.checked) {
            mapBansTeams.push('team-b')
        } else {
            mapBansTeams.push('team-a')
        }
    }
    for (const team of document.getElementsByClassName('map-pick-def')) {
        if (team.checked) {
            mapPicksSides.push('team-b')
        } else {
            mapPicksSides.push('team-a')
        }
    }
    createLiveScores()
    scoreUpdate()
    setLiveGameSideBar()
}


function mapVetoActivate() {
    for (const option of document.querySelectorAll('.map-pick-selection, .map-ban-selection, .map-pick-team, .map-ban-team, .map-pick-def')) {
        option.addEventListener('change', mapVetoUpdate)
    }
}
// #############################################################
// #################### Score Keeping Logic ####################
// #############################################################
let mapWinners = []
let teamASeriesScore = 0
let teamBSeriesScore = 0
let mapNumber = teamASeriesScore+teamBSeriesScore
let currentMap = "abyss"

function createLiveScores() {
    const livePicks = document.getElementById('live-game-picks')
    while (livePicks.firstChild) {
        livePicks.removeChild(livePicks.firstChild)
    }
    mapPicks.forEach((map, i) => {
        const liveGamePick = document.createElement('div')
            liveGamePick.className = "live-game-pick"
                const mapPickImg = document.createElement('div')
                    mapPickImg.className = "live-game-pick-img"
                    mapPickImg.style.background = `linear-gradient(-90deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("assets/Maps/${map}_524x214.png") center center / cover`
                        const mapPickImgName = document.createElement('span')
                        if ((Number(seriesLengthSelection) === 0)) {
                            mapPickImgName.textContent = `${map}`
                            mapPickImg.appendChild(mapPickImgName)
                        } else if ((Number(seriesLengthSelection) === 1 && i === 2) || (Number(seriesLengthSelection) === 2 && i === 4)) {
                            mapPickImgName.textContent = `Decider - ${map}`
                            mapPickImg.appendChild(mapPickImgName)
                        } else {
                            const mapPickImgTeamLogo = document.createElement('img')
                                mapPickImgTeamLogo.src = "assets/200x200_No_Logo.png"
                                mapPickImgTeamLogo.className = `apply-${mapPicksTeams[i]}-logo`
                                mapPickImgTeamLogo.style.width = "100px"
                                mapPickImg.appendChild(mapPickImgTeamLogo)
                            const mapPickImgDiv = document.createElement('div')
                                mapPickImgDiv.className = "flex-column"
                                    mapPickImgName.textContent = `Map ${i+1} - ${map}`    
                                    const mapPickImgTeamName = document.createElement('span')
                                        mapPickImgTeamName.className = `apply-${mapPicksTeams[i]}-tri`
                            mapPickImgDiv.appendChild(mapPickImgName)
                            mapPickImgDiv.appendChild(mapPickImgTeamName)
                            mapPickImg.appendChild(mapPickImgDiv)
                        }
                const liveGameTeamALogo = document.createElement('img')
                    liveGameTeamALogo.src = "assets/200x200_No_Logo.png"
                    liveGameTeamALogo.className = "apply-team-a-logo"
                    liveGameTeamALogo.style.width = "100px"
                const liveGameTeamAName = document.createElement('span')
                    liveGameTeamAName.className = "apply-team-a-tri"
                    liveGameTeamAName.style.fontSize = "30pt"
                const liveGameTeamAScore = document.createElement('input')
                    liveGameTeamAScore.id = `map-${i}-team-a-score}`
                    liveGameTeamAScore.type = "number"
                    liveGameTeamAScore.min = "0"
                    liveGameTeamAScore.value = "0"
                    liveGameTeamAScore.className = "team-a-score menu"
                const liveGameTeamAScoreHelp = document.createElement('div')
                    liveGameTeamAScoreHelp.className = "help"
                        const liveGameTeamAScoreHelpDiv = document.createElement('div')
                            liveGameTeamAScoreHelpDiv.className = "flex-row"
                                const liveGameTeamAScoreHelp1 = document.createElement('span')
                                    liveGameTeamAScoreHelp1.textContent = `Set the score on ${map} for`
                                    liveGameTeamAScoreHelp1.style.marginRight = "5px"
                                const liveGameTeamAScoreHelp2 = document.createElement('span')
                                    liveGameTeamAScoreHelp2.className = `apply-team-a-tri`
                        liveGameTeamAScoreHelpDiv.appendChild(liveGameTeamAScoreHelp1)
                        liveGameTeamAScoreHelpDiv.appendChild(liveGameTeamAScoreHelp2)
                liveGameTeamAScoreHelp.appendChild(liveGameTeamAScoreHelpDiv)
                const liveGameScoreHyphen = document.createElement('span')
                    liveGameScoreHyphen.textContent = "-"
                    liveGameScoreHyphen.style.fontSize = "40pt"
                const liveGameTeamBScore = document.createElement('input')
                    liveGameTeamBScore.id = `map-${i}-team-b-score}`
                    liveGameTeamBScore.type = "number"
                    liveGameTeamBScore.min = "0"
                    liveGameTeamBScore.value = "0"
                    liveGameTeamBScore.className = "team-b-score menu"
                const liveGameTeamBScoreHelp = document.createElement('div')
                    liveGameTeamBScoreHelp.className = "help"
                        const liveGameTeamBScoreHelpDiv = document.createElement('div')
                            liveGameTeamBScoreHelpDiv.className = "flex-row"
                                const liveGameTeamBScoreHelp1 = document.createElement('span')
                                    liveGameTeamBScoreHelp1.textContent = `Set the score on ${map} for`
                                    liveGameTeamBScoreHelp1.style.marginRight = "5px"
                                const liveGameTeamBScoreHelp2 = document.createElement('span')
                                    liveGameTeamBScoreHelp2.className = `apply-team-b-tri`
                        liveGameTeamBScoreHelpDiv.appendChild(liveGameTeamBScoreHelp1)
                        liveGameTeamBScoreHelpDiv.appendChild(liveGameTeamBScoreHelp2)
                liveGameTeamBScoreHelp.appendChild(liveGameTeamBScoreHelpDiv)
                const liveGameTeamBName = document.createElement('span')
                    liveGameTeamBName.className = "apply-team-b-tri"
                    liveGameTeamBName.style.fontSize = "30pt"
                const liveGameTeamBLogo = document.createElement('img')
                    liveGameTeamBLogo.src = "assets/200x200_No_Logo.png"
                    liveGameTeamBLogo.className = "apply-team-b-logo"
                    liveGameTeamBLogo.style.width = "100px"
        liveGamePick.appendChild(mapPickImg)
        liveGamePick.appendChild(liveGameTeamALogo)
        liveGamePick.appendChild(liveGameTeamAName)
        liveGamePick.appendChild(liveGameTeamAScore)
        liveGamePick.appendChild(liveGameTeamAScoreHelp)
        liveGamePick.appendChild(liveGameScoreHyphen)
        liveGamePick.appendChild(liveGameTeamBScore)
        liveGamePick.appendChild(liveGameTeamBScoreHelp)
        liveGamePick.appendChild(liveGameTeamBName)
        liveGamePick.appendChild(liveGameTeamBLogo)
        livePicks.appendChild(liveGamePick)
    })
    setAllNames()
    setAllLogos()
    scoreUpdateActivate()
}

function scoreUpdate() {
    mapWinners = []
    teamASeriesScore = 0
    teamBSeriesScore = 0
    mapNumber = teamASeriesScore+teamBSeriesScore
    const TeamAScores = document.getElementsByClassName('team-a-score')
    const TeamBScores = document.getElementsByClassName('team-b-score')
    Array.from(TeamAScores).forEach((map, i) => {
        if (map.value>=13 && map.value>=Number(TeamBScores[i].value)+2) {
            teamASeriesScore++
            mapWinners.push('team-a')
        }
        if (TeamBScores[i].value>=13 && TeamBScores[i].value>=Number(map.value)+2) {
            teamBSeriesScore++
            mapWinners.push('team-b')
        }
    })
    mapNumber = teamASeriesScore+teamBSeriesScore
    currentMap = mapPicks[mapNumber]
    setLiveGameSideBar()
}

function scoreUpdateActivate() {
    const scoreUpdateTriggers = document.querySelectorAll(".team-a-score, .team-b-score")
    for (const element of scoreUpdateTriggers) {
        element.addEventListener("change", scoreUpdate)
    }
}

function setLiveGameSideBar() {
    const sideBarMapImg = document.getElementById('side-bar-map-img')
    const sideBarMapName = document.getElementById('side-bar-map-name')
    const sideBarDefLogo = document.getElementById('side-bar-def-logo')
    const sideBarAtkLogo = document.getElementById('side-bar-atk-logo')
    const sideBarDefTeam = document.getElementById('side-bar-def-team')
    const sideBarAtkTeam = document.getElementById('side-bar-atk-logo')
    
    function sideBarTeamsDefAtk() {
        if (mapPicksSides[mapNumber] === 'team-a') {
            sideBarDefTeam.className = "apply-team-a-tri"
            sideBarDefLogo.className = "apply-team-a-logo"
            sideBarAtkTeam.className = "apply-team-b-tri"
            sideBarAtkLogo.className = "apply-team-b-logo"
        } else {
            sideBarDefTeam.className = "apply-team-b-tri"
            sideBarDefLogo.className = "apply-team-b-logo"
            sideBarAtkTeam.className = "apply-team-a-tri"
            sideBarAtkLogo.className = "apply-team-a-logo"
        }
    }
    
    function sideBarValues(deciderNum, scoreWin) {
        if (mapNumber<deciderNum) {
            sideBarMapImg.src = `assets/Maps/${mapPicks[mapNumber]}_320x640.png`
            sideBarMapName.textContent = `Map ${mapNumber+1} - ${mapPicks[mapNumber]}`
            sideBarTeamsDefAtk()
        } else if ((teamASeriesScore !== scoreWin && teamBSeriesScore !== scoreWin) && (mapNumber === deciderNum)) {
            sideBarMapImg.src = `assets/Maps/${mapPicks[mapNumber]}_320x640.png`
            sideBarMapName.textContent = `Decider - ${mapPicks[mapNumber]}`
            sideBarTeamsDefAtk()
        }
    }
    
    if (seriesLengthSelection === 1) {
        sideBarValues(2, 2)
    } else if (seriesLengthSelection === 2) {
        sideBarValues(4, 3)
    } else if (seriesLengthSelection === 0 && mapNumber === 0) {
        sideBarMapImg.src = `assets/Maps/${mapPicks[mapNumber]}_320x640.png`
        sideBarMapName.textContent = `BO1 Map - ${mapPicks[mapNumber]}`
        sideBarTeamsDefAtk()
    }
    setAllLogos()
    setAllNames()
}

// ####################################################################
// #################### Overlay Template Selection ####################
// ####################################################################
const overlaySelection = document.getElementById('overlay-selection')

function setOverlay() {
    const overlayElements = document.getElementsByClassName('overlay-element')
    if (overlaySelection.value === "GC") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|LPL)/g, "GC")
        }
    } else if (overlaySelection.value === "VCL") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(GC|LPL)/g, "VCL")
        }
    } else {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|GC)/g, "LPL")
        }
    }
}

document.getElementById('overlay-selection').addEventListener('change', setOverlay)



// ####################################################
// #################### Bottom Bar ####################
// ####################################################
const bottomBarSelection = document.getElementById('bottom-bar-selection')
const chatCommandsSelection = document.getElementById('chat-commands-selection')
const bottomBarTextSizeSelection = document.getElementById('bottom-bar-text-size-selection')

function bottomBarUpdate() {
    const bottomBarAll = document.getElementsByClassName('bottom-bar')
    const chatCommandsAll = document.getElementsByClassName('chat-commands')
    if (bottomBarSelection.checked === false) {
        for (const instance of bottomBarAll) {
            instance.style.display = 'none'
        }
    } else {
        for (const instance of bottomBarAll) {
            instance.style.display = 'grid'
        }
    }
    if (chatCommandsSelection.checked === false) {
        for (const instance of chatCommandsAll) {
            instance.style.display = 'none'
        }
    } else {
        for (const instance of chatCommandsAll) {
            instance.style.display = 'flex'
        }
    }
    if (bottomBarTextSizeSelection.checked) {
        for (const instance of bottomBarAll) {
            instance.style.fontSize = '20pt'
        }
    } else {
        for (const instance of bottomBarAll) {
            instance.style.fontSize = '25pt'
        }
    }
}

document.getElementById('bottom-bar-selection').addEventListener('change', bottomBarUpdate)
document.getElementById('chat-commands-selection').addEventListener('change', bottomBarUpdate)
document.getElementById('bottom-bar-text-size-selection').addEventListener('change', bottomBarUpdate)

setAllNames()
setAllLogos()
setMapPool()