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
let teamALogo = 'n/a'
let teamBLogo = 'n/a'
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
            element.src = 'assets/200x200_No_Logo.png'
        }
    }
    if (teamBNoLogo.checked) {
        teamBLogoUpload.value = ''
        for (const element of teamBLogoAll) {
            element.src = 'assets/200x200_No_Logo.png'
        }
    }
    if (teamALogoUpload.value !== '') {
        for (const element of teamALogoAll) {
            element.src = teamALogo
        }
    }
    if (teamBLogoUpload.value !== '') {
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



function scoreUpdate() {
    
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
    // Updates winning team details for every complete map
    const scheduleResultOverlays = document.getElementsByClassName('schedule-result-overlay')
    mapWinners.forEach((mapWinner, i) => {
        const applyWinnerName = document.getElementsByClassName(`apply-map-${Number(i)+1}-winner`)
        for (const element of applyWinnerName) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
            setTeamNames()
        }
        const applyWinnerLogo = document.getElementsByClassName(`apply-map-${Number(i)+1}-logo`)
        for (const element of applyWinnerLogo) {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapWinner}`)
            setTeamLogos()
        }
        const applyWinnerScore = document.getElementsByClassName(`apply-map-${Number(i)+1}-score`)
        for (const element of applyWinnerScore) {
            if (Number(TeamAScores[i].value)>Number(TeamBScores[i].value)) {
                element.textContent = `${TeamAScores[i].value} - ${TeamBScores[i].value}`
            } else {
                element.textContent = `${TeamBScores[i].value} - ${TeamAScores[i].value}`
            }
        }
        const applyWinnerScoreIntermission = document.getElementsByClassName(`apply-map-${Number(i)+1}-score-intermission`)
        if (SeriesLengthSelection.value === 'BO3') {
            const defTeamIntermission = document.getElementsByClassName('bo3-def-logo')
            if (defTeamIntermission[i].classList.contains('apply-team-a-logo')) {
                applyWinnerScoreIntermission[0].textContent = `${TeamBScores[i].value} - ${TeamAScores[i].value}`
            } else {
                applyWinnerScoreIntermission[0].textContent = `${TeamAScores[i].value} - ${TeamBScores[i].value}`
            }
        }
    })
    // Updates current map on intermission overlay
    const currentMap = document.getElementsByClassName('current-map')
    const bo3IntermissionBackgroundMap = document.getElementsByClassName('bo3-intermission-background-video')
    if (SeriesLengthSelection.value === 'BO3') {        
        if (teamASeriesScore !== 2 && teamBSeriesScore !== 2) {
            for (const element of currentMap) {
                element.textContent = `Map ${mapNumber+1} - ${mapPicks[mapNumber].mapname}`
            }
        } else if (teamASeriesScore>teamBSeriesScore) {
            for (const element of currentMap) {
                element.textContent = `${TeamATri.value} ${teamASeriesScore} - ${teamBSeriesScore} ${TeamBTri.value}`
            }
        } else {
            for (const element of currentMap) {
                element.textContent = `${TeamBTri.value} ${teamBSeriesScore} - ${teamASeriesScore} ${TeamATri.value}`
            }
        }
        if (mapNumber<3) {
            Array.from(bo3IntermissionBackgroundMap).forEach((element, i) => {
                if (i === mapNumber) {
                    element.style.opacity = 100
                } else {
                    element.style.opacity = 0
                }
            })
        }    
    }
    // Shows/Hides map results for finished maps
    const mapResultOverlays = document.getElementsByClassName('map-result-overlay')
    Array.from(mapResultOverlays).forEach((element, i) => {
        if (Number(i)+1<=mapNumber) {
            element.style.display = 'flex'
            scheduleResultOverlays[i].style.display = 'flex'
        }
        else {
            element.style.display = 'none'
            scheduleResultOverlays[i].style.display = 'none'
        }
    })
    // Swapping sides on IGO according to map and which team starts def
    const sideSelections = document.getElementsByClassName("side-selection-teams")
    const TeamANameIGO = document.querySelector("#team-a-name-igo")
    const TeamBNameIGO = document.querySelector("#team-b-name-igo")
    const TeamALogoIGO = document.querySelector("#team-a-logo-igo")
    const TeamBLogoIGO = document.querySelector("#team-b-logo-igo")
    if (teamASeriesScore<2 && teamBSeriesScore<2) {
        if (sideSelections[mapNumber].value === 'team-a') {
            seriesScore = `${teamASeriesScore}-${teamBSeriesScore}`
            TeamBNameIGO.setAttribute("class", "team-name-right-igo apply-team-b-name")
            TeamANameIGO.setAttribute("class", "team-name-left-igo apply-team-a-name")
            TeamBLogoIGO.setAttribute("class", "team-logo-right-igo apply-team-b-logo")
            TeamALogoIGO.setAttribute("class", "team-logo-left-igo apply-team-a-logo")
        } else if (sideSelections[mapNumber].value === 'team-b') {
            seriesScore = `${teamBSeriesScore}-${teamASeriesScore}`
            TeamANameIGO.setAttribute("class", "team-name-right-igo apply-team-a-name")
            TeamBNameIGO.setAttribute("class", "team-name-left-igo apply-team-b-name")
            TeamALogoIGO.setAttribute("class", "team-logo-right-igo apply-team-a-logo")
            TeamBLogoIGO.setAttribute("class", "team-logo-left-igo apply-team-b-logo")
        }
    }
    // Setting score dots on IGO
    const MapScoreIGO = document.getElementById('map-score')
    if (teamASeriesScore<2 && teamBSeriesScore<2 && document.getElementById('map-score-toggle').checked) {
        MapScoreIGO.src = `assets/map_scores/GEN_${SeriesLengthSelection.value}_${seriesScore}.png`
    } else if (teamASeriesScore<2 && teamBSeriesScore<2) {
        MapScoreIGO.src = `assets/map_scores/${OverlaySelection.value}_${SeriesLengthSelection.value}_${seriesScore}.png`
    }
    // !Scores command update
    if (mapNumber === 0) {
        scoreCommand = `!editcom !score ${TeamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${TeamBTri.value} | ${mapPicks[0].mapname} - Current | ${mapPicks[1].mapname} - TBD | ${mapPicks[2].mapname} - TBD`
    } else if (mapNumber === 1) {
        scoreCommand = `!editcom !score ${TeamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${TeamBTri.value} | ${mapPicks[0].mapname} - ${TeamATri.value} ${TeamAScores[0].value}-${TeamBScores[0].value} ${TeamBTri.value} | ${mapPicks[1].mapname} - Current | ${mapPicks[2].mapname} - TBD`
    } else if (mapNumber === 2) {
        if (teamASeriesScore !== 2 && teamBSeriesScore !== 2) {
            scoreCommand = `!editcom !score ${TeamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${TeamBTri.value} | ${mapPicks[0].mapname} - ${TeamATri.value} ${TeamAScores[0].value}-${TeamBScores[0].value} ${TeamBTri.value} | ${mapPicks[1].mapname} - ${TeamATri.value} ${TeamAScores[1].value}-${TeamBScores[1].value} ${TeamBTri.value} | ${mapPicks[2].mapname} - Current`
        } else {
            scoreCommand = `!editcom !score ${TeamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${TeamBTri.value} | ${mapPicks[0].mapname} - ${TeamATri.value} ${TeamAScores[0].value}-${TeamBScores[0].value} ${TeamBTri.value} | ${mapPicks[1].mapname} - ${TeamATri.value} ${TeamAScores[1].value}-${TeamBScores[1].value} ${TeamBTri.value} | ${mapPicks[2].mapname} - N/A`
        }
    } else {
        scoreCommand = `!editcom !score ${TeamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${TeamBTri.value} | ${mapPicks[0].mapname} - ${TeamATri.value} ${TeamAScores[0].value}-${TeamBScores[0].value} ${TeamBTri.value} | ${mapPicks[1].mapname} - ${TeamATri.value} ${TeamAScores[1].value}-${TeamBScores[1].value} ${TeamBTri.value} | ${mapPicks[2].mapname} - ${TeamATri.value} ${TeamAScores[2].value}-${TeamBScores[2].value} ${TeamBTri.value}`
    }
    document.getElementById('score-copy').textContent = scoreCommand
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