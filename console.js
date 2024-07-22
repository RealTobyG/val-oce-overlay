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



// ############################################################
// #################### Map Pool Selection ####################
// ############################################################
const mapPoolSelection = document.getElementById('map-pool-selection')
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

function setMapSelection(selectElement) {
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild)
    }
    for (const map of mapData) {
        if (map.mapPool || mapPoolSelection.selectedIndex !== 0) {
            const newOption = document.createElement('option')
            newOption.value = map.mapName
            newOption.textContent = map.mapName
            selectElement.appendChild(newOption)
        }
    }
    // setMapVeto() - does not exist currently
}

function setMapPool() {
    const mapBansAll = document.getElementsByClassName('map-ban-selection')
    const mapPicksAll = document.getElementsByClassName('map-pick-selection')
    for (const menu of mapBansAll) {
        setMapSelection(menu)
    }
    for (const menu of mapPicksAll) {
        setMapSelection(menu)
    }
}

document.getElementById('map-pool-selection').addEventListener('change', setMapPool)



// #####################################################################
// #################### Map Series Length Selection ####################
// #####################################################################
// THIS SECTION MIGHT NOT BE NEEDED
const seriesLengthSelection = document.getElementById('series-length-selection')

function setSeriesLength() {
    const bo3Console = document.getElementById('bo3-console')
    const bo5Console = document.getElementById('bo5-console')
    const bo1Console = document.getElementById('bo1-console')
    if (seriesLengthSelection.value === "BO3") {
        bo3Console.setAttribute("class", "active-series-console")
        bo5Console.setAttribute("class", "display-none")
        bo1Console.setAttribute("class", "display-none")
    } else if (seriesLengthSelection.value === "BO5") {
        bo5Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "display-none")
        bo1Console.setAttribute("class", "display-none")
    } else {
        bo1Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "display-none")
        bo5Console.setAttribute("class", "display-none")
    }
    // CONSOLE WARNING - CHANGING SERIES LENGTH RESETS VETO/SCORES
    // setMapPool()
    // resetScores()
    // CONSOLE WARNING - CHANGING SERIES LENGTH RESETS VETO/SCORES
}

document.getElementById('series-length-selection').addEventListener('change', setSeriesLength)
//THIS SECTION MIGHT NOT BE NEEDED



// ########################################################
// #################### Map Veto Logic ####################
// ########################################################
let mapPicks = []
let mapBans = []
let mapPicksTeams = []
let mapBansTeams = []
let mapPicksSides = []



// #############################################################
// #################### Score Keeping Logic ####################
// #############################################################
let mapWinners = []



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