const TeamAName = document.querySelector("#team-a-name")
const TeamBName = document.querySelector("#team-b-name")
const TeamATri = document.querySelector("#team-a-tri")
const TeamBTri = document.querySelector("#team-b-tri")

const SwapTeams = document.querySelector("#swap-teams")

const OverlaySelection = document.querySelector("#overlay-selection")

const SeriesLengthSelection = document.querySelector("#series-length-selection")

const MapPoolSelection = document.querySelector("#map-pool-selection")

const mapdata = [
    {mapname: "Abyss", mapimg: "n/a", mappool: true},
    {mapname: "Ascent", mapimg: "n/a", mappool: true},
    {mapname: "Bind", mapimg: "n/a", mappool: true},
    {mapname: "Breeze", mapimg: "n/a", mappool: false},
    {mapname: "Fracture", mapimg: "n/a", mappool: false},
    {mapname: "Haven", mapimg: "n/a", mappool: true},
    {mapname: "Icebox", mapimg: "n/a", mappool: true},
    {mapname: "Lotus", mapimg: "n/a", mappool: true},
    {mapname: "Pearl", mapimg: "n/a", mappool: false},
    {mapname: "Split", mapimg: "n/a", mappool: false},
    {mapname: "Sunset", mapimg: "n/a", mappool: true},
]

const mapvetobo3 = [
    {mapname: "map", team: "team", def: "na"},
    {mapname: "map", team: "team", def: "na"},
    {mapname: "map", team: "team", def: "team"},
    {mapname: "map", team: "team", def: "team"},
    {mapname: "map", team: "team", def: "na"},
    {mapname: "map", team: "team", def: "na"},
    {mapname: "map", team: "decider", def: "team"},
]

let mappicks = []
let mapbans = []

// Overlay Template Selection
function setOverlay() {
    const SelectedOption = document.getElementById('overlay-selection').value
    const overlayElements = document.getElementsByClassName('overlay-element')
    if (SelectedOption === "gc") {
        for (const element of overlayElements) {
            element.src = element.src.replace(/(VCL|LPL)/g, "GC")
        }
    } else if (SelectedOption === "vcl") {
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


//Swap Teams Button
function swapTeamsIGO() {
    const TeamANameIGO = document.querySelector("#team-a-name-igo")
    const TeamBNameIGO = document.querySelector("#team-b-name-igo")
    const TeamALogoIGO = document.querySelector("#team-a-logo-igo")
    const TeamBLogoIGO = document.querySelector("#team-b-logo-igo")
    if (TeamANameIGO.classList.contains("team-name-left-igo")) {
        TeamANameIGO.setAttribute("class", "team-name-right-igo")
        TeamBNameIGO.setAttribute("class", "team-name-left-igo")
        TeamALogoIGO.setAttribute("class", "team-logo-right-igo")
        TeamBLogoIGO.setAttribute("class", "team-logo-left-igo")
    } else {
        TeamBNameIGO.setAttribute("class", "team-name-right-igo")
        TeamANameIGO.setAttribute("class", "team-name-left-igo")
        TeamBLogoIGO.setAttribute("class", "team-logo-right-igo")
        TeamALogoIGO.setAttribute("class", "team-logo-left-igo")
    }
}

SwapTeams.addEventListener("click", swapTeamsIGO);


// Map Config Selection
function setSeriesLength() {
    const bo3Console = document.querySelector("#bo3-console")
    const bo5Console = document.querySelector("#bo5-console")
    const bo1Console = document.querySelector("#bo1-console")
    if (SeriesLengthSelection.value === "BO3") {
        bo3Console.setAttribute("class", "active-series-console")
        bo5Console.setAttribute("class", "inactive-series-console")
        bo1Console.setAttribute("class", "inactive-series-console")
    } else if (SeriesLengthSelection.value === "BO5") {
        bo5Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "inactive-series-console")
        bo1Console.setAttribute("class", "inactive-series-console")
    } else {
        bo1Console.setAttribute("class", "active-series-console")
        bo3Console.setAttribute("class", "inactive-series-console")
        bo5Console.setAttribute("class", "inactive-series-console")
    }
    setMapVeto()
}

SeriesLengthSelection.addEventListener("change", setSeriesLength)


// Map Pool Selection
function setMapSelection(selectElement) {
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild)
    }
    for (const map of mapdata) {
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
    const teamSelections = document.getElementsByClassName("map-selection-teams")
    const sideSelections = document.getElementsByClassName("side-selection-teams")
    mappicks = []
    mapbans = []
    if (SeriesLengthSelection.value === "BO3") {
        for (const map of mapBansAll) {
            if (map.classList.contains("bo3")) {
                let selectedMap = {mapname: `${map.value}`}
                mapbans.push(selectedMap);
            }
        }

        for (const map of mapPicksAll) {
            if (map.classList.contains("bo3")) {
                let selectedMap = {mapname: `${map.value}`}
                mappicks.push(selectedMap);
            }
        }

        const pickImgs = document.getElementsByClassName('bo3-pick-img')
        Array.from(pickImgs).forEach((img, i) => {
            img.src = `assets/Maps/${mappicks[i].mapname}_320x640.png`
        })

        const banImgs = document.getElementsByClassName('bo3-ban-img')
        Array.from(banImgs).forEach((img, i) => {
            img.src = `assets/Maps/${mapbans[i].mapname}_320x320.png`
        })
    }
}

function mapVetoActivate() {
    const mapBansAll = document.getElementsByClassName("map-ban-selection")
    const mapPicksAll = document.getElementsByClassName("map-pick-selection")
    const teamSelections = document.getElementsByClassName("map-selection-teams")
    const sideSelections = document.getElementsByClassName("side-selection-teams")
    for (const element of mapBansAll) {
        element.addEventListener("change", setMapVeto) 
    }
    for (const element of mapPicksAll) {
        element.addEventListener("change", setMapVeto) 
    }
}


//Score Keeping Logic
function scoreUpdate() {
    
}


//Run On Page Load
function pageLoad() {
    setMapPool()
    mapVetoActivate()
    setMapVeto()
}