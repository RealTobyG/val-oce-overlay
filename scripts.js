const TeamAName = document.querySelector("#team-a-name")
const TeamBName = document.querySelector("#team-b-name")

const TeamANameIGO = document.querySelector("#team-a-name-igo")
const TeamBNameIGO = document.querySelector("#team-b-name-igo")
const TeamALogoIGO = document.querySelector("#team-a-logo-igo")
const TeamBLogoIGO = document.querySelector("#team-b-logo-igo")

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


// Overlay Template Selection
function setOverlay() {
    const SelectedOption = document.getElementById('overlay-selection').value
    const IGO = document.querySelector("#in-game-overlay")
    if (SelectedOption === "GC2024") {
        IGO.setAttribute("class", "gc2024-igo")
    } else if (SelectedOption === "VCT2024") {
        IGO.setAttribute("class", "vct2024-igo")
    } else {
        IGO.setAttribute("class", "lpl-igo")
    }
}

OverlaySelection.addEventListener("change", setOverlay)


// Team A/B Name Changing
function setIGOnames() {
    TeamANameIGO.textContent = `${TeamAName.value}`
    TeamBNameIGO.textContent = `${TeamBName.value}`
}

TeamAName.addEventListener("keyup", setIGOnames);
TeamBName.addEventListener("keyup", setIGOnames);


//Swap Teams Button
function swapTeamsIGO() {
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
}

function setMapPool() {
    const mapSelectMenus = document.getElementsByClassName("map-selection-maps")
    for (const menu of mapSelectMenus) {
        setMapSelection(menu)
    }
}

MapPoolSelection.addEventListener("change", setMapPool)
