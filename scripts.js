const TeamAName = document.querySelector("#team-a-name")
const TeamBName = document.querySelector("#team-b-name")
const TeamATri = document.querySelector("#team-a-tri")
const TeamBTri = document.querySelector("#team-b-tri")
let TeamALogo = 'n/a'
let TeamBLogo = 'n/a'

const OverlaySelection = document.querySelector("#overlay-selection")

const SeriesLengthSelection = document.querySelector("#series-length-selection")

const MapPoolSelection = document.querySelector("#map-pool-selection")

const mapData = [
    {mapname: "Abyss", mappool: true},
    {mapname: "Ascent", mappool: true},
    {mapname: "Bind", mappool: true},
    {mapname: "Breeze", mappool: false},
    {mapname: "Fracture", mappool: false},
    {mapname: "Haven", mappool: true},
    {mapname: "Icebox", mappool: true},
    {mapname: "Lotus", mappool: true},
    {mapname: "Pearl", mappool: false},
    {mapname: "Split", mappool: false},
    {mapname: "Sunset", mappool: true},
]

let mapPicks = []
let mapBans = []
let mapPicksTeams = []
let mapBansTeams = []
let mapPicksSides = []
let mapWinners = []

// Overlay Template Selection
function setOverlay() {
    const SelectedOption = document.getElementById('overlay-selection').value
    const overlayElements = document.getElementsByClassName('overlay-element')
    if (SelectedOption === "GC") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|LPL)/g, "GC")
        }
    } else if (SelectedOption === "VCL") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(GC|LPL)/g, "VCL")
        }
    } else {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|GC)/g, "LPL")
        }
    }
}

OverlaySelection.addEventListener("change", setOverlay)


// Team A/B Name Changing
function setTeamNames() {
    const TeamANameAll = document.getElementsByClassName('apply-team-a-name');
    const TeamBNameAll = document.getElementsByClassName('apply-team-b-name');
    const TeamATriAll = document.getElementsByClassName('apply-team-a-tri');
    const TeamBTriAll = document.getElementsByClassName('apply-team-b-tri');
    const TeamAFullAll = document.getElementsByClassName('apply-team-a-full');
    const TeamBFullAll = document.getElementsByClassName('apply-team-b-full');
    for (const instance of TeamANameAll) {
        instance.textContent = `${TeamAName.value}`
    }
    for (const instance of TeamBNameAll) {
        instance.textContent = `${TeamBName.value}`
    }
    for (const instance of TeamATriAll) {
        instance.textContent = `${TeamATri.value}`
    }
    for (const instance of TeamBTriAll) {
        instance.textContent = `${TeamBTri.value}`
    }
    for (const instance of TeamAFullAll) {
        instance.textContent = `(${TeamATri.value}) ${TeamAName.value}`
    }
    for (const instance of TeamBFullAll) {
        instance.textContent = `(${TeamBTri.value}) ${TeamBName.value}`
    }
}

TeamAName.addEventListener("keyup", setTeamNames);
TeamBName.addEventListener("keyup", setTeamNames);
TeamATri.addEventListener("keyup", setTeamNames);
TeamBTri.addEventListener("keyup", setTeamNames);


// Team A/B Logo Changing
function setTeamLogos() {
    const TeamALogoAll = document.getElementsByClassName('apply-team-a-logo')
    const TeamBLogoAll = document.getElementsByClassName('apply-team-b-logo')
    const TeamALogoUpload = document.getElementById('team-a-logo-upload')
    const TeamBLogoUpload = document.getElementById('team-b-logo-upload')
    const TeamANoLogo = document.getElementById('team-a-no-logo')
    const TeamBNoLogo = document.getElementById('team-b-no-logo')
    if (TeamANoLogo.checked) {
        TeamALogoUpload.value = ''
        for (const element of TeamALogoAll) {
            element.src = "assets/200x200_No_Logo.png"
        }
    }
    if (TeamBNoLogo.checked) {
        TeamBLogoUpload.value = ''
        for (const element of TeamBLogoAll) {
            element.src = "assets/200x200_No_Logo.png"
        }
    }
    if (TeamALogoUpload.value !== '') {
        for (const element of TeamALogoAll) {
            element.src = TeamALogo
        }
    }
    if (TeamBLogoUpload.value !== '') {
        for (const element of TeamBLogoAll) {
            element.src = TeamBLogo
        }
    }
}

function uploadTeamALogo() {
    document.getElementById('team-a-no-logo').checked = false
    const TeamALogoUpload = document.getElementById('team-a-logo-upload')
    URL.revokeObjectURL(TeamALogo)
    TeamALogo = URL.createObjectURL(TeamALogoUpload.files[0])
    setTeamLogos()
}

function uploadTeamBLogo() {
    document.getElementById('team-b-no-logo').checked = false
    const TeamBLogoUpload = document.getElementById('team-b-logo-upload')
    URL.revokeObjectURL(TeamBLogo)
    TeamBLogo = URL.createObjectURL(TeamBLogoUpload.files[0])
    setTeamLogos()
}

function teamLogoActivate() {
    document.getElementById('team-a-no-logo').addEventListener('change', setTeamLogos)
    document.getElementById('team-b-no-logo').addEventListener('change', setTeamLogos)
    document.getElementById('team-a-logo-upload').addEventListener('change', uploadTeamALogo)
    document.getElementById('team-b-logo-upload').addEventListener('change', uploadTeamBLogo)
}

// Map Series Length Selection
function setSeriesLength() {
    const bo3Console = document.querySelector("#bo3-console")
    const bo5Console = document.querySelector("#bo5-console")
    const bo1Console = document.querySelector("#bo1-console")
    if (SeriesLengthSelection.value === "BO3") {
        bo3Console.setAttribute("class", "active-series-console")
        bo5Console.setAttribute("class", "display-none")
        bo1Console.setAttribute("class", "display-none")
    } else if (SeriesLengthSelection.value === "BO5") {
        bo5Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "display-none")
        bo1Console.setAttribute("class", "display-none")
    } else {
        bo1Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "display-none")
        bo5Console.setAttribute("class", "display-none")
    }
    setMapPool()
    resetScores()
}

SeriesLengthSelection.addEventListener("change", setSeriesLength)


// Map Pool Selection
function setMapSelection(selectElement) {
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild)
    }
    for (const map of mapData) {
        if (map.mappool || MapPoolSelection.selectedIndex !== 0) {
            const newOption = document.createElement('option')
            newOption.value = map.mapname
            newOption.textContent = map.mapname
            selectElement.appendChild(newOption)
        }
    }
    setMapVeto()
}

function setMapPool() {
    const mapBansAll = document.getElementsByClassName("map-ban-selection")
    const mapPicksAll = document.getElementsByClassName("map-pick-selection")
    for (const menu of mapBansAll) {
        setMapSelection(menu)
    }
    for (const menu of mapPicksAll) {
        setMapSelection(menu)
    }
}

MapPoolSelection.addEventListener("change", setMapPool)


// Map Veto Logic
function setMapVeto() {
    const mapBansAll = document.getElementsByClassName("map-ban-selection")
    const mapPicksAll = document.getElementsByClassName("map-pick-selection")
    const mapBansTeamsAll = document.getElementsByClassName("map-ban-team")
    const mapPicksTeamsAll = document.getElementsByClassName("map-pick-team")
    const sideSelections = document.getElementsByClassName("side-selection-teams")
    mapPicks = []
    mapBans = []
    mapPicksTeams = []
    mapBansTeams = []
    mapPicksSides = []
    if (SeriesLengthSelection.value === "BO3") {
        for (const map of mapBansAll) {
            if (map.classList.contains("bo3")) {
                let selectedMap = {mapname: `${map.value}`}
                mapBans.push(selectedMap);
            }
        }

        for (const map of mapPicksAll) {
            if (map.classList.contains("bo3")) {
                let selectedMap = {mapname: `${map.value}`}
                mapPicks.push(selectedMap);
            }
        }

        for (const team of mapBansTeamsAll) {
            if (team.classList.contains("bo3")) {
                let SelectedTeam = `${team.value}`
                mapBansTeams.push(SelectedTeam)
            }
        }

        for (const team of mapPicksTeamsAll) {
            if (team.classList.contains("bo3")) {
                let SelectedTeam = `${team.value}`
                mapPicksTeams.push(SelectedTeam)
            }
        }

        for (const team of sideSelections) {
            if (team.classList.contains("bo3")) {
                let SelectedTeam = `${team.value}`
                mapPicksSides.push(SelectedTeam)
            }
        }

        const pickSides = document.getElementsByClassName('bo3-side-team')
        Array.from(pickSides).forEach((element, i) => {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapPicksSides[i]}`)
        })

        const banNames = document.getElementsByClassName('bo3-ban-team')
        Array.from(banNames).forEach((element, i) => {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapBansTeams[i]}`)
        })

        const pickNames = document.getElementsByClassName('bo3-pick-team')
        Array.from(pickNames).forEach((element, i) => {
            element.className = element.className.replace(/(team-a|team-b)/g, `${mapPicksTeams[i]}`)
        })

        const banImgs = document.getElementsByClassName('bo3-ban-img')
        const banMapNames = document.getElementsByClassName('bo3-ban-mapname')
        mapBans.forEach((ban, i) => {
            banImgs[i].src = `assets/Maps/${ban.mapname}_320x320.png`
            banMapNames[i].textContent = `${ban.mapname}`
        })

        const pickImgs = document.getElementsByClassName('bo3-pick-img')
        const pickMapNames = document.getElementsByClassName('bo3-pick-mapname')
        mapPicks.forEach((pick, i) => {
            pickImgs[i].src = `assets/Maps/${pick.mapname}_320x640.png`
            pickMapNames[i].textContent = `${pick.mapname}`
        })

        setTeamNames()
    }
}

function mapVetoActivate() {
    const selectElements = document.querySelectorAll(
        ".map-ban-selection, .map-pick-selection, .map-ban-team, .map-pick-team, .side-selection-teams"
    )
    for (const element of selectElements) {
        element.addEventListener("change", setMapVeto)
    }
}


//Score Keeping Logic
function scoreUpdate() {
    let teamASeriesScore = 0
    let teamBSeriesScore = 0
    let seriesScore = `${teamASeriesScore}-${teamBSeriesScore}`
    let mapNumber = teamASeriesScore+teamBSeriesScore
    let mapWinners = []
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
    })
    // Shows/Hides map results on map veto overlay
    const mapResultOverlays = document.getElementsByClassName('map-result-overlay')
    Array.from(mapResultOverlays).forEach((element, i) => {
        if (Number(i)+1<=mapNumber) {
            element.style.display = "flex"
        }
        else {
            element.style.display = 'none'
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
}

function resetScores() {
    const teamABScore = document.querySelectorAll(".team-a-score, .team-b-score")
    for (const element of teamABScore) {
        element.value = 0
    }
}

function scoreUpdateActivate() {
    const scoreUpdateTriggers = document.querySelectorAll(".team-a-score, .team-b-score, #map-score-toggle, .side-selection-teams")
    for (const element of scoreUpdateTriggers) {
        element.addEventListener("change", scoreUpdate)
    }
}


//Run On Page Load
function pageLoad() {
    setMapPool()
    mapVetoActivate()
    setMapVeto()
    resetScores()
    scoreUpdateActivate()
    teamLogoActivate()
}