const defaultSettings = {
    menuSelection: 1,
    // Teams Config
    teamAName: "Team A",
    teamATri: "TMA",
    teamALogo: "assets/200x200_No_Logo.png",
    teamANoLogo: 0,
    teamBName: "Team B",
    teamBTri:  "TMB",
    teamBLogo: "assets/200x200_No_Logo.png",
    teamBNoLogo: 0, 
    // Map Veto Config
    seriesLengthSelection: 1,
    mapPoolSelection: 0,
    teamIdentifierSelection: 0,
    mapBans: ['Abyss', 'Ascent', 'Icebox', 'Lotus'],
    mapPicks: ['Bind', 'Haven', 'Sunset'],
    mapBansTeams: ['team-a', 'team-b', 'team-a', 'team-b'],
    mapPicksTeams: ['team-a', 'team-b'],
    mapPicksSides: ['team-a', 'team-a', 'team-a'],
    // Live Game
    mapScores: [0, 0, 0, 0, 0, 0],
    mapWinners: [],
    teamASeriesScore: 0,
    teamBSeriesScore: 0,
    mapNumber: 0,
    currentMap: "Bind",
    intermissionState: 0,
    deadline: null,
    // Event/Casters Config
    eventName: "Event Name",
    eventLogo: "assets/Event_Logo_Preview.png",
    eventNoLogo: 0,
    castersSelection: 0,
    caster1Name: "",
    caster2Name: "",
    // Overlay Config
    overlaySelection: 0,
    scoreIconSelection: 0,
    bottomBarSelection: 1,
    chatCommandsSelection: 1,
    bottomBarTextSizeSelection: 1,
}

const exampleSettings = {
    menuSelection: 1,
    // Teams Config
    teamAName: "Team Heretics",
    teamATri: "TH",
    teamALogo: "https://media.discordapp.net/attachments/891904001120034866/1280823379640979487/Heretics_Logo.png?ex=66dec13a&is=66dd6fba&hm=9330b4c61e3ad211cfc46e341ad7f4ba3236fa99b7c893b6367eed40deb116eb&=&format=webp&quality=lossless&width=220&height=220",
    teamANoLogo: 0,
    teamBName: "Team Vitality",
    teamBTri:  "VIT",
    teamBLogo: "https://media.discordapp.net/attachments/891904001120034866/1280823381293400124/Vitality_Logo.png?ex=66dec13a&is=66dd6fba&hm=0c812e80b35faa2a749488c12a06b50a2d038efaaac4391530209a2015b93d56&=&format=webp&quality=lossless&width=220&height=220",
    teamBNoLogo: 0, 
    // Map Veto Config
    seriesLengthSelection: 1,
    mapPoolSelection: 1,
    teamIdentifierSelection: 0,
    mapBans: ['Abyss', 'Ascent', 'Haven', 'Lotus'],
    mapPicks: ['Icebox', 'Sunset', 'Bind'],
    mapBansTeams: ['team-b', 'team-a', 'team-b', 'team-a'],
    mapPicksTeams: ['team-b', 'team-a'],
    mapPicksSides: ['team-a', 'team-b', 'team-a'],
    // Live Game
    mapScores: [14, 12, 10, 13, 0, 0],
    mapWinners: [],
    teamASeriesScore: 0,
    teamBSeriesScore: 0,
    mapNumber: 0,
    currentMap: "Bind",
    intermissionState: 0,
    deadline: null,
    // Event/Casters Config
    eventName: "VCT EMEA Stage 2 Playoffs",
    eventLogo: "https://media.discordapp.net/attachments/891904001120034866/1280823380962054186/VCT_EMEA_Logo.png?ex=66dec13a&is=66dd6fba&hm=a67513c368975261b8222ec3d9115d937e88e169f17283a102b3f21dcdf6d23c&=&format=webp&quality=lossless&width=359&height=121",
    eventNoLogo: 0,
    castersSelection: 1,
    caster1Name: "MitchMan",
    caster2Name: "Tombizz",
    // Overlay Config
    overlaySelection: 0,
    scoreIconSelection: 0,
    bottomBarSelection: 1,
    chatCommandsSelection: 1,
    bottomBarTextSizeSelection: 1,
}
 
function restoreFromSettings(settings) {
    for (menu of document.getElementsByName('menu-selection')) {
        if (Number(menu.value) === settings.menuSelection) {
            menu.checked = true
        }
    }
    restoreTeams(settings)
    restoreMapVeto(settings)
    restoreLiveGame(settings)
    restoreEventCasters(settings)
    restoreOverlay(settings)
}

function restoreTeams(settings) {
    document.getElementById('team-a-name').value = settings.teamAName
    document.getElementById('team-a-tri').value = settings.teamATri
    teamALogo = settings.teamALogo
    if (settings.teamANoLogo === 0) {
        document.getElementById('team-a-no-logo').checked = false
    } else {
        document.getElementById('team-a-no-logo').checked = true
    }
    document.getElementById('team-b-name').value = settings.teamBName
    document.getElementById('team-b-tri').value = settings.teamBTri
    teamBLogo = settings.teamBLogo
    if (settings.teamBNoLogo === 0) {
        document.getElementById('team-b-no-logo').checked = false
    } else {
        document.getElementById('team-b-no-logo').checked = true
    }
    setAllLogos()
    setAllNames()
}

function restoreMapVeto(settings) {
    for (option of document.getElementsByName('series-length-selection')) {
        if (Number(option.value) === settings.seriesLengthSelection) {
            option.checked = true
        }
    }
    for (option of document.getElementsByName('map-pool-selection')) {
        if (Number(option.value) === settings.mapPoolSelection) {
            option.checked = true
        }
    }
    for (option of document.getElementsByName('team-identifier-selection')) {
        if (Number(option.value) === settings.teamIdentifierSelection) {
            option.checked = true
        }
    }
    seriesLengthUpdate()
    teamIdentifierUpdate()
    // BO1 Map Veto
    if (settings.seriesLengthSelection === 0) {
        for (map of document.getElementsByName('map-pick-map')) {
            if (map.value === settings.mapPicks[0]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[0] === 'team-a') {
            document.getElementById('map-pick-team').checked = false
        } else {
            document.getElementById('map-pick-team').checked = true
        }
        if (settings.mapPicksSides[0] === 'team-a') {
            document.getElementById('map-pick-def').checked = false
        } else {
            document.getElementById('map-pick-def').checked = true
        }
    }
    // BO3 Map Veto
    if (settings.seriesLengthSelection === 1) {
        // Bans
        for (map of document.getElementsByName('1st-ban-map')) {
            if (map.value === settings.mapBans[0]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[0] === 'team-a') {
            document.getElementById('1st-ban-team').checked = false
        } else {
            document.getElementById('1st-ban-team').checked = true
        }
        for (map of document.getElementsByName('2nd-ban-map')) {
            if (map.value === settings.mapBans[1]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[1] === 'team-a') {
            document.getElementById('2nd-ban-team').checked = false
        } else {
            document.getElementById('2nd-ban-team').checked = true
        }
        for (map of document.getElementsByName('3rd-ban-map')) {
            if (map.value === settings.mapBans[2]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[2] === 'team-a') {
            document.getElementById('3rd-ban-team').checked = false
        } else {
            document.getElementById('3rd-ban-team').checked = true
        }
        for (map of document.getElementsByName('4th-ban-map')) {
            if (map.value === settings.mapBans[3]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[3] === 'team-a') {
            document.getElementById('4th-ban-team').checked = false
        } else {
            document.getElementById('4th-ban-team').checked = true
        }
        // Picks
        for (map of document.getElementsByName('1st-pick-map')) {
            if (map.value === settings.mapPicks[0]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[0] === 'team-a') {
            document.getElementById('1st-pick-team').checked = false
        } else {
            document.getElementById('1st-pick-team').checked = true
        }
        if (settings.mapPicksSides[0] === 'team-a') {
            document.getElementById('1st-pick-def').checked = false
        } else {
            document.getElementById('1st-pick-def').checked = true
        }
        for (map of document.getElementsByName('2nd-pick-map')) {
            if (map.value === settings.mapPicks[1]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[1] === 'team-a') {
            document.getElementById('2nd-pick-team').checked = false
        } else {
            document.getElementById('2nd-pick-team').checked = true
        }
        if (settings.mapPicksSides[1] === 'team-a') {
            document.getElementById('2nd-pick-def').checked = false
        } else {
            document.getElementById('2nd-pick-def').checked = true
        }
        for (map of document.getElementsByName('3rd-pick-map')) {
            if (map.value === settings.mapPicks[2]) {
                map.checked = true
            }
        }
        if (settings.mapPicksSides[2] === 'team-a') {
            document.getElementById('3rd-pick-def').checked = false
        } else {
            document.getElementById('3rd-pick-def').checked = true
        }
    }
    // BO5 Map Veto
    if (settings.seriesLengthSelection === 2) {
        // Bans
        for (map of document.getElementsByName('1st-ban-map')) {
            if (map.value === settings.mapBans[0]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[0] === 'team-a') {
            document.getElementById('1st-ban-team').checked = false
        } else {
            document.getElementById('1st-ban-team').checked = true
        }
        for (map of document.getElementsByName('2nd-ban-map')) {
            if (map.value === settings.mapBans[1]) {
                map.checked = true
            }
        }
        if (settings.mapBansTeams[1] === 'team-a') {
            document.getElementById('2nd-ban-team').checked = false
        } else {
            document.getElementById('2nd-ban-team').checked = true
        }
        // Picks
        for (map of document.getElementsByName('1st-pick-map')) {
            if (map.value === settings.mapPicks[0]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[0] === 'team-a') {
            document.getElementById('1st-pick-team').checked = false
        } else {
            document.getElementById('1st-pick-team').checked = true
        }
        if (settings.mapPicksSides[0] === 'team-a') {
            document.getElementById('1st-pick-def').checked = false
        } else {
            document.getElementById('1st-pick-def').checked = true
        }
        for (map of document.getElementsByName('2nd-pick-map')) {
            if (map.value === settings.mapPicks[1]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[1] === 'team-a') {
            document.getElementById('2nd-pick-team').checked = false
        } else {
            document.getElementById('2nd-pick-team').checked = true
        }
        if (settings.mapPicksSides[1] === 'team-a') {
            document.getElementById('2nd-pick-def').checked = false
        } else {
            document.getElementById('2nd-pick-def').checked = true
        }
        for (map of document.getElementsByName('3rd-pick-map')) {
            if (map.value === settings.mapPicks[2]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[2] === 'team-a') {
            document.getElementById('3rd-pick-team').checked = false
        } else {
            document.getElementById('3rd-pick-team').checked = true
        }
        if (settings.mapPicksSides[2] === 'team-a') {
            document.getElementById('3rd-pick-def').checked = false
        } else {
            document.getElementById('3rd-pick-def').checked = true
        }
        for (map of document.getElementsByName('4th-pick-map')) {
            if (map.value === settings.mapPicks[3]) {
                map.checked = true
            }
        }
        if (settings.mapPicksTeams[3] === 'team-a') {
            document.getElementById('4th-pick-team').checked = false
        } else {
            document.getElementById('4th-pick-team').checked = true
        }
        if (settings.mapPicksSides[3] === 'team-a') {
            document.getElementById('4th-pick-def').checked = false
        } else {
            document.getElementById('4th-pick-def').checked = true
        }
        for (map of document.getElementsByName('5th-pick-map')) {
            if (map.value === settings.mapPicks[4]) {
                map.checked = true
            }
        }
        if (settings.mapPicksSides[4] === 'team-a') {
            document.getElementById('5th-pick-def').checked = false
        } else {
            document.getElementById('5th-pick-def').checked = true
        }
    }
    teamIdentifierToggle()
    mapVetoUpdate()
}

function restoreLiveGame(settings) {
    mapScores = settings.mapScores
    intermissionState = 0
    setScores()
    scoreUpdate()
    intermissionDefault()
}

function restoreEventCasters(settings) {
    document.getElementById('event-name').value = settings.eventName
    eventLogo = settings.eventLogo
    if (settings.eventNoLogo === 0) {
        document.getElementById('event-no-logo').checked = false
    } else {
        document.getElementById('event-no-logo').checked = true
    }
    for (option of document.getElementsByName('casters-selection')) {
        if (Number(option.value) === settings.castersSelection) {
            option.checked = true
        }
    }
    document.getElementById('caster-1-name').value = settings.caster1Name
    document.getElementById('caster-2-name').value = settings.caster2Name
    castersUpdate()
    setAllLogos()
    setAllNames()
}

function restoreOverlay(settings) {
    for (option of document.getElementsByName('overlay-selection')) {
        if (Number(option.value) === settings.overlaySelection) {
            option.checked = true
        }
    }
    for (option of document.getElementsByName('score-icon-selection')) {
        if (Number(option.value) === settings.scoreIconSelection) {
            option.checked = true
        }
    }
    if (settings.bottomBarSelection === 0) {
        document.getElementById('bottom-bar-selection').checked = false
    } else {
        document.getElementById('bottom-bar-selection').checked = true
    }
    if (settings.chatCommandsSelection === 0) {
        document.getElementById('chat-commands-selection').checked = false
    } else {
        document.getElementById('chat-commands-selection').checked = true
    }
    if (settings.bottomBarTextSizeSelection === 0) {
        document.getElementById('bottom-bar-text-size-selection').checked = false
    } else {
        document.getElementById('bottom-bar-text-size-selection').checked = true
    }
    setOverlay()
    bottomBarUpdate()
}


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
    teamATri.value = teamATri.value.toUpperCase()
    teamBTri.value = teamBTri.value.toUpperCase()
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
let eventLogo = 'assets/Event_Logo_Preview.png'

function setAllLogos() {
    const teamALogoAll = document.getElementsByClassName('apply-team-a-logo')
    const teamBLogoAll = document.getElementsByClassName('apply-team-b-logo')
    const teamALogoUpload = document.getElementById('team-a-logo-upload')
    const teamBLogoUpload = document.getElementById('team-b-logo-upload')
    const teamANoLogo = document.getElementById('team-a-no-logo')
    const teamBNoLogo = document.getElementById('team-b-no-logo')
    const eventLogoAll = document.getElementsByClassName('apply-event-logo')
    const eventLogoUpload = document.getElementById('event-logo-upload')
    const eventNoLogo = document.getElementById('event-no-logo')
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
    if (eventNoLogo.checked) {
        eventLogoUpload.value = ''
        document.getElementById('event-logo-preview').src = 'assets/Event_Logo_Preview.png'
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
    if (eventNoLogo.checked === false) {
        for (const element of eventLogoAll) {
            element.src = eventLogo
        }
    }
}

function uploadTeamALogo() {
    document.getElementById('team-a-no-logo').checked = false
    teamALogo = prompt(`Please provide an img link for ${teamATri.value}'s logo. We recommend uploading the logo to Discord and copying the image link`)
    if (teamALogo !== '' && teamALogo !== null) {
        setAllLogos()
    } else {
        teamALogo = 'assets/200x200_No_Logo.png'
    }
}

function uploadTeamBLogo() {
    document.getElementById('team-b-no-logo').checked = false
    teamBLogo = prompt(`Please provide an img link for ${teamBTri.value}'s logo. We recommend uploading the logo to Discord and copying the image link`)
    if (teamBLogo !== '' && teamBLogo !== null) {
        setAllLogos()
    } else {
        teamBLogo = 'assets/200x200_No_Logo.png'
    }
}

function uploadEventLogo() {
    document.getElementById('event-no-logo').checked = false
    eventLogo = prompt(`Please provide an img link for your event's logo. We recommend uploading the logo to Discord and copying the image link`)
    if (eventLogo !== '' && eventLogo !== null) {
        setAllLogos()
    } else {
        eventLogo = 'assets/Event_Logo_Preview.png'
    }
}

document.getElementById('team-a-no-logo').addEventListener('change', setAllLogos)
document.getElementById('team-b-no-logo').addEventListener('change', setAllLogos)
document.getElementById('event-no-logo').addEventListener('change', setAllLogos)
document.getElementById('team-a-logo-upload').addEventListener('click', uploadTeamALogo)
document.getElementById('team-b-logo-upload').addEventListener('click', uploadTeamBLogo)
document.getElementById('event-logo-upload').addEventListener('click', uploadEventLogo)



// #####################################################################
// #################### Map Series Length Selection ####################
// #####################################################################
let seriesLengthSelection = 1

function seriesLengthUpdate() {
    document.getElementsByName('series-length-selection').forEach((option) => {
        if (option.checked) {
            seriesLengthSelection = Number(option.value)
            mapPoolUpdate()
        }
    })
}

document.getElementsByName('series-length-selection').forEach((option) => {
    option.addEventListener('change', seriesLengthUpdate)
})




// ###################################################################
// #################### Team Identifier Selection ####################
// ###################################################################
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

function setMapPool() {
    const mapVeto = document.getElementById('veto-config-body')
    while (mapVeto.firstChild) {
        mapVeto.removeChild(mapVeto.firstChild)
    }
    if (seriesLengthSelection === 0) {
        createMapPickBan('map', 1, 'pick', false, 0)
        mapTeamDefActivate()
        teamIdentifierToggle()
        mapVetoActivate()
        mapVetoUpdate()
        resetScores()
    } else if (seriesLengthSelection === 1) {
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
        resetScores()
    } else if (seriesLengthSelection === 2) {
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
        resetScores()
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
    setScores()
    scoreUpdate()
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
let mapScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                        if ((seriesLengthSelection === 0)) {
                            mapPickImgName.textContent = `${map}`
                            mapPickImg.appendChild(mapPickImgName)
                        } else if ((seriesLengthSelection === 1 && i === 2) || (seriesLengthSelection === 2 && i === 4)) {
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
                    liveGameTeamAScore.id = `map-${i}-team-a-score`
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
                    liveGameTeamBScore.id = `map-${i}-team-b-score`
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
    mapScores = []
    teamASeriesScore = 0
    teamBSeriesScore = 0
    mapNumber = teamASeriesScore+teamBSeriesScore
    const teamAScores = document.getElementsByClassName('team-a-score')
    const teamBScores = document.getElementsByClassName('team-b-score')
    Array.from(teamAScores).forEach((map, i) => {
        if (map.value>=13 && map.value>=Number(teamBScores[i].value)+2) {
            teamASeriesScore++
            mapWinners.push('team-a')
        }
        if (teamBScores[i].value>=13 && teamBScores[i].value>=Number(map.value)+2) {
            teamBSeriesScore++
            mapWinners.push('team-b')
        }
    })
    mapNumber = teamASeriesScore+teamBSeriesScore
    currentMap = mapPicks[mapNumber]
    // mapScores update
    Array.from(document.querySelectorAll('.team-a-score, .team-b-score')).forEach((score) => {
        mapScores.push(Number(score.value))
    })
    // Updates Side Bar
    setLiveGameSideBar()
}

function scoreUpdateActivate() {
    const scoreUpdateTriggers = document.querySelectorAll('.team-a-score, .team-b-score')
    for (const element of scoreUpdateTriggers) {
        element.addEventListener('change', scoreUpdate)
        element.addEventListener('change', settingsSend)
    }
}

function setScores() {
    Array.from(document.querySelectorAll('.team-a-score, .team-b-score')).forEach((score, i) => {
        score.value = mapScores[i]
    })
}

function resetScores() {
    mapScores = []
    Array.from(document.querySelectorAll('.team-a-score, .team-b-score')).forEach((score) => {
        mapScores.push(0)
    })
    setScores()
    scoreUpdate()
}

document.getElementById('reset-scores').addEventListener("click", resetScores)



// ########################################################################
// #################### Intermission/Live Game Sidebar ####################
// ##########################################################$#############
let mapsCommand = '!editcom !maps'
let scoreCommand = '!editcom !score'
let intermissionState = 0
let timer = null

function copyMaps() {
    function teamTriMap(num) {
        if (mapPicksTeams[num] === 'team-a') {
            return(teamATri.value)
        } else {
            return(teamBTri.value)
        }
    }

    if (seriesLengthSelection === 0) {
        mapsCommand = `!editcom !maps BO1 Map - ${mapPicks[0]}`
        navigator.clipboard.writeText(mapsCommand)
    } else if (seriesLengthSelection === 1) {
        mapsCommand = `!editcom !maps Map 1 (${teamTriMap(0)}) - ${mapPicks[0]}`
        mapPicks.forEach((map, i) => {
            if (i === 2) {
                mapsCommand = mapsCommand + ` | Map 3 (Decider) - ${map}`
            } else if (i !== 0) {
                mapsCommand = mapsCommand + ` | Map ${i+1} (${teamTriMap(i)}) - ${map}`
            }
        })
        navigator.clipboard.writeText(mapsCommand)
    } else if (seriesLengthSelection === 2) {
        mapsCommand = `!editcom !maps Map 1 (${teamTriMap(0)}) - ${mapPicks[0]}`
        mapPicks.forEach((map, i) => {
            if (i === 4) {
                mapsCommand = mapsCommand + ` | Map 3 (Decider) - ${map}`
            } else if (i !== 0) {
                mapsCommand = mapsCommand + ` | Map ${i+1} (${teamTriMap(i)}) - ${map}`
            }
        })
        navigator.clipboard.writeText(mapsCommand)
    }    
}

function copyScore() {
    function scoreAddCurrentMap(num) {
        scoreCommand = scoreCommand + ` | Map ${num+1}, ${mapPicks[num]} - Current` 
    }
    function scoreAddFinishedMap(num, score) {
        scoreCommand = scoreCommand + ` | Map ${num+1}, ${mapPicks[num]} - ${teamATri.value} ${mapScores[score]}-${mapScores[score+1]} ${teamBTri.value}`
    }
    function scoreAddTBDMap(num) {
        scoreCommand = scoreCommand + ` | Map ${num+1}, ${mapPicks[num]} - TBD`
    }
    function scoreAddNAMap(num) {
        scoreCommand = scoreCommand + ` | Map ${num+1}, ${mapPicks[num]} - N/A`
    }

    if (seriesLengthSelection === 0) {
        if (mapNumber === 0) {
            scoreCommand = `!editcom !score BO1 Map ${mapPicks[0]} - Current`
        } else {
            scoreCommand = `!editcom !score BO1 Map ${mapPicks[0]} - ${teamATri.value} ${mapScores[0]}-${mapScores[1]} ${teamBTri.value}`
        }
        navigator.clipboard.writeText(scoreCommand)
    } else if (seriesLengthSelection === 1) {
        scoreCommand = `!editcom !score Series Score - ${teamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${teamBTri.value}`
        mapPicks.forEach((map, i) => {
            if ((i === mapNumber) && (teamASeriesScore < 2 && teamBSeriesScore < 2)) {
                scoreAddCurrentMap(i)
            } else if (i < mapNumber) {
                scoreAddFinishedMap(i, (i*2))
            } else if (teamASeriesScore > 1 || teamBSeriesScore > 1) {
                scoreAddNAMap(i)
            } else {
                scoreAddTBDMap(i)
            }
        })
        navigator.clipboard.writeText(scoreCommand)
    } else if (seriesLengthSelection === 2) {
        scoreCommand = `!editcom !score Series Score - ${teamATri.value} ${teamASeriesScore}-${teamBSeriesScore} ${teamBTri.value}`
        mapPicks.forEach((map, i) => {
            if ((i === mapNumber) && (teamASeriesScore < 3 && teamBSeriesScore < 3)) {
                scoreAddCurrentMap(i)
            } else if (i < mapNumber) {
                scoreAddFinishedMap(i, (i*2))
            } else if (teamASeriesScore > 2 || teamBSeriesScore > 2) {
                scoreAddNAMap(i)
            } else {
                scoreAddTBDMap(i)
            }
        })
        navigator.clipboard.writeText(scoreCommand)
    }
}

document.getElementById('maps-command-copy').addEventListener("click", copyMaps)
document.getElementById('score-command-copy').addEventListener("click", copyScore)


document.getElementById('intermission-default').addEventListener("click", () => {intermissionState = 0; intermissionDefault()})
document.getElementById('intermission-tech').addEventListener("click", () => {intermissionState = 1; intermissionTech()})
document.getElementById('intermission-3').addEventListener("click", () => {intermissionState = 2; intermission3()})
document.getElementById('intermission-5').addEventListener("click", () => {intermissionState = 3; intermission5()})
document.getElementById('intermission-10').addEventListener("click", () => {intermissionState = 4; intermission10()})

function intermissionDefault() {
    const intermissionHeading = document.getElementById('side-bar-intermission')
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    if (mapNumber === 0) {
        if (intermissionHeading.innerHTML.includes('Starting Soon') === false) {
            intermissionHeading.innerHTML = 'Starting Soon'
        } else if (intermissionHeading.innerHTML.length > 15) {
            intermissionHeading.innerHTML = 'Starting Soon'
        } else {
            intermissionHeading.innerHTML += '.'
        }
        timer = setTimeout(intermissionDefault, 500)
    } else if (((seriesLengthSelection === 0) && (teamASeriesScore === 1 || teamBSeriesScore === 1)) || ((seriesLengthSelection === 1) && (teamASeriesScore === 2 || teamBSeriesScore === 2)) || ((seriesLengthSelection === 2) && (teamASeriesScore === 3 || teamBSeriesScore === 3))) {
        if (intermissionHeading.innerHTML.includes('Ending Soon') === false) {
            intermissionHeading.innerHTML = 'Ending Soon'
        } else if (intermissionHeading.innerHTML.length > 14) {
            intermissionHeading.innerHTML = 'Ending Soon'
        } else {
            intermissionHeading.innerHTML += '.'
        }
        timer = setTimeout(intermissionDefault, 500)
    } else {
        if (intermissionHeading.innerHTML.includes('Waiting For Players') === false) {
            intermissionHeading.innerHTML = 'Waiting For Players'
        } else if (intermissionHeading.innerHTML.length > 21) {
            intermissionHeading.innerHTML = 'Waiting For Players'
        } else {
            intermissionHeading.innerHTML += '.'
        }
        timer = setTimeout(intermissionDefault, 500)
    }
}

function intermissionTech() {
    const intermissionHeading = document.getElementById('side-bar-intermission')
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
    } else if (intermissionHeading.innerHTML.length > 12) {
        intermissionHeading.innerHTML = 'Tech Pause'
    } else {
        intermissionHeading.innerHTML += '.'
    }
    timer = setTimeout(intermissionTech, 500)
}

let deadline = null
let countdown = null

function countdownTimer() {
    const intermissionHeading = document.getElementById('side-bar-intermission')
    let t = deadline - Date.now() + 500
    // console.log(t)
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
    let seconds = Math.floor((t % (1000 * 60)) / 1000).toString().padStart(2, '0')

    // minutes = `${minutes}`
    // seconds = `${seconds}`
    // minutes = minutes.padStart(2, '0')
    // seconds = seconds.padStart(2, '0')

    intermissionHeading.innerHTML = "Intermission - " + minutes + ":" + seconds

    if (minutes === '-1' && seconds === '-1') {
        clearInterval(countdown)
        countdown = null
        intermissionState = 0
        intermissionDefault()
    }
}

function intermission3() {
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    deadline = Date.now() + 3*60000
    countdownTimer()
    countdown = setInterval(countdownTimer, 1000)
}

function intermission5() {
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    deadline = Date.now() + 5*60000
    countdownTimer()
    countdown = setInterval(countdownTimer, 1000)
}

function intermission10() {
    if (timer !=null) {
        clearTimeout(timer)
        timer = null
    }
    if (countdown !=null) {
        clearInterval(countdown)
        countdown = null
    }
    deadline = Date.now() + 10*60000
    countdownTimer()
    countdown = setInterval(countdownTimer, 1000)
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




// #################################################
// #################### Casters ####################
// #################################################
let castersSelection = 0
function castersUpdate() {
    const casterHandles1 = document.getElementsByClassName('caster-handle-1')
    const casterHandles2 = document.getElementsByClassName('caster-handle-2')
    const castersSelectionMenu = document.getElementsByName('casters-selection')
    for (const element of castersSelectionMenu) {
        if (element.checked) {
            castersSelection = Number(element.value)
            if (Number(element.value) === 0) {
                document.getElementById('cams-overlay-video').src = 'assets/Single_Cam_Preview.png'
                document.getElementById('cams-screen-overlay-video').src = 'assets/Single_Cam_Screen_Preview.png'
                for (const element of casterHandles1) {
                    element.style.display = 'grid'
                }
                for (const element of casterHandles2) {
                    element.style.display = 'none'
                }
            } else {
                document.getElementById('cams-overlay-video').src = 'assets/Dual_Cam_Preview.png'
                document.getElementById('cams-screen-overlay-video').src = 'assets/Dual_Cam_Screen_Preview.png'
                for (const element of casterHandles2) {
                    element.style.display = 'grid'
                }
                for (const element of casterHandles1) {
                    element.style.display = 'none'
                }
            }
        }
    }
}

for (const element of document.getElementsByName('casters-selection')) {
    element.addEventListener("change", castersUpdate)
}



// #################################################################
// #################### Overlay Display Options ####################
// #################################################################

function setOverlay() {
    const overlayElements = document.getElementsByClassName('overlay-element')
    for (option of document.getElementsByName('overlay-selection')) {
        if (Number(option.value) === 0 && option.checked) {
            for (const element of overlayElements) {
                element.src = element.src.replace(/(GC|LPL)/g, "VCL")
            }
        }
        
        if (Number(option.value) === 1 && option.checked) {
            for (const element of overlayElements) {
                element.src = element.src.replace(/(VCL|LPL)/g, "GC")
            }
        }
    }
    
}

document.getElementsByName('overlay-selection').forEach((menu) => {
    menu.addEventListener('change', setOverlay)
})


function bottomBarUpdate() {
    const bottomBarSelection = document.getElementById('bottom-bar-selection')
    const chatCommandsSelection = document.getElementById('chat-commands-selection')
    const bottomBarTextSizeSelection = document.getElementById('bottom-bar-text-size-selection')
    const bottomBarPreview = document.getElementById('bottom-bar-preview')
    const chatCommandsAll = document.getElementsByClassName('chat-commands')
    if (bottomBarSelection.checked === false) {
        bottomBarPreview.style.display = 'none'
        document.getElementById('bottom-bar-preview-heading').textContent = 'Bottom Bar is currently hidden'
    } else {
        bottomBarPreview.style.display = 'grid'
        document.getElementById('bottom-bar-preview-heading').textContent = '▼ Bottom Bar Preview ▼'
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
        bottomBarPreview.style.fontSize = '25pt'
    } else {
        bottomBarPreview.style.fontSize = '20pt'
    }
}

document.getElementById('bottom-bar-selection').addEventListener('change', bottomBarUpdate)
document.getElementById('chat-commands-selection').addEventListener('change', bottomBarUpdate)
document.getElementById('bottom-bar-text-size-selection').addEventListener('change', bottomBarUpdate)



// #########################################################
// #################### Saving Settings ####################
// #########################################################
const currentSettings = {
    menuSelection: 1,
    // Teams Config
    teamAName: "Team A",
    teamATri: "TMA",
    teamALogo: "assets/200x200_No_Logo.png",
    teamANoLogo: 0,
    teamBName: "Team B",
    teamBTri:  "TMB",
    teamBLogo: "assets/200x200_No_Logo.png",
    teamBNoLogo: 0, 
    // Map Veto Config
    seriesLengthSelection: 1,
    mapPoolSelection: 0,
    teamIdentifierSelection: 0,
    mapBans: ['Abyss', 'Ascent', 'Icebox', 'Lotus'],
    mapPicks: ['Bind', 'Haven', 'Sunset'],
    mapBansTeams: ['team-a', 'team-b', 'team-a', 'team-b'],
    mapPicksTeams: ['team-a', 'team-b'],
    mapPicksSides: ['team-a', 'team-a', 'team-a'],
    // Live Game
    mapScores: [0, 0, 0, 0, 0, 0],
    mapWinners: [],
    teamASeriesScore: 0,
    teamBSeriesScore: 0,
    mapNumber: 0,
    currentMap: "Bind",
    intermissionState: 0,
    deadline: null,
    // Event/Casters Config
    eventName: "Event Name",
    eventLogo: "assets/Event_Logo_Preview.png",
    eventNoLogo: 0,
    castersSelection: 0,
    caster1Name: "",
    caster2Name: "",
    // Overlay Config
    overlaySelection: 0,
    scoreIconSelection: 0,
    bottomBarSelection: 1,
    chatCommandsSelection: 1,
    bottomBarTextSizeSelection: 1,
}

function settingsSend() {
    liveGameSend()
    teamsConfigSend()
    mapVetoSend()
    eventCastersSend()
    overlaySend()
    api.writeOverlaySetup(currentSettings)
}

function liveGameSend() {
    currentSettings.mapScores = mapScores
    currentSettings.mapWinners = mapWinners
    currentSettings.teamASeriesScore = teamASeriesScore
    currentSettings.teamBSeriesScore = teamBSeriesScore
    currentSettings.mapNumber = mapNumber
    currentSettings.currentMap = currentMap
    currentSettings.intermissionState = intermissionState
    currentSettings.deadline = deadline
    console.log(currentSettings)
}

for (element of document.querySelectorAll('#intermission-default, #intermission-tech, #intermission-3, #intermission-5, #intermission-10, #reset-scores')) {
    element.addEventListener('click', settingsSend)
}

function teamsConfigSend() {
    currentSettings.teamAName = teamAName.value
    currentSettings.teamATri = teamATri.value
    currentSettings.teamALogo = teamALogo
    if (document.getElementById('team-a-no-logo').checked) {
        currentSettings.teamANoLogo = 1
    } else {
        currentSettings.teamANoLogo = 0
    }
    currentSettings.teamBName = teamBName.value
    currentSettings.teamBTri = teamBTri.value
    currentSettings.teamBLogo = teamBLogo
    if (document.getElementById('team-b-no-logo').checked) {
        currentSettings.teamBNoLogo = 1
    } else {
        currentSettings.teamBNoLogo = 0
    }
}

function mapVetoSend() {
    for (option of document.getElementsByName('series-length-selection')) {
        if (option.checked) {
            currentSettings.seriesLengthSelection = Number(option.value)
        }
    }
    for (option of document.getElementsByName('map-pool-selection')) {
        if (option.checked) {
            currentSettings.mapPoolSelection = Number(option.value)
        }
    }
    for (option of document.getElementsByName('map-pool-selection')) {
        if (option.checked) {
            currentSettings.teamIdentifierSelection = Number(option.value)
        }
    }
    currentSettings.mapBans = mapBans
    currentSettings.mapPicks = mapPicks
    currentSettings.mapBansTeams = mapBansTeams
    currentSettings.mapPicksTeams = mapPicksTeams
    currentSettings.mapPicksSides = mapPicksSides

}

function eventCastersSend() {
    currentSettings.eventName = eventName.value
    currentSettings.eventLogo = eventLogo
    if (document.getElementById('event-no-logo').checked) {
        currentSettings.eventNoLogo = 1
    } else {
        currentSettings.eventNoLogo = 0
    }
    for (option of document.getElementsByName('casters-selection')) {
        if (option.checked) {
            currentSettings.castersSelection = Number(option.value)
        }
    }
    currentSettings.caster1Name = caster1Name.value
    currentSettings.caster2Name = caster2Name.value
}

function overlaySend() {
    for (option of document.getElementsByName('overlay-selection')) {
        if (option.checked) {
            currentSettings.overlaySelection = Number(option.value)
        }
    }
    for (option of document.getElementsByName('score-icon-selection')) {
        if (option.checked) {
            currentSettings.scoreIconSelection = Number(option.value)
        }
    }
    if (document.getElementById('bottom-bar-selection').checked) {
        currentSettings.bottomBarSelection = 1
    } else {
        currentSettings.bottomBarSelection = 0
    }
    if (document.getElementById('chat-commands-selection').checked) {
        currentSettings.chatCommandsSelection = 1
    } else {
        currentSettings.chatCommandsSelection = 0
    }
    if (document.getElementById('bottom-bar-text-size-selection').checked) {
        currentSettings.bottomBarTextSizeSelection = 1
    } else {
        currentSettings.bottomBarTextSizeSelection = 0
    }
}

for (element of document.getElementsByClassName('save-button')) {
    element.addEventListener('click', settingsSend)
}


function onPageLoad() {
    if (!auth.qmValidTokenInStorage()) {
        console.log('Not logged in')
        document.getElementById('account-menu').checked = true
        document.getElementById('live-game-menu').disabled = true
        document.getElementById('teams-menu').disabled = true
        document.getElementById('map-veto-menu').disabled = true
        document.getElementById('event-casters-menu').disabled = true
        document.getElementById('overlay-menu').disabled = true
        document.getElementById('modules-menu').disabled = true
        document.getElementById('sign-in-button-contents').children[0].innerHTML = 'Sign In/Create Account' + '<br>' + 'This is required for the console to link to the overlay modules'
        document.getElementById('sign-in-button').addEventListener('click', auth.login)
    } else {
        const tokens = auth.qmGetTokensFromStorage();
        const access_token = tokens.access_token;
        const accessTokenContent = auth.parseJWTPayload(access_token);
        var userName = accessTokenContent.username;
        api.setAccessToken(access_token);

        document.getElementById('sign-in-button-contents').children[0].innerHTML = `Log out` + '<br>' + `Currently signed in to ${userName}`
        document.getElementById('sign-in-button').addEventListener('click', auth.logout)
        getOverlaySetup()
    }
}

let url = new URL(document.location.href)

async function getOverlaySetup() {
    let setupData
    setupData = await api.readOverlaySetup()
    if (!setupData.overlaySetup) {
        api.writeOverlaySetup(defaultSettings)
        setupData = await api.readOverlaySetup()
    }
    restoreFromSettings(setupData.overlaySetup)
    url.searchParams.set('token', `${setupData.token}`)
    // document.location.href = document.location.href + `?token=${setupData.token}`
    console.log(setupData.token)
}

document.getElementById('reset-team-config').addEventListener('click', () => {restoreTeams(defaultSettings)})
document.getElementById('reset-map-veto').addEventListener('click', () => {restoreMapVeto(defaultSettings)})
document.getElementById('reset-event-casters-config').addEventListener('click', () => {restoreEventCasters(defaultSettings)})
document.getElementById('reset-overlay-config').addEventListener('click', () => {restoreOverlay(defaultSettings)})
document.getElementById('reset-console').addEventListener('click', () => {restoreFromSettings(defaultSettings)})
restoreFromSettings(defaultSettings)